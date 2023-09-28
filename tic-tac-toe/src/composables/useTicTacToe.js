import { ref } from 'vue'

import { initBoard, marked, isValidPosition, gameOver } from '@/core'

const useTicTacToe = () => {
  const boardProperty = {
    rowNum: 3,
    colNum: 3
  }
  const board = ref(initBoard({ rowNum: boardProperty.rowNum, colNum: boardProperty.colNum }))
  const player = ref(1)
  const winner = ref(null)

  const mark = (position) => {
    if (winner.value) {
      return
    }
    if (!isValidPosition(position, board.value) || marked(position, board.value)) {
      throw new Error(`
            Expected: 
                row >= 0 and col >= 0,
                row < ${boardProperty.rowNum} and col < ${boardProperty.colNum}
            Got:
                row ${position.row}, col ${position.col}
            `)
    }

    board.value[position.row][position.col] = player.value
    const state = gameOver(board.value)

    if (state !== 0) {
      if (state === -1) {
        winner.value = `Draw!`
      } else {
        winner.value = `Player ${state} won!`
      }
    } else {
      player.value = player.value === 1 ? 2 : 1
    }
  }

  const reset = () => {
    board.value = initBoard({ rowNum: boardProperty.rowNum, colNum: boardProperty.colNum })
    player.value = 1
    winner.value = null
  }

  return {
    board,
    winner,
    mark,
    reset
  }
}

export default useTicTacToe
