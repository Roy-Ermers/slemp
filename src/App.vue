<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/Slemp_Logo.png" class="logo">
    <start-button v-if="start"/>
  </div>
</template>

<script>
import startButton from "./components/startButton";
export default {
  name: "app",
  components: {
    startButton
  },
  data: () => {
    return { start: true };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");
body {
  background-color: #00e62e;
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 97vh;
}
.logo {
  left: 0px;
  top: 0px;
  width: 15em;
  height: 8em;
}
</style>
