<template>
  <h1>Reaction timer</h1>
  <p v-if='!firstPlay'>Best record: {{ bestRecord }} ms</p>
  <button class='button' :disabled='isPlaying' :class='{disabledBtn: isPlaying}' @click='play'>Play</button>
  <button class='button react-btn' v-if='showReactButton' @click='react'>React</button>
  <p v-if='showResult'>Reaction time - {{ result }} ms</p>
  <p v-if='showResult'>{{ rating }}</p>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isPlaying: false,
      showReactButton: false,
      result: 0,
      timeAtClickPlay: 0,
      showResult: false,
      bestRecord: localStorage.getItem('bestRecord') || Number.MAX_SAFE_INTEGER,
      firstPlay: localStorage.getItem('bestRecord') ? false : true,
    }
  },
  methods: {
    play() {
      if (!this.isPlaying) {
        this.result = 0
        this.showResult = false
      }
      this.isPlaying = !this.isPlaying
      setTimeout(() => {
        this.showReactButton = true
        this.timeAtClickPlay = Date.now()
      }, Math.random() * 1500 + 1000)
    },
    react() {
      this.showReactButton = false
      this.result = Date.now() - this.timeAtClickPlay
      this.bestRecord = Math.min(this.result, this.bestRecord)
      localStorage.setItem('bestRecord', this.bestRecord)
      this.firstPlay = false
      this.isPlaying = false
      this.showResult = true
    },
  },
  computed: {
    rating() {
      if (this.result < 50) {
        return '⚡'
      }
      if (this.result < 100) {
        return '🐇'
      }
      if (this.result < 1000) {
        return '🐌'
      }
      return '💀'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none;
}

.button {
  margin: 30px auto;
  display: block;
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  width: 100px;
  color: white;
  background-color: green;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
}

.react-btn {
  width: 300px;
  height: 300px;
  font-size: 50px;
  font-weight: 600;
}

.disabledBtn {
  opacity: 0.5;
}

</style>
