import { nth } from 'lodash'
import { padLeft, toHex } from 'web3-utils'

const hasAlpha = (metadata: Array<string>): boolean => {
  const data = nth(metadata, 1)
  if (!data) return false

  const hex = padLeft(toHex(data), 64).slice(2)
  // last bit is alpha channel flag
  return hex.slice(hex.length - 1) !== '0'
}

export default (metadata: Array<string>, colorList: Array<number>): number | undefined => {
  if (!hasAlpha(metadata)) return
  return colorList[0]
}
