import { padLeft, numberToHex } from 'web3-utils'

const hexToBytes6 = (hex: string): string => '000000'.concat(hex).slice(-6)

export const toHex32 = (data: string | number): string => padLeft(numberToHex(data), 64)

export const rgb565HexToRgba = (rgb565Hex: string): number => {
  const rgb565: number = parseInt(rgb565Hex)
  const r: number = (((rgb565 >> 11) & 0x1f) * 527 + 23) >> 6
  const g: number = (((rgb565 >> 5) & 0x3f) * 259 + 33) >> 6
  const b: number = ((rgb565 & 0x1f) * 527 + 23) >> 6

  const RGB888: number = (r << 16) | (g << 8) | b
  const RGB: string = hexToBytes6(RGB888.toString(16))
  const RGBAHex: string = '0x'.concat(RGB).concat('FF')

  return parseInt(RGBAHex)
}
