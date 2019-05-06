<template>
  <div>
    <div :key="name" v-for="(name,i) in names" class="name">
      <input type="text" v-model.lazy="names[i]" :id="name">
    </div>
    <button @click="names.push('');">Add</button>
  </div>
</template>
<script>
export default {
  name: "nameForm",
  data: () => {
    return { names: [""] };
  }
};
</script>
