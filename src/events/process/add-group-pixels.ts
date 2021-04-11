import { Pixels } from '../event'
import { EMPTY_HEX_4, NUM_PER_IDX_GROUP, NUM_PER_GROUP } from '../constants'
import { cleanHex, toHex32, hexToBytes4, getPixelPosition } from './utils'
import { DecodePixelColor } from './pixel-decoder'

export default (pixels: Pixels, groups: Array<string>, groupIndexes: Array<string>, decodePixel: DecodePixelColor): Pixels => {
  let currentGroupIndexData

  for (let i = 0, n = groups.length; i < n; i++) {
    // every 16th iteration we grab the next pixel index group
    if (i % NUM_PER_IDX_GROUP === 0) {
      currentGroupIndexData = cleanHex(toHex32(groupIndexes[i / NUM_PER_IDX_GROUP]))

      if (i / NUM_PER_IDX_GROUP === groupIndexes.length - 1) {
        // we're at the last index, find any empty slots and remove them too
        while (currentGroupIndexData.slice(0, 4) === EMPTY_HEX_4) {
          currentGroupIndexData = currentGroupIndexData.slice(4)
        }
      }
    }
    // grab first 2 bytes, then convert to int
    const currentGroupIndex = parseInt('0x'.concat(
      hexToBytes4(currentGroupIndexData.slice(0, 4))
    ))

    // current group of 32 pixels (slice to shave off the '0x' at the start)
    const currentPixelGroup = cleanHex(toHex32(groups[i]))
    let groupSplitIndex = 0
    for (let positionWithinGroup = 0; positionWithinGroup < NUM_PER_GROUP; positionWithinGroup++) {
      const indexBytes = currentPixelGroup.slice(groupSplitIndex, groupSplitIndex + 2)
      const { color, visible } = decodePixel(indexBytes)

      if (visible) {
        const index = getPixelPosition(currentGroupIndex, positionWithinGroup)
        pixels[index] = color
      }

      groupSplitIndex += 2
    }

    // shift the current pixel index group by 2 bytes to the next position ready for the next loop iteration
    currentGroupIndexData = currentGroupIndexData.slice(4)
  }
  return pixels
}
