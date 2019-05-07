<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <img key="header" alt="Vue logo" src="./assets/Slemp_Logo.png" v-if="start" class="header">
      <img
        key="logo"
        alt="Vue logo"
        src="./assets/Slemp_Logo.png"
        v-else
        class="logo"
        @click="start = true"
      >
    </transition>
    <start-button v-if="start" v-on:Start="start = false;"/>
    <name-form v-if="!start&&names.length==0" v-on:Names="SetNames"/>

    <transition-group name="slide-fade" tag="ul">
      <li v-for="name in names" :key="name">{{name}}</li>
    </transition-group>
  </div>
</template>

<script>
import startButton from "./components/startButton";
import nameForm from "./components/nameForm";
export default {
  name: "app",
  components: {
    startButton,
    nameForm
  },
  data: () => {
    return { start: true, names: [] };
  },
  methods: {
    SetNames: function(names) {
      this.names = names;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");
body {
  background-color: #00e62e;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 97vh;
}
.logo {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 15em;
}
.logo:hover {
  cursor: pointer;
}
.header {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40em;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
