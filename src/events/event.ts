import { LogEvent } from './log-event'

export type PaintedEvent = {
  colorIndex: Array<string>
  pixelData: Array<string>
  pixelGroups: Array<string>
  pixelGroupIndexes: Array<string>
  transparentPixelGroups: Array<string>
  transparentPixelGroupIndexes: Array<string>
  metadata: Array<string>
  tokenId: string
  blockNumber: number
}

export const extract = (event: LogEvent): PaintedEvent | undefined => {
  if (!event.returnValues) return

  return {
    colorIndex: event.returnValues.colorIndex,
    pixelData: event.returnValues.pixelData,
    pixelGroups: event.returnValues.pixelGroups,
    pixelGroupIndexes: event.returnValues.pixelGroupIndexes,
    transparentPixelGroups: event.returnValues.transparentPixelGroups,
    transparentPixelGroupIndexes: event.returnValues.transparentPixelGroupIndexes,
    metadata: event.returnValues.metadata,
    tokenId: event.returnValues.tokenId,
    blockNumber: event.blockNumber
  }
}
