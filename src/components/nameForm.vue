<template>
  <div class="formcontainer">
    <div :key="name" v-for="(name,i) in names" class="name">
      <input type="text" v-model.lazy="names[i]" :id="name">
    </div>
    <button @click="names.push('');">Add</button>
    <button @click="submit">volgende</button>
  </div>
</template>
<script>
export default {
  name: "nameForm",
  data: () => {
    return { names: [""] };
  },
  methods: {
    submit: function() {
      this.$emit("Names", this.names);
    }
  }
};
</script>
<style>
.formcontainer {
}
</style>
