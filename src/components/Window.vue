<template>
  <div class="container">
    <div class="window">
      <div class="bar">
        <div class="circle-bar">
          <div class="circle close" @click="showFinder = false; windowTitle = 'Terminal'"></div>
          <div class="circle minimize" @click="toggleFinder"></div>
          <div class="circle maximize"></div>
        </div>
        <div class="title-bar">
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

.window {
  width: 100%;
  max-width: 900px;
  height: 50vh;
  min-height: 300px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.bar {
  height: 28px;
  min-height: 28px;
  background-color: #DBDBDB;
  display: flex;
  align-items: center;
  padding: 0 8px;
  position: relative;
}

.circle-bar {
  display: flex;
  gap: 6px;
  z-index: 2;
}

.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: #cccccc solid 1px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.circle:hover {
  opacity: 0.8;
}

.circle.close {
  background-color: #ff5f57;
}

.circle.minimize {
  background-color: #ffbd2e;
}

.circle.maximize {
  background-color: #28c840;
}

.title-bar {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  color: #4d4d4d;
  pointer-events: none;
}

.window-content {
  flex: 1;
  overflow: auto;
}

/* Tablet */
@media (max-width: 1024px) {
  .container {
    padding: 0 15px;
  }

  .window {
    height: 45vh;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }

  .window {
    height: 40vh;
    min-height: 250px;
  }

  .bar {
    height: 24px;
    min-height: 24px;
  }

  .circle {
    width: 10px;
    height: 10px;
  }

  .title-bar {
    font-size: 12px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .window {
    height: 35vh;
    min-height: 200px;
  }
}
</style>
