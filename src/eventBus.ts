import mitt from 'mitt'

type Events = {
  'toggle-finder': void
  'toggle-modal': string | undefined
}

export const eventBus = mitt<Events>()
