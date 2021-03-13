type ReturnValues = {
  readonly artist: string
  readonly tokenId: string
  readonly colorIndex: Array<string>
  readonly pixelData: Array<string>
  readonly pixelGroups: Array<string>
  readonly pixelGroupIndexes: Array<string>
  readonly transparentPixelGroups: Array<string>
  readonly transparentPixelGroupIndexes: Array<string>
  readonly metadata: Array<string>
}

type Raw = {
  readonly data: string
  readonly topics: Array<string>
}

export type LogEvent = {
  readonly logIndex: number
  readonly transactionIndex: number
  readonly transactionHash: string
  readonly blockHash: string
  readonly blockNumber: number
  readonly address: string
  readonly type: string
  readonly id: string
  readonly event: string
  readonly signature: string
  readonly returnValues: ReturnValues
  readonly raw: Raw
}
