import processedEvent from '../data/processed.json'
import rawEvent from '../data/event.json'

export default {
  data: {
    events: {
      processed: {
        genesis: processedEvent
      },
      raw: {
        genesis: rawEvent
      }
    }
  }
}
