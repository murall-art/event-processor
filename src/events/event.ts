import { LogEvent } from './log-event'
import pixelDecoder from './process/pixel-decoder'
import addGroupPixels from './process/add-group-pixels'
import addIndividualPixels from './process/add-pixels'

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

export type Pixels = {
  [key: number]: number
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

export const process = (event: PaintedEvent): Pixels | undefined => {
  if (!event) return

  const decodePixel = pixelDecoder(event)

  let pixels = addGroupPixels({}, event.pixelGroups, event.pixelGroupIndexes, decodePixel)
  pixels = addGroupPixels(pixels, event.transparentPixelGroups, event.transparentPixelGroupIndexes, decodePixel)
  return addIndividualPixels(pixels, event.pixelData, decodePixel)
}
