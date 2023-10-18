import { existsSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { ConfigFile, Server } from 'types'

import { badConfig } from './errors'

export const convertInstanceDetailsToConfig = (
  instance: AWS.EC2.Instance, instanceNumber: number, server: Server,
): string => {
  const alias = instanceNumber === 0 ? server.alias : `${server.alias}${instanceNumber}`
  const keyFileName = server.sshKeyFile ? server.sshKeyFile : instance.KeyName

  return `Host ${alias}\n\tUser ${server.sshUsername}\n\tHostname ${instance.PublicDnsName}\n\tIdentityFile ~/.ssh/${keyFileName}.pem\n` // eslint-disable-line max-len
}

export const loadConfig = (path: string): ConfigFile => {
  try {
    const configPath = join(dirname(path), '.config.json')

    if (!existsSync(configPath)) {
      throw new Error(badConfig)
    }

    return JSON.parse(readFileSync(configPath).toString())
  } catch (error) {
    throw new Error(badConfig)
  }
}

export const writeConfig = (path: string) => {
  try {
    const configPath = join(dirname(path), '.config.json')

    writeFileSync(configPath, JSON.stringify({
      servers: [{
        alias: 'short',
        awsProfile: 'default',
        awsEC2InstanceName: 'ec2-name',
        awsRegion: 'us-east-1',
        sshKeyFile: '~/.ssh/key.pem',
        sshUsername: 'myusername',
      }]
    }))

    return { message: 'Config file successfully created', status: 0 }
  } catch (error) {
    return { message: error.message, status: 1 }
  }
}
