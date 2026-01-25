<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModal" class="modal-mask" @click="closeModal">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop>
            <div class="modal-bar">
              <div class="modal-traffic-lights">
                <button class="modal-close" @click="closeModal" aria-label="Close">
                  <svg viewBox="0 0 12 12"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="modal-circle minimize"></div>
                <div class="modal-circle maximize"></div>
              </div>
              <span class="modal-header">{{ name }}</span>
            </div>
            <div class="modal-body">
              <div class="modal-image-container" v-if="project?.image">
                <img class="image-box" :src="project.image" :alt="name"/>
              </div>
              <div class="description">
                <p>{{ project?.description }}</p>
                <div class="btn-group">
                  <a class="modal-btn github" v-if="project?.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i>
                    <span>View on GitHub</span>
                  </a>
                  <a class="modal-btn explore" v-if="project?.exploreUrl" :href="project.exploreUrl" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Explore</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ProjectData } from './ProjectData'
import { eventBus } from '../eventBus'

const props = defineProps<{
  data: Map<string, ProjectData>
}>()

const showModal = ref(false)
const name = ref('')
const project = ref<ProjectData | undefined>(undefined)

function handleToggleModal(projectName: string | undefined) {
  if (projectName) {
    const projectInfo = props.data.get(projectName)
    name.value = projectName
    project.value = projectInfo
  }
  showModal.value = !showModal.value
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  eventBus.on('toggle-modal', handleToggleModal)
})

onUnmounted(() => {
  eventBus.off('toggle-modal', handleToggleModal)
})
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
  max-width: 700px;
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
  display: flex;
  gap: 24px;
  padding: 24px;
}

.modal-image-container {
  flex: 0 0 45%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-box {
  width: 100%;
  height: auto;
  display: block;
}

.description {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.description p {
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  margin: 0 0 20px 0;
}

.btn-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.modal-btn.github {
  background: #24292F;
  color: white;
}

.modal-btn.github:hover {
  background: #1B1F23;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-btn.explore {
  background: linear-gradient(180deg, #007AFF 0%, #0056CC 100%);
  color: white;
}

.modal-btn.explore:hover {
  background: linear-gradient(180deg, #0066DD 0%, #004499 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.modal-btn i {
  font-size: 14px;
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
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }

  .modal-image-container {
    flex: none;
  }

  .description p {
    font-size: 13px;
  }

  .btn-group {
    justify-content: center;
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

  .modal-btn {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
