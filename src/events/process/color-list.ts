import { EMPTY_HEX_4 } from '../constants'
import { toHex32, rgb565HexToRgba } from './utils'


export default (colorIndex: Array<string>): Array<number> => {
  const colorList: Array<number> = []
  let currentColorGroup

  for (let i = 0, n = colorIndex.length; i < n; i++) {
    currentColorGroup = toHex32(colorIndex[i]).slice(2)
    if (i === colorIndex.length - 1) {
      // we're at the last index, find any empty slots and remove them too
      while (currentColorGroup.slice(0, 4) === EMPTY_HEX_4) {
        currentColorGroup = currentColorGroup.slice(4)
      }
    }
    for (let j = 0, k = currentColorGroup.length / 4; j < k; j++) {
      const color = rgb565HexToRgba('0x'.concat(currentColorGroup.slice(4 * j, 4 * (j + 1))))
      colorList.push(color)
    }
  }
  return colorList
}
