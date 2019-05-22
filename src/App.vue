<template>
  <div id="app">
    <img key="header" alt="Vue logo" src="./assets/Slemp_Logo.png" v-if="start" class="header">
    <img key="logo" alt="Vue logo" src="./assets/Slemp_Logo.png" v-else class="logo" @click="Reset">
    <div class="install-prompt" :class="{show: installPrompt}">
      Wil je de slemp app installeren?
      <button class="primary" @click="installApp">installeer</button>
      <button @click="dismisssInstallBanner">nee dankje</button>
    </div>
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
    return { start: true, names: [], installPrompt: undefined };
  },
  methods: {
    SetNames: function(names) {
      this.names = names;
    },
    dismisssInstallBanner() {
      this.installPrompt = undefined;
      localStorage.setItem("dismissInstall", true);
    },
    installApp() {
      this.installPrompt.prompt();
      this.installPrompt = undefined;
    },
    Reset() {
      this.names = [];
      this.start = true;
    }
  },
  mounted: function() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
    window.addEventListener("beforeinstallprompt", e => {
      if (!localStorage.getItem("dismissInstall", true)) {
        e.preventDefault();
        this.installPrompt = e;
      }
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
  background: #00e62e repeating-conic-gradient(#00e62e 0 15deg, #00df2d 0 30deg);
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
.install-prompt {
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  position: fixed;
  top: -5em;
  width: 75vw;
  line-height: 2em;
  left: 12.5vw;
  text-align: left;
  vertical-align: middle;
  padding: 0.2em 1em;
  box-sizing: border-box;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: top 250ms ease-in-out;
}
.install-prompt.show {
  transition-delay: 500ms;
  top: 0;
}
.install-prompt button {
  background-color: transparent;
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  margin: 0.25em;
  color: #00e62e;
  font-weight: 700;
  float: right;
}
.install-prompt button.primary {
  background-color: #00e62e;
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  margin: 0.25em;
  color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
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
    margin-top: 15vh;
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
