<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <FloatingActionButton id="fab"/>
    <main class="content">
      <Greeting id="greeting" :msg="greetingMsg"/>
      <Window id="window"/>
    </main>
    <footer class="footer">
      <span class="left-align">Made with <i class="far fa-heart"/> using <a class="link fab fa-vuejs" href="https://vuejs.org" role="button"/></span>
      <span class="right-align">Updated: {{ updatedDate }}</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import FloatingActionButton from './components/FloatingActionButton.vue'
import Window from './components/Window.vue'
import Greeting from './components/Greeting.vue'

const greetingMsg = "Hey there! I'm Tyler."
const updatedDate = new Date().getFullYear().toString()
</script>

<style>
* {
  box-sizing: border-box;
}

body, html {
  height: 100%;
  width: 100%;
  background-color: #F7F9F9;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #171D1C;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding-bottom: 30px;
}

.left-align {
  padding-left: 10px;
  float: left;
}

.right-align {
  padding-right: 10px;
  float: right;
}

.footer {
  font-size: 10pt;
  width: 100%;
  position: fixed;
  text-align: left;
  border-top: #cccccc solid 1px;
  background-color: #DBDBDB;
  height: 24px;
  line-height: 24px;
  left: 0;
  bottom: 0;
  z-index: 50;
}

.link {
  color: #171D1C;
  text-decoration: none;
}

/* Mobile: stack vertically, compact spacing */
@media (max-width: 768px) {
  .content {
    padding: 10px;
    padding-bottom: 34px;
  }

  .footer {
    font-size: 9pt;
  }

  .left-align {
    padding-left: 5px;
  }

  .right-align {
    padding-right: 5px;
  }
}
</style>
