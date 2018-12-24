<template>
<div class = "menu-button">
    <i class="fas fa-bars"></i>
</div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FloatingActionButton extends Vue {

}

</script>
<style>
.menu-button{
    position:fixed;
    opacity: 0.9;
    right: 7.5%;
    top:20px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #28262C;
    color:#F7F9F9;
    height:35px;
    width:35px;
}
.menu-button:hover {
    color:#28262C;
    background-color: #058ED9;
    text-decoration: none;
    cursor: pointer;
}
</style>

