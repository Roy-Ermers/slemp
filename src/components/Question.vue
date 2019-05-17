<template>
  <div>
    <p v-if="currentQuestion.text">{{currentQuestion.text}}</p>
    <svg @click="startTimer" viewBox="-1 -1 2 2" style="transform: rotate(-0.25turn)">
      <path :d="path" fill="white"></path>
    </svg>
    <p>{{this.time}}</p>
  </div>
</template>
<script>
export default {
  name: "question",
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
      return this.getPath(this.time);
    }
  },
  methods: {
    startTimer() {
      const time = Date.now();
      const func = () => {
        this.time = Date.now() - time;
        if (this.time <= 30) requestAnimationFrame(func);
      };

      func();
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
    }
  },
  mounted: async function() {
    const res = await fetch("/questions.json");
    const json = await res.json();

    this.database = json;
    this.fillQuestion();
  }
};
</script>
