<template>
  <div @click="fillQuestion" class="questions" :class="{ done: time<=0}">
    <p class="question" v-if="questionText">{{questionText}}</p>
    <div @click.stop="startTimer" v-if="currentQuestion.timer" class="timer">
      <svg viewBox="-1 -1 2 2" style="transform: rotate(-0.25turn)">
        <path :d="path" fill="#00911D"></path>
        <circle r="1" fill="rgba(0,0,0,.5)"></circle>
      </svg>
      <p>{{Math.round(this.time)}}</p>
    </div>
  </div>
</template>
<style scoped>
.question {
  color: white;
  font-family: "poppins";
  font-size: 72px;
  text-align: center;
  padding: 0 2em;
  pointer-events: none;
}
.questions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.timer {
  position: relative;
  width: 5em;
  height: 5em;
}
.done {
  animation: flicker 500ms ease infinite;
}
@keyframes flicker {
  0% {
    background-color: initial;
  }
  50% {
    background-color: #fff;
  }
  100% {
    background-color: initial;
  }
}
.done .timer > svg,
.done .timer > p {
  display: none;
}
.timer > svg {
  pointer-events: none;
  width: 100%;
}
.timer > p {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 3em;
  color: #fff;
  margin: 0;
  text-align: center;
  line-height: 1.666em;
  font-family: "poppins";
  font-weight: 300;
  mix-blend-mode: screen;
}
@media screen and (max-width: 812px) {
  .question {
    font-size: 2em;
  }
}
</style>

<script>
export default {
  name: "question",
  props: ["names"],
  data: function() {
    return {
      currentQuestion: {
        text: "At je drankje.",
        timer: 30
      },
      time: 30,
      database: {}
    };
  },
  computed: {
    path: function() {
      return this.getPath(this.time || 1);
    },
    //a really large text parser.
    questionText: function() {
      let text = this.currentQuestion.text.toString();
      let personsMatches = text.match(/{(person\d*)\}/gi);

      //parse persons
      let persons = {};
      if (personsMatches)
        personsMatches.forEach(person => {
          if (persons[person]) {
            text = text.replace(person, persons[person]);
          } else {
            //keep looping until a name comes up that hasn't been used.
            let name = this.names[
              Math.floor(this.names.length * Math.random())
            ];
            let tries = 0;
            while (Object.values(persons).includes(name)) {
              name = this.names[Math.floor(this.names.length * Math.random())];
              if (tries++ >= this.names.length * 2) {
                throw new Error("absolutely no name can be found.");
                break;
              }
            }

            console.log(person, name);
            text = text.replace(person, name);
            persons[person] = name;
          }
        });
      //parse keys
      let keysMatches = text.match(/\{(\w*)\}/gi);
      let keys = {};
      if (keysMatches)
        keysMatches.forEach(key => {
          let name = key.substring(1, key.length - 1);
          if (key.startsWith("person")) return;
          if (keys[key]) {
            text = text.replace(key, keys[name]);
          } else {
            let list = this.database.keys[name];
            console.log(list);
            if (!list || key == "time") {
              text = text.replace(key, this.currentQuestion.timer);
            } else {
              keys[name] = list[Math.floor(list.length * Math.random())];
              console.log("key = " + keys[name]);
              text = text.replace(key, keys[name]);
            }
          }
        });
      return text;
    }
  },
  methods: {
    startTimer() {
      startTime = undefined;
      const updateTime = time => (this.time = time);
      RenderTimer(updateTime, this.currentQuestion.timer);
    },
    getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return { x, y };
    },
    getPath() {
      const percent = this.time / this.currentQuestion.timer;
      const largeArcFlag = percent > 0.5 ? 1 : 0;
      const endCoords = this.getCoordinatesForPercent(percent);
      // create an array and join it just for code readability
      const pathData = [
        `M ${this.getCoordinatesForPercent(0).x} ${
          this.getCoordinatesForPercent(0).y
        }`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endCoords.x} ${endCoords.y}`, // Arc
        `L 0 0` // Line
      ].join(" ");
      return pathData;
    },
    fillQuestion: function() {
      let q = this.database.questions[
        Math.floor(this.database.questions.length * Math.random())
      ];
      this.currentQuestion = q;

      if (q.timer) {
        this.time = q.timer;
      } else this.time = undefined;
    }
  },
  mounted: async function() {
    const res = await fetch("/questions.json");
    const json = await res.json();

    this.database = json;
    this.fillQuestion();
  }
};
let startTime;
function RenderTimer(time, timer) {
  startTime = startTime || Date.now();
  let curTime = (timer * 1000 - (Date.now() - startTime)) / 1000;
  time(curTime);
  if (curTime > 0) {
    requestAnimationFrame(() => RenderTimer(time, timer));
  } else {
    navigator.vibrate([300, 300, 300, 300, 300, 300, 300, 300, 300]);
  }
}
</script>
