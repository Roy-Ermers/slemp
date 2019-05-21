<template>
  <div class="formcontainer">
    <h1>Voer de deelnemers in:</h1>
    <hr>
    <div class="container">
      <div :key="name" v-for="(name,i) in names" class="name">
        <input type="text" placeholder="Naam" v-model.lazy="names[i]" :id="name">
      </div>
      <input
        type="text"
        placeholder="Nieuw lid toevoegen"
        class="new"
        @keyup="addNewName"
        @blur="addNewName"
      >
    </div>
    <button
      @click="submit"
      class="nextbtn"
      :disabled="names.length<2 && names.includes('')"
    >Volgende</button>
  </div>
</template>
<script>
export default {
  name: "nameForm",
  data: () => {
    return { names: [] };
  },
  methods: {
    submit: function() {
      this.$emit("Names", this.names);
    },
    addNewName(ev) {
      if (
        ev.keyCode == 13 ||
        (ev instanceof FocusEvent && ev.target.value != "")
      ) {
        this.names.push(ev.target.value);
        ev.target.value = "";
      }
    }
  }
};
</script>
<style scoped>
.formcontainer {
  transform: translateZ(-1400px);
  opacity: 0;
  animation: slide-in-fwd-center 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both 0.35s;
}
h1 {
  color: white;
}
hr {
  margin-top: -20px;
  border: 2px solid white;
  background-color: white;
  width: 80px;
}
input {
  font-family: "Poppins", sans-serif;
  width: 300px;
  border: 1px solid #00e62e;
  height: 25px;
  padding: 5px 0px 5px 20px;
  border-radius: 5px;
  margin: 5px;
  margin-left: 20px;
  box-shadow: 0 3px 6px RGBA(0, 0, 0, 16%);
  outline: none;
}
input[type="text"].new {
  background-color: rgba(255, 255, 255, 0.5);
}
.addbtn {
  border-radius: 100%;
  border: 1px solid #248b00;
  background-color: #248b00;
  color: white;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 30px;
  height: 30px;
  font-weight: 300;
  position: absolute;
  right: -30px;
  bottom: 5px;
  font-size: 32px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  padding-left: 5px;
  outline: none;
}
.nextbtn {
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
  margin: 0 auto;
  display: block;
  margin-top: 80px;
  font-style: italic;
  outline: none;
  transition: background-color 250ms ease-in-out;
}
.nextbtn:disabled {
  opacity: 0.5;
  cursor: pointer;
}
.nextbtn:hover:not(:disabled) {
  background-color: RGBA(0, 0, 0, 0.5);
}
.container {
  height: 35vh;
  overflow-y: auto;
}
::-webkit-scrollbar {
  background-color: #00e62e;
  border: 0px;
  width: 0.25em;
  outline: none;
}
::-webkit-scrollbar-thumb {
  background-color: RGBA(0, 0, 0, 0.25);
  border-radius: 1em;
  outline: none;
}
@keyframes slide-in-fwd-center {
  0% {
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}
@media screen and (max-width: 812px) {
  .nextbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
  }
  .formcontainer {
    height: 100vh;
    margin-top: 5em;
  }
  .container {
    margin-top: 3em;
  }
}
</style>
