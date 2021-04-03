import { endianness } from 'os'

const ENDIANNESS = endianness()

export default (color: number): number => {
  if (ENDIANNESS === 'BE') return color

  return ((color << 24) | ((color & 0xff00) << 8) | ((color & 0xff0000) >>> 8) | (color >>> 24)) >>> 0
}
