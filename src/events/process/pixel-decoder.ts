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

const determineColor = (pixel: number, alpha?: number) => pixel !== alpha ? pixel : TRANSPARENT

export default (event: PaintedEvent): DecodePixelColor => {
  const colorList = getColorList(event.colorIndex)
  const alpha = getAlpha(event.metadata, colorList)

  return (indexByte: string): DecodedPixel => {
    const colourIndex = parseInt('0x'.concat(hexToBytes2(indexByte)))
    const pixel = colorList[colourIndex]
    const color = determineColor(pixel, alpha)
    const isVisible = color !== TRANSPARENT

    if (!isVisible) return { color, visible: isVisible }

    return { color: transformColor(color), visible: color !== TRANSPARENT }
  }
}