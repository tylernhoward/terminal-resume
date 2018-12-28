<template>
<div class="termContent">
    <div class ="output" v-if="output">{{ output }}</div>
    <span>{{ inputLabel }}&nbsp;</span>
	<input v-on:keyup.enter="commandEntered" v-model="command" class=commandInput autofocus/>
</div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  data () {
    return {
      output: '',
      command: '',
    }
  },
  props: {
    inputLabel: String,
    intro: String
  }
})

export default class TerminalEmu extends Vue {
    history: String[];
    constructor(){
        super();
        this.history = [];
    }

    created(){
        this.$props.intro ? 
                this.$data.output = `${this.$props.intro}\nEnter 'help' for list of commands\n`:
                this.$data.output = `${this.printAbout()}\nEnter 'help' for list of commands\n`;

    }
    
    private commandEntered(){
        // grab reference to command for convenience
        const command = this.$data.command;
        // do not allow empty commands
        if(command==="") return;
        // store in history for "lols"
        this.history.unshift(command);
        this.history.length = this.history.length < 10 ? this.history.length : 10;
        // clear command input
        this.$data.command = "";
        // if a matching command is found, set the output accordingly
        switch (command) {
            case Command.Help:
                this.setOutput(this.printHelp());
                break;
            case Command.Clear:
                this.setOutput("");
                break;
            case Command.History:
                this.setOutput(this.printHistory());
                break;
            case Command.About:
                this.setOutput(this.printAbout());
                break;
            case Command.Resume:
                console.log(command);
                break;
            case Command.Projects:
                console.log(command);
                break;
            default:
                this.setOutput(`Command: '${command}' not found`);
                break;
        }
    }

    /* convenience method to improve readability and set output to string */
    private setOutput(output: String){
        this.$data.output = output;
    }

    /* return help screen output with list of commands */
    private printHelp(): String{
        return `List of tasks with descriptions
    clear    - clears output window
    history  - list previous commands entered by user
    whoami   - about the user
    resume   - prints resume content of user
    projects - list personal projects of user`;
    }

    /* return output of past 10 commands entered for gimmicky purposes */
    private printHistory(): String{
        let historyString: String = "Recent commands entered (last 10)";
        this.history.forEach(element => {
            historyString = `${historyString}\n\t${element}`
        });
        return `${historyString}`;
    }

    private printAbout(): String{
        return `A little bit about Tyler Howard:

    Education  =    Towson University (2018)
        Major  =    Computer Science, concentration in Software Engineering
        Minor  =    Mathematics

    Employment =    Contrast Security
                    Startup located in Baltimore, MD, 
                    specializing in runtime application self-protection (RASP)
    
    Free Time  = {  messing around with webdev,
                    film photography,
                    video games,
                    playing guitar,
                    tinkering with old cars  }
`
    }

}
enum Command {
        Help = "help",
        Clear = "clear",
        History = "history",
        About = "whoami",
        Resume = "resume",
        Projects = "projects",
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.output{
      white-space: pre
}
.commandInput {
    padding-top:5px;
    width:80%;
    text-overflow:ellipsis;
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: transparent;
    outline: none;
    color: inherit;
}

.termContent{
    padding-top: 5px;
    padding-left: 10px;
    text-align: left;
    font-family: 'Monaco', 'Courier New';
    font-size: 14px;
    color: #87FF65;
}
</style>
