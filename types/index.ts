export type ConfigFile = {
  servers: Array<Server>
}

export type Server = {
  alias: string
  awsProfile?: string
  awsEC2InstanceName: string
  awsRegion: string
  sshKeyFile?: string
  sshUsername: string
}
