<script setup lang="ts">
import useTicTacToe from './composables/useTicTacToe'

const { board, winner, mark, reset } = useTicTacToe()

const chars = ['', 'X', 'O']

const getChar = (value) => {
  return chars[value]
}

const play = (row, col) => {
  try {
    mark({ row, col })
  } catch (error) {
    return
  }
}
</script>

<template>
  <div class="#app">
    <h1 class="game-title">TIC-TAC-TOE</h1>

    <h1 class="gameover" v-if="winner">{{ winner }}</h1>
    <button class="play-again" v-if="winner" @click="reset">Play again</button>

    <div class="board">
      <div class="row" v-for="(row, i) in board" :key="i">
        <div class="col" :id="`col-${i}-${j}`" v-for="(col, j) in row" :key="j" @click="play(i, j)">
          {{ getChar(col) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  user-select: none;
}

.game-title {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%);
  font-size: 60px;
  font-weight: bold;
}

.gameover {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  font-size: 30px;
  font-weight: bold;
}

.play-again {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%);
  font-size: 30px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
}

@media only screen and (max-width: 500px) {
  .game-title {
    font-size: 30px;
  }

  .gameover,
  .play-again {
    font-size: 20px;
  }
}

.board {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  width: calc(100% / 3);
  height: 100px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;
  user-select: none;
}
</style>
