import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const readmePath = join(currentDir, '../README.md')
const contributorHeader = '## 👥 Contributors'
const botPattern = /\[bot\]$|dependabot/i

const gitLog = execFileSync('git', ['log', '--format=%aN%x00%aE'], {
  encoding: 'utf8'
})

const contributors = new Map()

for (const line of gitLog.split('\n')) {
  if (!line.trim()) {
    continue
  }

  const [name, email] = line.split('\0')

  if (!name || botPattern.test(name)) {
    continue
  }

  contributors.set(email || name, name)
}

const contributorList = Array.from(contributors.values())
  .sort((a, b) => a.localeCompare(b))
  .map((name) => `- ${name}`)
  .join('\n')

const readme = readFileSync(readmePath, 'utf8')
const contributorsSection = `${contributorHeader}\n\n${contributorList || '- No contributors yet.'}\n`
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
