/* istanbul ignore file */
import { Command } from 'commander'

import { writeConfig } from './config'
import { updateSSH } from './ssh'

import packageJSON from '../package.json'

const program = new Command()

program
  .name('ssh-updater')
  .description(packageJSON.description)
  .version(packageJSON.version)

program
  .command('config')
  .description('writes out a default config file if one does not exist')
  .action(() => {
    const { message, status } = writeConfig(process.argv[0])

    process.stdout.write(`${message}\n`)
    process.exit(status)
  })

program
  .command('update')
  .description('fecthes the required data from AWS and writes out the SSH config file')
  .action(async () => {
    const { message, status } = await updateSSH(process.argv[0])

    process.stdout.write(`${message}\n`)
    process.exit(status)
  })

program
  .command('version')
  .action(() => {
    process.stdout.write(`Current version: ${packageJSON.version}\n`)
    process.exit(0)
  })

program.parse()
