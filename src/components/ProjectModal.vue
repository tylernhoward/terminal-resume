<template>
  <div name="modal" v-if="showModal">
    <div class="modal-mask" @click="closeModal">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-bar">
            <div class="modal-close" @click="closeModal"></div>
            <span class="modal-header">{{ name }}</span>
          </div>
          <div class="modal-body">
            <img class="image-box" v-if="project?.image" :src="project.image"/>
            <div class="description">
              <p>{{ project?.description }}</p>
              <div class="btn-group">
                <a class="modal-btn" v-if="project?.githubUrl" :href="project.githubUrl" target="_blank">Github <i class="fab fa-github"></i></a>
                <a class="modal-btn" v-if="project?.exploreUrl" :href="project.exploreUrl" target="_blank">Explore <i class="far fa-compass"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
p {
  line-height: 2;
  padding: 10px;
}

.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  height: fit-content;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-bar {
  border-radius: 6px 6px 0px 0px;
  background-color: gainsboro;
  width: 100%;
  height: 20px;
}

.modal-close {
  z-index: 2;
  margin: 3px;
  background-color: tomato;
  border-radius: 50%;
  border: #cccccc solid 1px;
  width: 12px;
  height: 12px;
  position: relative;
  top: 0;
  float: left;
  cursor: pointer;
}

.modal-body {
  display: flex;
  padding: 10px;
}

.image-box {
  width: 50%;
  height: 100%;
}

.description {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
  text-align: left;
}

.btn-group {
  width: 100%;
  display: flex;
  justify-content: center;
}

.modal-btn {
  color: black;
  text-decoration: none;
  width: fit-content;
  padding: 5px;
  margin: 0px 5px;
  border-radius: 5px 5px 5px 5px;
  background-color: gainsboro;
}

.modal-btn:hover {
  padding: 4px;
  border: #87FF65 solid 1px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
