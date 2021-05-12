import { hexToAscii, numberToHex, padLeft } from 'web3-utils'
import { PaintedEvent } from '../events/event'

export type Metadata = OtherMetadata & {
  name: Name
}

type Name = string

type OtherMetadata = {
  number: number
  seriesId: number
  hasAlpha: boolean
}

const parseName = (raw: string): Name => hexToAscii(numberToHex(raw)).replace(/[\u0000-\u001F]/g, '').trim()

/**
 * First 3 bytes are the number
 * Next 3 bytes are the seriesId
 * Last bit is the alpha channel flag
 * 
 * @param raw 
 */
const parseOtherMetadata = (raw: string): OtherMetadata => {
  const asHex = padLeft(numberToHex(raw), 64).slice(2)
  const number = parseInt(`0x${asHex.slice(0, 6)}`)
  const seriesId = parseInt(`0x${asHex.slice(6, 12)}`)
  const hasAlpha = asHex.slice(asHex.length - 1) !== '0'
  return { number, seriesId, hasAlpha }
}

export const parse = (event: PaintedEvent): Metadata => {
  const rawMetadata = event.metadata || []
  const [rawName, rawOther] = rawMetadata
  return {
    name: parseName(rawName),
    ...parseOtherMetadata(rawOther)
  }
}
