import { Pixels } from '../event'
import { NUM_PER_INDIVIDUAL_PIXEL_GROUP, EMPTY_HEX_8, MAX_INDEX_WITHIN_GROUP } from '../constants'
import { cleanHex, toHex32, hexToBytes2, hexToBytes4, getPixelPosition } from './utils'
import { DecodePixelColor } from './pixel-decoder'

export default (pixels: Pixels, individualPixels: Array<string>, decodePixel: DecodePixelColor): Pixels => {
  let currentIndividualGroup
  // data for our single pixels (groups of 8 twinned with pixel index)
  for (let i = 0, n = individualPixels.length; i < n; i++) {
    // current group of 8 pixels twinned with 8 positions (slice to shave off the '0x' at the start) plus 4 zeroes
    const currentPixelGroup = cleanHex(toHex32(individualPixels[i]))
    let groupSplitIndex = 0
    for (let positionWithinGroup = 0; positionWithinGroup < NUM_PER_INDIVIDUAL_PIXEL_GROUP; positionWithinGroup++) {
      // empty bytes should be ignored
      currentIndividualGroup = currentPixelGroup.slice(groupSplitIndex, groupSplitIndex + 8)

      if (currentIndividualGroup != EMPTY_HEX_8) {
        const indexBytes = currentIndividualGroup.slice(0, 2)
        const { color, visible } = decodePixel(indexBytes)

        if (visible) {
          let positionWithinGroup = parseInt('0x'.concat(hexToBytes2(currentIndividualGroup.slice(6))))
          if (positionWithinGroup > MAX_INDEX_WITHIN_GROUP) {
            positionWithinGroup = MAX_INDEX_WITHIN_GROUP
          }
          const currentGroupIndex = parseInt('0x'.concat(hexToBytes4(currentIndividualGroup.slice(2, 6))))
          const index = getPixelPosition(currentGroupIndex, positionWithinGroup)
          pixels[index] = color
        }
      }
      groupSplitIndex += 8
    }
  }
  return pixels
}
