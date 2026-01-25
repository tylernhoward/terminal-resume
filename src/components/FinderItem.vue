<template>
  <a class="item" @click="eventBus.emit('toggle-modal', name)">
    <div class="folder">
      <div class="folder-back"></div>
      <div class="folder-tab"></div>
      <div class="folder-front"></div>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 12px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
  width: 100%;
  max-width: 100px;
}

.item:hover {
  background: rgba(0, 122, 255, 0.1);
}

.item:hover .label {
  color: #007AFF;
}

.item:active {
  background: rgba(0, 122, 255, 0.2);
}

.folder {
  width: 64px;
  height: 52px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.2s ease;
}

.item:hover .folder {
  transform: scale(1.05);
}

.folder-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #66BFFF 0%, #0A84FF 100%);
  border-radius: 2px 8px 8px 8px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 2px 8px rgba(10, 132, 255, 0.3);
}

.folder-tab {
  position: absolute;
  top: -6px;
  left: 0;
  width: 28px;
  height: 12px;
  background: linear-gradient(180deg, #8DD0FF 0%, #5AC8FA 100%);
  border-radius: 4px 8px 0 0;
  clip-path: polygon(0 100%, 0 30%, 15% 0, 85% 0, 100% 30%, 100% 100%);
}

.folder-front {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75%;
  background: linear-gradient(180deg, #5AC8FA 0%, #007AFF 100%);
  border-radius: 0 0 8px 8px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.folder-front::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 8px;
  right: 8px;
  height: 3px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
}

.label {
  margin-top: 8px;
  font-size: 11px;
  font-weight: 400;
  color: #1D1D1F;
  text-align: center;
  line-height: 1.3;
  word-break: break-word;
  max-width: 90px;
  transition: color 0.15s ease;
}

@media only screen and (max-width: 768px) {
  .item {
    padding: 8px 4px;
    max-width: 80px;
  }

  .folder {
    width: 52px;
    height: 42px;
  }

  .folder-tab {
    width: 22px;
    height: 10px;
    top: -5px;
  }

  .label {
    font-size: 10px;
    max-width: 75px;
    margin-top: 6px;
  }
}

@media only screen and (max-width: 480px) {
  .item {
    padding: 6px 2px;
    max-width: 70px;
  }

  .folder {
    width: 44px;
    height: 36px;
  }

  .folder-tab {
    width: 18px;
    height: 8px;
    top: -4px;
  }

  .label {
    font-size: 9px;
    max-width: 65px;
  }
}
</style>
