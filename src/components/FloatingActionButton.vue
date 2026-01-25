<template>
  <div class="fab-container">
    <button
      class="fab-button"
      :class="{ 'is-open': showMenu }"
      @click="showMenu = !showMenu"
      aria-label="Menu"
    >
      <span class="fab-icon">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </span>
    </button>

    <Transition name="menu">
      <nav v-if="showMenu" class="fab-menu" @click.stop>
        <a
          v-for="item in menuItems"
          :key="item.label"
          :href="item.href"
          class="menu-item"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </Transition>

    <Transition name="fade">
      <div v-if="showMenu" class="backdrop" @click="showMenu = false"></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showMenu = ref(false)

const menuItems = [
  { label: 'Resume', href: '/Tyler_Howard_Resume.pdf', icon: 'fas fa-file-alt', external: false },
  { label: 'Publications', href: '/ISI_2018_paper_108.pdf', icon: 'fas fa-book', external: false },
  { label: 'Old Site', href: 'https://tylernhoward.github.io/old-site', icon: 'fas fa-history', external: true },
  { label: 'Markdown Editor', href: 'https://tylernhoward.github.io/markdowner', icon: 'fas fa-edit', external: true },
]

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') showMenu.value = false
}

onMounted(() => document.addEventListener('keydown', handleEscape))
onUnmounted(() => document.removeEventListener('keydown', handleEscape))
</script>

<style scoped>
.fab-container {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 1000;
}

.fab-button {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: #28262C;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fab-button:hover {
  background: #138A36;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(19, 138, 54, 0.3);
}

.fab-button.is-open {
  background: #138A36;
}

.fab-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20px;
}

.bar {
  height: 2px;
  background: #F7F9F9;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-button.is-open .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.fab-button.is-open .bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.fab-button.is-open .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.fab-menu {
  position: absolute;
  top: 54px;
  right: 0;
  background: #28262C;
  border-radius: 12px;
  padding: 8px 0;
  min-width: 180px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #F7F9F9;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #87FF65;
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.menu-item:hover {
  background: rgba(135, 255, 101, 0.1);
  color: #87FF65;
}

.menu-item:hover::before {
  transform: scaleY(1);
}

.menu-item i {
  width: 18px;
  text-align: center;
  font-size: 14px;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

/* Transitions */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
