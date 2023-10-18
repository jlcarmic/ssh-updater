import AWS from 'aws-sdk'
import type { Server } from 'types'

export const getEC2InstanceData = async (server: Server): Promise<Array<AWS.EC2.Instance>> => {
  const ec2 = new AWS.EC2({ region: server.awsRegion })
  const filter = {
    Filters: [
      { Name: 'tag:Name', Values: [server.awsEC2InstanceName] },
      { Name: 'instance-state-name', Values: ['running'] },
    ]
  }

  const { Reservations } = await ec2.describeInstances(filter).promise()

  if (!Reservations?.length) {
    return [] as Array<AWS.EC2.Instance>
  }

  return Reservations.map(reservation => (
    reservation.Instances?.length
      ? reservation.Instances[0]
      : {} as AWS.EC2.Instance
  ))
}
