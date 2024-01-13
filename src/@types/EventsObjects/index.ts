export type Events = {
  id: string
  name: string
  authorName: string
  description: string
  createAt: Date
  membersSubscribe?: EventMember[]
  membersSubscribeNum: number
}

export type EventMember = {
  id: string
}
