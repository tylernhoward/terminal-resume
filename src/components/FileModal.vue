<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask" @click="$emit('close')">
        <div class="modal-wrapper">
          <div class="modal-container" :class="{ 'image-modal': file?.type === 'image' }" @click.stop>
            <div class="modal-bar">
              <div class="modal-traffic-lights">
                <button class="modal-close" @click="$emit('close')" aria-label="Close">
                  <svg viewBox="0 0 12 12"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="modal-circle minimize"></div>
                <div class="modal-circle maximize"></div>
              </div>
              <span class="modal-header">{{ file?.name }}</span>
            </div>
            <div class="modal-body">
              <!-- Text content -->
              <div v-if="file?.type === 'text'" class="text-content">
                <p>{{ file.content }}</p>
              </div>
              <!-- Image content -->
              <div v-else-if="file?.type === 'image'" class="image-content">
                <img :src="file.content" :alt="file.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { FileItem } from './ProjectData'

defineProps<{
  show: boolean
  file: FileItem | null
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-wrapper {
  width: 100%;
  max-width: 600px;
}

.modal-container {
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow:
    0 22px 70px 4px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-container.image-modal {
  max-width: 800px;
}

.modal-bar {
  display: flex;
  align-items: center;
  height: 38px;
  background: linear-gradient(180deg, #E8E8E8 0%, #D4D4D4 100%);
  border-bottom: 1px solid #B8B8B8;
  padding: 0 12px;
  position: relative;
}

.modal-traffic-lights {
  display: flex;
  gap: 8px;
  z-index: 2;
}

.modal-close {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(180deg, #FF6058 0%, #E14640 100%);
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: filter 0.15s ease;
}

.modal-close svg {
  width: 8px;
  height: 8px;
  opacity: 0;
  color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.15s ease;
}

.modal-bar:hover .modal-close svg {
  opacity: 1;
}

.modal-close:hover {
  filter: brightness(0.9);
}

.modal-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.modal-circle.minimize {
  background: linear-gradient(180deg, #FFBF2F 0%, #DEA514 100%);
}

.modal-circle.maximize {
  background: linear-gradient(180deg, #2ACB42 0%, #1AAB29 100%);
}

.modal-header {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #333;
  letter-spacing: -0.2px;
}

.modal-body {
  padding: 24px;
}

.text-content {
  max-height: 400px;
  overflow-y: auto;
}

.text-content::-webkit-scrollbar {
  width: 10px;
}

.text-content::-webkit-scrollbar-track {
  background: transparent;
}

.text-content::-webkit-scrollbar-thumb {
  background: #C7C7CC;
  border-radius: 5px;
  border: 2px solid #FFFFFF;
}

.text-content p {
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  margin: 0;
  white-space: pre-wrap;
}

.image-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-content img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Vue 3 Transition classes */
.modal-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95) translateY(10px);
}

@media only screen and (max-width: 768px) {
  .modal-mask {
    padding: 12px;
  }

  .modal-bar {
    height: 32px;
  }

  .modal-body {
    padding: 16px;
  }

  .text-content {
    max-height: 300px;
  }

  .text-content p {
    font-size: 13px;
  }

  .image-content img {
    max-height: 350px;
  }
}

@media only screen and (max-width: 480px) {
  .modal-mask {
    padding: 8px;
  }

  .modal-header {
    font-size: 12px;
  }

  .modal-body {
    padding: 12px;
  }

  .text-content {
    max-height: 250px;
  }

  .image-content img {
    max-height: 280px;
  }
}
</style>
