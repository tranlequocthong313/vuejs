export const marked = ({ row, col }, board) => {
  return board[row][col] !== 0
}

export const isValidPosition = ({ row, col }, board) => {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length
}

export const initBoard = ({ rowNum, colNum }) => {
  if (rowNum <= 0 || colNum <= 0) {
    throw new Error(`
        Expected:
            Board's size must be greater than 0
        Got:
            Row: ${rowNum}
            Col: ${colNum}
        `)
  }

  const board = []
  for (let i = 0; i < rowNum; i++) {
    board.push([])
    for (let j = 0; j < colNum; j++) {
      board[i].push(0)
    }
  }
  return board
}

export const gameOver = (board) => {
  let hasEmpty = false

  for (let i = 0; i < board.length; i++) {
    if (board[i].includes(0)) {
      hasEmpty = true
    }
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== 0) {
      return board[i][0]
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== 0) {
      return board[0][i]
    }
  }

  if (
    (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0)
  ) {
    return board[1][1]
  }

  return !hasEmpty ? -1 : 0
}
