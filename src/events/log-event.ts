import { EventData } from 'web3-eth-contract'

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

export type LogEvent = EventData & {
  readonly returnValues: ReturnValues
}
