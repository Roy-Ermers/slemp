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
      :class="{disabled: names.length < 2 || names.includes('')}"
    >Volgende</button>
    <p class="alerttxt">{{AlertTxt}}</p>
  </div>
</template>
<script>
export default {
  name: "nameForm",
  data: () => {
    return { names: [], AlertTxt: "" };
  },
  methods: {
    submit: function() {
      if (this.names.length < 2 || this.names.includes("")) {
        this.AlertTxt = "Voeg minimaal 2 spelers toe";
      } else {
        this.$emit("Names", this.names);
      }
    },
    addNewName(ev) {
      if (
        (ev.keyCode == 13 || ev instanceof FocusEvent) &&
        ev.target.value != ""
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
  text-align: center;
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
.name {
  overflow: hidden;
  animation: reveal 500ms ease-in-out forwards;
}
@keyframes reveal {
  0% {
    opacity: 0;
    max-height: 0;
  }
  100% {
    opacity: 1;
    max-height: 100px;
  }
}
input[type="text"].new {
  background-color: #80f397;
}
.nextbtn {
  font-family: "Poppins", sans-serif;
  background-color: #00ac22;
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
.nextbtn.disabled {
  opacity: 0.5;
  cursor: pointer;
  background-color: #ac000021;
}
.nextbtn:hover:not(.disabled) {
  background-color: #00ac22;
}
.container {
  height: 35vh;
  overflow-y: auto;
}
.alerttxt {
  color: #ffffff;
  font-weight: bold;
  margin: 0;
  min-height: 1.5em;
  transition: opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.alerttxt:empty {
  opacity: 0.5;
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
    width: 100vw;
    border-radius: 0;
  }
  .formcontainer {
    height: 100vh;
    width: 100vw;
    margin-top: 5em;
  }
  .container {
    margin-top: 3em;
  }
}
</style>
