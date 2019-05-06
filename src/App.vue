<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/Slemp_Logo.png" v-if="start">
    <img alt="Vue logo" src="./assets/Slemp_Logo.png" v-else class="logo">

    <start-button v-if="start" v-on:Start="start = false;"/>
    <name-form v-if="!start"/>
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
