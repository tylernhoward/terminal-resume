<template>
  <a class="item" @click="$emit('open-file')">
    <div class="file" :class="iconClass">
      <div class="file-body">
        <div class="file-fold"></div>
        <div class="file-decoration">
          <!-- Text file: lines -->
          <template v-if="file.type === 'text'">
            <div class="text-line"></div>
            <div class="text-line short"></div>
            <div class="text-line"></div>
            <div class="text-line short"></div>
          </template>
          <!-- Image file: thumbnail icon -->
          <template v-else-if="file.type === 'image'">
            <div class="image-icon">
              <div class="image-mountain"></div>
              <div class="image-sun"></div>
            </div>
          </template>
          <!-- Link files: arrow -->
          <template v-else>
            <div class="link-arrow">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="label">{{ file.name }}</div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FileItem as FileItemType } from './ProjectData'

const props = defineProps<{
  file: FileItemType
}>()

defineEmits<{
  'open-file': []
}>()

const iconClass = computed(() => {
  switch (props.file.type) {
    case 'text': return 'file-text'
    case 'image': return 'file-image'
    case 'link-github': return 'file-link'
    case 'link-explore': return 'file-link'
    default: return ''
  }
})
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

.file {
  width: 52px;
  height: 64px;
  position: relative;
  transition: transform 0.2s ease;
}

.item:hover .file {
  transform: scale(1.05);
}

.file-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%);
  border-radius: 4px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.file-fold {
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, transparent 50%, #E0E0E0 50%);
  border-bottom-left-radius: 4px;
}

.file-fold::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #F5F5F5 50%, transparent 50%);
  box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.05);
}

.file-decoration {
  position: absolute;
  inset: 18px 8px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

/* Text file styling */
.file-text .file-body {
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
}

.text-line {
  width: 100%;
  height: 3px;
  background: #D0D0D0;
  border-radius: 1px;
}

.text-line.short {
  width: 70%;
  align-self: flex-start;
}

/* Image file styling */
.file-image .file-body {
  background: linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%);
}

.image-icon {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(180deg, #87CEEB 0%, #5DADE2 100%);
  border-radius: 2px;
  overflow: hidden;
}

.image-mountain {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%);
  clip-path: polygon(0 100%, 30% 30%, 50% 60%, 70% 20%, 100% 100%);
}

.image-sun {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #F1C40F;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(241, 196, 15, 0.5);
}

/* Link file styling */
.file-link .file-body {
  background: linear-gradient(180deg, #FFF8E8 0%, #FFE8C0 100%);
}

.link-arrow {
  width: 24px;
  height: 24px;
  color: #F39C12;
}

.link-arrow svg {
  width: 100%;
  height: 100%;
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

  .file {
    width: 44px;
    height: 54px;
  }

  .file-fold {
    width: 10px;
    height: 10px;
  }

  .file-fold::before {
    width: 10px;
    height: 10px;
  }

  .file-decoration {
    inset: 14px 6px 8px;
    gap: 3px;
  }

  .text-line {
    height: 2px;
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

  .file {
    width: 38px;
    height: 46px;
  }

  .file-fold {
    width: 8px;
    height: 8px;
  }

  .file-fold::before {
    width: 8px;
    height: 8px;
  }

  .file-decoration {
    inset: 12px 5px 6px;
    gap: 2px;
  }

  .link-arrow {
    width: 18px;
    height: 18px;
  }

  .label {
    font-size: 9px;
    max-width: 65px;
  }
}
</style>
