<template>
  <button @click="next">Start</button>
</template>

<script>
export default {
  name: "StartButton",
  methods: {
    next: function() {
      this.$emit("Start");
    }
  }
};
</script>

<style scoped>
button {
  font-family: "Poppins", sans-serif;
  background-color: RGBA(0, 0, 0, 0.25);
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  font-size: 17px;
  text-decoration: none;
  width: 175px;
  height: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  outline: none;
  transition: background-color 100ms ease-in-out;
}
button:hover {
  background-color: RGBA(0, 0, 0, 0.5);
}
button:active {
  position: relative;
  top: 1px;
}
@media screen and (max-width: 812px) {
  button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>


