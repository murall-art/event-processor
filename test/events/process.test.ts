import factories from '../factories'
import { extract, process, PaintedEvent } from '../../src/events/event'

describe('When processing events', () => {
  // TODO: improve tests
  test('processing is done correctly', async () => {
    const event = factories.data.events.raw.genesis
    const paintedEvent: PaintedEvent = extract(event)!
    const result = process(paintedEvent)

    const expected = factories.data.events.processed.genesis
    expect(result).toBeDefined()
    expect(Object.keys(result!).length).toEqual(Object.keys(expected).length)
    for (const key in expected) {
      const expectedValue = expected[key]
      const value = result[key]
      expect(expectedValue).toBeDefined()
      expect(expectedValue!).toEqual(value)
    }
  })
})
