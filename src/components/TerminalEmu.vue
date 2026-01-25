<template>
  <div class="terminal" @click="focusInput">
    <div class="termContent">
      <div class="output" v-if="output">{{ output }}</div>
      <div class="input-line">
        <span class="prompt">{{ inputLabel }}</span>
        <span class="typed-text">{{ command }}</span><span class="cursor"></span>
        <input
          ref="inputRef"
          v-on:keyup.enter="commandEntered"
          v-model="command"
          class="commandInput"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { eventBus } from '../eventBus'

defineProps<{
  inputLabel: string
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const output = ref('')
const command = ref('')
const history = ref<string[]>([])

function focusInput() {
  inputRef.value?.focus()
}

enum Command {
  Help = 'help',
  Clear = 'clear',
  History = 'history',
  Lol = 'lol',
  About = 'whoami',
  Resume = 'skills',
  Projects = 'projects',
}

function printAbout(): string {
  return `A little bit about Tyler Howard:

    Education  =    Towson University (2018)
        Major  =    Computer Science, Software Engineering
        Minor  =    Mathematics

    Employment =    Contrast Security
                    Software Engineer
                    Baltimore, MD

    Free Time  = {  messing around with webdev,
                    film photography,
                    video games,
                    backpacking
                    playing guitar,
                    tinkering with old cars  }
`
}

function printHelp(): string {
  return `List of tasks with descriptions
    ${Command.Clear}    - clears output window
    ${Command.History}  - list previous commands entered by user
    ${Command.About}   - about the user
    ${Command.Resume}   - prints resume content of the user
    ${Command.Projects} - open personal projects of user
    ${Command.Lol}      - tell me a funny joke`
}

function printHistory(): string {
  let historyString = 'Recent commands entered (last 10)'
  history.value.forEach(element => {
    historyString = `${historyString}\n\t${element}`
  })
  return historyString
}

function printSkills(): string {
  return `Experience and Skills:
    Primary Languages = {
        Java,
        TypeScript
    }
    Experienced in Front-End Frameworks = {
        Angular,
        Vue,
        React
    }
    Knowledge and Interests = {
        Object Oriented Design,
        Application Security,
        Containerization w/ Docker,
        Serverless w/ AWS,
        Full Stack Web Development,
        Java Instrumentation
    }

     Resume available on sidebar!
    `
}

function printJoke() {
  const randomNumber = Math.floor(Math.random() * 100) + 1
  const requestUrl = 'https://www.reddit.com/r/cleanjokes/hot.json?limit=100'
  axios.get(requestUrl)
    .then(response => {
      const post = response.data.data.children[randomNumber].data
      const frame = post.title
      const punchline = post.selftext.trim()
      output.value = `${frame}\n\n${punchline}\n\n\nDownload at https://github.com/tylernhoward/lol-node-cli`
    })
    .catch(() => {
      output.value = "We couldn't find any jokes :("
    })
}

function commandEntered() {
  const cmd = command.value
  if (cmd === '') return

  history.value.unshift(cmd)
  if (history.value.length > 10) {
    history.value.length = 10
  }
  command.value = ''

  switch (cmd) {
    case Command.Help:
      output.value = printHelp()
      break
    case Command.Clear:
      output.value = ''
      break
    case Command.History:
      output.value = printHistory()
      break
    case Command.About:
      output.value = printAbout()
      break
    case Command.Resume:
      output.value = printSkills()
      break
    case Command.Lol:
      printJoke()
      break
    case Command.Projects:
      eventBus.emit('toggle-finder')
      break
    default:
      output.value = `Command: '${cmd}' not found`
      break
  }
}

onMounted(() => {
  output.value = `${printAbout()}\nEnter 'help' for list of commands\n`
  focusInput()
})
</script>

<style scoped>
.terminal {
  background: linear-gradient(180deg, #1E1E1E 0%, #161616 100%);
  overflow: auto;
  height: calc(100% - 38px);
  margin-top: 38px;
  cursor: text;
}

.terminal::-webkit-scrollbar {
  width: 14px;
}

.terminal::-webkit-scrollbar-track {
  background: #1E1E1E;
}

.terminal::-webkit-scrollbar-thumb {
  background: #3A3A3A;
  border-radius: 7px;
  border: 3px solid #1E1E1E;
}

.terminal::-webkit-scrollbar-thumb:hover {
  background: #4A4A4A;
}

.termContent {
  padding: 12px 16px;
  text-align: left;
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #C7C7C7;
}

.output {
  white-space: pre-wrap;
  word-break: break-word;
  color: #E0E0E0;
  margin-bottom: 8px;
}

.input-line {
  display: flex;
  align-items: center;
  position: relative;
}

.prompt {
  color: #32D74B;
  font-weight: 500;
  margin-right: 6px;
  text-shadow: 0 0 10px rgba(50, 215, 75, 0.3);
}

.typed-text {
  color: #FFFFFF;
  white-space: pre;
}

.commandInput {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  padding: 0;
  border: none;
  pointer-events: none;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 17px;
  background: #32D74B;
  animation: blink 1s step-end infinite;
  box-shadow: 0 0 8px rgba(50, 215, 75, 0.5);
  flex-shrink: 0;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Selection styling */
.commandInput::selection {
  background: rgba(50, 215, 75, 0.3);
}

.output::selection {
  background: rgba(50, 215, 75, 0.3);
}

@media only screen and (max-width: 768px) {
  .terminal {
    height: calc(100% - 32px);
    margin-top: 32px;
  }

  .termContent {
    font-size: 12px;
    padding: 10px 12px;
  }

  .cursor {
    width: 7px;
    height: 15px;
  }
}

@media only screen and (max-width: 480px) {
  .termContent {
    font-size: 11px;
    padding: 8px 10px;
  }
}
</style>
