import mitt from 'mitt'

type Events = {
  'toggle-finder': void
}

export const eventBus = mitt<Events>()
