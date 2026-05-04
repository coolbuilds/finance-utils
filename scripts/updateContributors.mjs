import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { request } from 'node:https'
import { dirname, join } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const readmePath = join(currentDir, '../README.md')
const contributorsConfigPath = join(currentDir, '../contributors.config.json')
const contributorHeader = '## 👥 Contributors'
const botPattern = /\[bot\]$|dependabot/i

function loadContributorsConfig() {
  if (!existsSync(contributorsConfigPath)) {
    return []
  }

  return JSON.parse(readFileSync(contributorsConfigPath, 'utf8'))
}

function getRepository() {
  if (env.GITHUB_REPOSITORY) {
    return env.GITHUB_REPOSITORY
  }

  const remoteUrl = execFileSync('git', ['remote', 'get-url', 'origin'], {
    encoding: 'utf8'
  }).trim()

  const match = remoteUrl.match(
    /github\.com[:/](?<owner>[^/]+)\/(?<repo>[^/.]+)(?:\.git)?$/
  )

  if (!match?.groups) {
    return ''
  }

  return `${match.groups.owner}/${match.groups.repo}`
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'finance-utils-contributors-script',
      'X-GitHub-Api-Version': '2022-11-28'
    }

    if (env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`
    }

    const req = request(new URL(url), { headers }, (res) => {
      let body = ''

      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(
            new Error(`GitHub API responded with status ${res.statusCode}`)
          )
          return
        }

        resolve(JSON.parse(body))
      })
    })

    req.on('error', reject)
    req.end()
  })
}

async function getGitHubContributors() {
  const repository = getRepository()

  if (!repository) {
    return []
  }

  try {
    const contributors = await fetchJson(
      `https://api.github.com/repos/${repository}/contributors?per_page=100`
    )

    return contributors
      .filter((contributor) => !botPattern.test(contributor.login))
      .map((contributor) => ({
        avatarUrl: contributor.avatar_url,
        name: contributor.login,
        profileUrl: contributor.html_url
      }))
  } catch {
    return []
  }
}

function getGitContributors() {
  const gitLog = execFileSync('git', ['log', '--format=%aN%x00%aE'], {
    encoding: 'utf8'
  })

  const config = loadContributorsConfig()
  const contributors = new Map()

  for (const line of gitLog.split('\n')) {
    if (!line.trim()) {
      continue
    }

    const [name, email] = line.split('\0')

    if (!name || botPattern.test(name)) {
      continue
    }

    const configuredContributor = config.find(
      (contributor) =>
        contributor.name === name || contributor.emails?.includes(email)
    )
    const github = configuredContributor?.github

    contributors.set(email || name, {
      avatarUrl: github ? `https://github.com/${github}.png?size=128` : '',
      name: configuredContributor?.name || name,
      profileUrl: github ? `https://github.com/${github}` : ''
    })
  }

  return Array.from(contributors.values())
}

function mergeContributors(contributors) {
  const merged = new Map()

  for (const contributor of contributors) {
    const key = contributor.profileUrl || contributor.name.toLowerCase()

    if (!merged.has(key)) {
      merged.set(key, contributor)
    }
  }

  return Array.from(merged.values())
}

function renderContributors(contributors) {
  if (contributors.length === 0) {
    return '- No contributors yet.'
  }

  const cells = contributors
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((contributor) => {
      if (!contributor.profileUrl || !contributor.avatarUrl) {
        return `<td align="center">${contributor.name}</td>`
      }

      return [
        '<td align="center">',
        `<a href="${contributor.profileUrl}">`,
        `<img src="${contributor.avatarUrl}" width="64" height="64" alt="${contributor.name}" /><br />`,
        `<sub><b>${contributor.name}</b></sub>`,
        '</a>',
        '</td>'
      ].join('')
    })
    .join('\n')

  return `<table>\n<tr>\n${cells}\n</tr>\n</table>`
}

const contributorContent = renderContributors(
  mergeContributors([
    ...(await getGitHubContributors()),
    ...getGitContributors()
  ])
)

const readme = readFileSync(readmePath, 'utf8')
const contributorsSection = `${contributorHeader}\n\n${contributorContent}\n`
const contributorsSectionPattern =
  /## 👥 Contributors\n\n[\s\S]*?(?=\n---\n\n## |$)/

if (readme.includes(contributorHeader)) {
  writeFileSync(
    readmePath,
    readme.replace(contributorsSectionPattern, contributorsSection)
  )
} else {
  const licenseHeader = '\n## 📄 License'

  if (readme.includes(licenseHeader)) {
    writeFileSync(
      readmePath,
      readme.replace(
        licenseHeader,
        `\n${contributorsSection}\n---\n${licenseHeader}`
      )
    )
  } else {
    writeFileSync(
      readmePath,
      `${readme.trimEnd()}\n\n---\n\n${contributorsSection}`
    )
  }
}
