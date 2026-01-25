<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModal" class="modal-mask" @click="closeModal">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop>
            <div class="modal-bar">
              <div class="modal-close" @click="closeModal"></div>
              <span class="modal-header">{{ name }}</span>
            </div>
            <div class="modal-body">
              <img class="image-box" v-if="project?.image" :src="project.image" :alt="name"/>
              <div class="description">
                <p>{{ project?.description }}</p>
                <div class="btn-group">
                  <a class="modal-btn" v-if="project?.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i> Github
                  </a>
                  <a class="modal-btn" v-if="project?.exploreUrl" :href="project.exploreUrl" target="_blank" rel="noopener">
                    <i class="far fa-compass"></i> Explore
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

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  eventBus.on('toggle-modal', handleToggleModal)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  eventBus.off('toggle-modal', handleToggleModal)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-wrapper {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-bar {
  background-color: #e8e8e8;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-close {
  width: 12px;
  height: 12px;
  background-color: #ff5f57;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
}

.modal-close:hover {
  opacity: 0.8;
}

.modal-header {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.modal-body {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.image-box {
  width: 45%;
  max-width: 350px;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
}

.description {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.description p {
  line-height: 1.7;
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #444;
}

.btn-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #f0f0f0;
  font-size: 13px;
  transition: all 0.2s;
}

.modal-btn:hover {
  background-color: #28262C;
  color: #87FF65;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.25s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

/* Tablet */
@media (max-width: 1024px) {
  .modal-body {
    padding: 15px;
    gap: 15px;
  }

  .image-box {
    width: 40%;
  }

  .description p {
    font-size: 13px;
  }
}

/* Mobile - stack vertically */
@media (max-width: 768px) {
  .modal-mask {
    padding: 10px;
  }

  .modal-body {
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }

  .image-box {
    width: 100%;
    max-width: none;
    max-height: 200px;
    object-fit: cover;
  }

  .description p {
    font-size: 13px;
    line-height: 1.6;
  }

  .btn-group {
    justify-content: center;
  }

  .modal-btn {
    padding: 10px 20px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .modal-header {
    font-size: 13px;
  }

  .modal-body {
    padding: 12px;
  }

  .description p {
    font-size: 12px;
  }

  .modal-btn {
    font-size: 12px;
    padding: 8px 14px;
  }
}
</style>
