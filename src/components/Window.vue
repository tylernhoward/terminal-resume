<template>
  <div class="container">
    <div class="window">
      <div class="bar">
        <div class="traffic-lights">
          <button
            class="traffic-light close"
            @click="showFinder = false; windowTitle = 'Terminal'"
            aria-label="Close"
          >
            <svg viewBox="0 0 12 12"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <button
            class="traffic-light minimize"
            @click="toggleFinder"
            aria-label="Minimize"
          >
            <svg viewBox="0 0 12 12"><path d="M2.5 6h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <button
            class="traffic-light maximize"
            aria-label="Maximize"
          >
            <svg viewBox="0 0 12 12"><path d="M3 3h6v6H3z" stroke="currentColor" stroke-width="1.25" fill="none"/></svg>
          </button>
        </div>
        <div class="title-bar">
          <span class="window-icon">{{ showFinder ? '📁' : '⌘' }}</span>
          <span class="title">{{ windowTitle }}</span>
        </div>
      </div>
      <div class="window-content">
        <TerminalEmu v-if="!showFinder" :inputLabel="label"/>
        <FinderEmu v-if="showFinder"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TerminalEmu from './TerminalEmu.vue'
import FinderEmu from './FinderEmu.vue'
import { eventBus } from '../eventBus'

const showFinder = ref(false)
const windowTitle = ref('Terminal')
const label = '[thoward~]$'

function toggleFinder() {
  showFinder.value = !showFinder.value
  windowTitle.value = showFinder.value ? 'Projects' : 'Terminal'
}

onMounted(() => {
  eventBus.on('toggle-finder', toggleFinder)
})

onUnmounted(() => {
  eventBus.off('toggle-finder', toggleFinder)
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.window-content {
    height: 100%;
}

.window {
  width: 100%;
  max-width: 900px;
  height: 50vh;
  width: 70%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    0 22px 70px 4px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.1);
  position: relative;
}

.bar {
  position: absolute;
  width: 100%;
  height: 38px;
  background: linear-gradient(180deg, #E8E8E8 0%, #D4D4D4 100%);
  border-bottom: 1px solid #B8B8B8;
  z-index: 99;
  display: flex;
  align-items: center;
  backdrop-filter: blur(20px);
}

.traffic-lights {
  display: flex;
  gap: 8px;
  padding-left: 12px;
  z-index: 2;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: filter 0.15s ease;
}

.traffic-light svg {
  width: 8px;
  height: 8px;
  opacity: 0;
  transition: opacity 0.15s ease;
  color: rgba(0, 0, 0, 0.5);
}

.bar:hover .traffic-light svg {
  opacity: 1;
}

.traffic-light.close {
  background: linear-gradient(180deg, #FF6058 0%, #E14640 100%);
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.traffic-light.close:hover {
  filter: brightness(0.9);
}

.traffic-light.minimize {
  background: linear-gradient(180deg, #FFBF2F 0%, #DEA514 100%);
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.traffic-light.minimize:hover {
  filter: brightness(0.9);
}

.traffic-light.maximize {
  background: linear-gradient(180deg, #2ACB42 0%, #1AAB29 100%);
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.traffic-light.maximize:hover {
  filter: brightness(0.9);
}

.title-bar {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  pointer-events: none;
}

.window-icon {
  font-size: 14px;
}

.title {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  letter-spacing: -0.2px;
}

@media only screen and (max-width: 768px) {
  .window {
    width: 95%;
    height: 55vh;
  }

  .bar {
    height: 32px;
  }

  .traffic-light {
    width: 10px;
    height: 10px;
  }

  .traffic-light svg {
    width: 6px;
    height: 6px;
  }

  .title {
    font-size: 12px;
  }
}

@media only screen and (max-width: 480px) {
  .window {
    width: 100%;
    height: 50vh;
    border-radius: 0;
  }
}
</style>
