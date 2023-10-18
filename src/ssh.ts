import { copyFileSync, existsSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

import { getEC2InstanceData } from './aws'
import { convertInstanceDetailsToConfig, loadConfig } from './config'

export const backupSSHConfig = () => {
  const sshConfigPath = join(homedir(), '.ssh', 'config')
  const sshConfigBackupPath = `${sshConfigPath}.backup`

  if (existsSync(sshConfigBackupPath)) {
    unlinkSync(sshConfigBackupPath)
  }

  copyFileSync(sshConfigPath, sshConfigBackupPath)
}

export const updateSSH = async (path: string) => {
  try {
    let sshConfigs = [] as Array<string>
    backupSSHConfig()

    const { servers } = loadConfig(path)

    for (let i = 0; i < servers.length; i++) {
      const instances = await getEC2InstanceData(servers[i])

      sshConfigs = sshConfigs.concat(instances.map((instance, index) => {
        const instanceNumber = instances.length === 1 ? 0 : index + 1

        return convertInstanceDetailsToConfig(instance, instanceNumber, servers[i])
      }))
    }

    writeSSH(sshConfigs)

    return { message: 'SSH config updated successfully!', status: 0 }
  } catch (error) {
    return { message: error.message, status: 1 }
  }
}

export const writeSSH = (configs: Array<string>) => {
  const sshConfigPath = join(homedir(), '.ssh', 'config')

  writeFileSync(sshConfigPath, configs.join('\n'))
}
