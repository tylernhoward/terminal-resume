<template>
  <a class="item" @click="eventBus.emit('toggle-modal', name)">
    <div class="folder"/>
    <div class="label">{{ name }}</div>
  </a>
</template>

<script setup lang="ts">
import { eventBus } from '../eventBus'

defineProps<{
  name: string
}>()
</script>

<style scoped>
.item {
  margin: 15px;
  text-decoration: none;
  padding: 15px 10px 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.folder {
  width: 80px;
  height: 52px;
  position: relative;
  background-color: #5AC8FA;
  border-radius: 0 6px 6px 6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.folder::before {
  content: '';
  width: 40%;
  height: 8px;
  border-radius: 4px 4px 0 0;
  background-color: #4AB8E8;
  position: absolute;
  top: -8px;
  left: 0;
}

.label {
  color: #333;
  padding-top: 10px;
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
  max-width: 90px;
  margin: 0 auto;
}

/* Tablet */
@media (max-width: 1024px) {
  .item {
    margin: 12px;
    padding: 12px 8px 8px;
  }

  .folder {
    width: 70px;
    height: 45px;
  }

  .folder::before {
    height: 7px;
    top: -7px;
  }

  .label {
    font-size: 11px;
    max-width: 80px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .item {
    margin: 8px;
    padding: 10px 6px 6px;
  }

  .folder {
    width: 60px;
    height: 40px;
    border-radius: 0 4px 4px 4px;
  }

  .folder::before {
    height: 6px;
    top: -6px;
    border-radius: 3px 3px 0 0;
  }

  .label {
    font-size: 10px;
    padding-top: 8px;
    max-width: 70px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .item {
    margin: 5px;
    padding: 8px 4px 4px;
  }

  .folder {
    width: 50px;
    height: 32px;
  }

  .folder::before {
    height: 5px;
    top: -5px;
  }

  .label {
    font-size: 9px;
    max-width: 60px;
  }
}
</style>
