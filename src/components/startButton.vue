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
}
</style>


