<template>
  <div class="terminal">
    <div class="termContent">
      <div class="output" v-if="output">{{ output }}</div>
      <div class="input-line">
        <span class="prompt">{{ inputLabel }}&nbsp;</span>
        <input v-on:keyup.enter="commandEntered" v-model="command" class="commandInput" autofocus/>
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

const output = ref('')
const command = ref('')
const history = ref<string[]>([])

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
})
</script>

<style scoped>
.terminal {
  color: #87FF65;
  background-color: #28262C;
  height: 100%;
  overflow: auto;
}

.termContent {
  padding: 20px 15px;
  text-align: left;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  min-height: 100%;
}

.output {
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 10px;
}

.input-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.prompt {
  white-space: nowrap;
}

.commandInput {
  flex: 1;
  min-width: 100px;
  font-family: inherit;
  font-size: inherit;
  border: none;
  background: transparent;
  outline: none;
  color: inherit;
  padding: 0;
}

/* Tablet */
@media (max-width: 1024px) {
  .termContent {
    font-size: 13px;
    padding: 15px 12px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .termContent {
    font-size: 12px;
    padding: 12px 10px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .termContent {
    font-size: 11px;
    padding: 10px 8px;
  }
}
</style>
