import { hexToBytes2 } from './utils'
import { TRANSPARENT } from '../constants'
import { PaintedEvent } from '../event'
import getColorList from './color-list'
import getAlpha from './metadata-alpha'
import transformColor from './transform-color'

type DecodedPixel = {
  readonly color: number
  readonly visible: boolean
}

export type DecodePixelColor = (indexByte: string) => DecodedPixel

const determineColor = (pixel: number, alpha?: number): number => pixel !== alpha ? pixel : TRANSPARENT

const isVisible = (colorList: Array<number>, color: number): boolean => {
  if (!colorList || !colorList.length) return true
  return color !== TRANSPARENT
}

export default (event: PaintedEvent): DecodePixelColor => {
  const colorList = getColorList(event.colorIndex)
  const alpha = getAlpha(event.metadata, colorList)

  return (indexByte: string): DecodedPixel => {
    const colourIndex = parseInt('0x'.concat(hexToBytes2(indexByte)))
    const pixel = colorList[colourIndex]
    const color = determineColor(pixel, alpha)
    const visible = isVisible(colorList, color)

    if (!visible) return { color, visible }

    return { color: transformColor(color), visible }
  }
}