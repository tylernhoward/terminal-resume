<template>
<div class="terminal">
        <div class="termWindow">
          <div class="bar">
            <div class="termCircles" style="background-color:tomato;"></div>
            <div class="termCircles" style="background-color:gold;"></div>
            <div class="termCircles" style="background-color:limegreen;"></div>
          </div>
          <TerminalEmu :inputLabel= "label"/>
        </div>
      </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import TerminalEmu from './TerminalEmu.vue';
@Component({
  components: {
    TerminalEmu
  }
})
export default class Terminal extends Vue {
  private label:string = "[thoward~]$"
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.terminal {
  display: flex;
  justify-content: center;
}
.termWindow {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    background-color: #28262C;
    height: 53vh;
    width: 70%;
}
.commandInput {
    width:80%;
    text-overflow:ellipsis;
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: transparent;
    outline: none;
    color: inherit;
}

.bar{
    display: flex;
    height: 20px;
    background-color: #DBDBDB;
}

.termCircles {
  justify-content: left;
    margin: 3px;
    display: inline-block;
    background-color: #fd9494;
    border-radius: 50%;
    border:#cccccc solid 1px;
    width: 10px;
    height: 10px;
}
</style>
