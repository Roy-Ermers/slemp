<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
