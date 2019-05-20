<template>
  <div id="app">
    <img key="header" alt="Vue logo" src="./assets/Slemp_Logo.png" v-if="start" class="header">
    <img
      key="logo"
      alt="Vue logo"
      src="./assets/Slemp_Logo.png"
      v-else
      class="logo"
      @click="start = true"
    >
    <start-button v-if="start" @Start="start = false"/>
    <name-form v-if="!start&&names.length==0" v-on:Names="SetNames"/>
    <question v-if="!start&&names.length>0" :names="names"/>
  </div>
</template>

<script>
import startButton from "./components/startButton";
import nameForm from "./components/nameForm";
import question from "./components/Question";
export default {
  name: "app",
  components: {
    startButton,
    nameForm,
    question
  },
  data: () => {
    return { start: true, names: [] };
  },
  methods: {
    SetNames: function(names) {
      this.names = names;
    }
  },
  mounted: function() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      e.prompt();
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");
* {
  outline: none;
}
body {
  background-color: #00e62e;
  overflow: hidden;
  margin: 0;
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
  height: 100vh;
}
.logo {
  position: fixed;
  left: 1em;
  top: 0px;
  width: 15em;
  opacity: 0.5;
  filter: brightness(15%);
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
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-fade-leave-active {
  transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1),
    opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.questions {
  flex: 1;
}
@media screen and (max-width: 812px) {
  #app {
    justify-content: flex-start;
  }
  .header {
    pointer-events: none;
    padding: 2em;
    max-height: calc(100% - 100px);
    max-width: calc(100% - 100px);
    box-sizing: border-box;
    object-fit: contain;
  }
  .logo {
    pointer-events: none;
    display: none;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active,
  .slide-fade-enter,
  .slide-fade-leave-to {
    transition-duration: 1ms;
    transform: initial;
    opacity: 1;
  }
}
</style>
