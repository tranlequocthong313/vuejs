import { computed, ref } from 'vue'

import {
  initBoard,
  gameOver,
  makeMove,
  undo as _undo,
  redo as _redo
} from '@/core'

const useTicTacToe = () => {
  const boardProperty = {
    rowNum: 3,
    colNum: 3
  }
  const boards = ref([initBoard({ rowNum: boardProperty.rowNum, colNum: boardProperty.colNum })])
  const player = ref(1)
  const winner = ref(null)
  const currentMove = ref(0)

  const board = computed(() => boards.value[currentMove.value])

  const mark = (position) => {
    if (winner.value) {
      return
    }

    try {
      const { newBoard, newPlayer } = makeMove(board.value, { ...position, player: player.value })

      player.value = newPlayer
      currentMove.value++
      boards.value.splice(currentMove.value, boards.value.length - currentMove.value, newBoard)

      const state = gameOver(newBoard)
      if (state !== 0) {
        winner.value = state === -1 ? `Draw!` : `Player ${state} won!`
      }
    } catch (error) {
      return
    }
  }

  const undo = () => {
    if (winner.value) {
      return
    }

    try {
      const { newMove, newPlayer } = _undo({
        currentMove: currentMove.value,
        player: player.value
      })
      currentMove.value = newMove
      player.value = newPlayer
    } catch (error) {
      return
    }
  }

  const redo = () => {
    if (winner.value) {
      return
    }

    try {
      const { newMove, newPlayer } = _redo({
        currentMove: currentMove.value,
        numberOfBoards: boards.value.length - 1,
        player: player.value
      })
      currentMove.value = newMove
      player.value = newPlayer
    } catch (error) {
      return
    }
  }

  const reset = () => {
    boards.value = [initBoard({ rowNum: boardProperty.rowNum, colNum: boardProperty.colNum })]
    currentMove.value = 0
    player.value = 1
    winner.value = null
  }

  return {
    board,
    winner,
    mark,
    reset,
    undo,
    redo
  }
}

export default useTicTacToe
