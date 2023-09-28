import { describe, expect, it } from 'vitest'
import useTicTacToe from './useTicTacToe'
import { isValidPosition, initBoard, gameOver } from '@/core'

const boardProperty = { rowNum: 3, colNum: 3 }

const gameNotOverCases = [
  [
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 2]
  ],
  [
    [1, 0, 0],
    [2, 0, 2],
    [0, 0, 1]
  ],
  [
    [2, 0, 2],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [2, 1, 2],
    [1, 0, 0],
    [2, 1, 1]
  ],
  [
    [2, 1, 2],
    [1, 0, 1],
    [2, 0, 1]
  ]
]

const gameOverCases = [
  {
    board: [
      [0, 1, 2],
      [0, 1, 0],
      [0, 1, 2]
    ],
    winner: 1
  },
  {
    board: [
      [1, 0, 0],
      [2, 1, 2],
      [0, 0, 1]
    ],
    winner: 1
  },
  {
    board: [
      [2, 2, 2],
      [0, 1, 1],
      [0, 1, 0]
    ],
    winner: 2
  },
  {
    board: [
      [2, 1, 2],
      [1, 2, 0],
      [2, 1, 1]
    ],
    winner: 2
  },
  {
    board: [
      [2, 1, 1],
      [1, 1, 2],
      [2, 2, 1]
    ],
    winner: -1
  }
]

describe('core', () => {
  it('should valiate correctly', () => {
    const { board } = useTicTacToe()

    expect(isValidPosition({ row: -1, col: 2 }, board.value)).toBeFalsy()
    expect(isValidPosition({ row: 1, col: -2 }, board.value)).toBeFalsy()
    expect(isValidPosition({ row: 10, col: 2 }, board.value)).toBeFalsy()
    expect(isValidPosition({ row: 2, col: 10 }, board.value)).toBeFalsy()

    for (let i = 0; i < boardProperty.rowNum; i++) {
      for (let j = 0; j < boardProperty.colNum; j++) {
        expect(isValidPosition({ row: i, col: j }, board.value)).toBeTruthy()
      }
    }
  })

  it('should throw a error if board size is invalid', () => {
    expect(() => initBoard({ rowNum: 0, colNum: 0 })).toThrow()
    expect(() => initBoard({ rowNum: 0, colNum: 20 })).toThrow()
    expect(() => initBoard({ rowNum: -1, colNum: 2 })).toThrow()
    expect(() => initBoard({ rowNum: 1, colNum: -2 })).toThrow()
  })

  it('should init a board correctly', () => {
    expect(initBoard(boardProperty)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])

    expect(initBoard({ rowNum: 3, colNum: 2 })).toEqual([
      [0, 0],
      [0, 0],
      [0, 0]
    ])

    expect(initBoard({ rowNum: 1, colNum: 1 })).toEqual([[0]])
  })

  it('should return false when game is not over', () => {
    gameNotOverCases.forEach((_case) => {
      expect(gameOver(_case)).toEqual(0)
    })
  })

  it('should return true when game is over', () => {
    gameOverCases.forEach((_case) => {
      expect(gameOver(_case.board)).toEqual(_case.winner)
    })
  })
})

describe('useTicTacToe', () => {
  it('should have empty board by default', () => {
    const { board } = useTicTacToe()

    expect(board.value).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })

  it('should throw error when receive invalid position', () => {
    const { mark } = useTicTacToe()

    expect(() => mark({ row: -1, col: 2 })).toThrow()
    expect(() => mark({ row: 1, col: -2 })).toThrow()
    expect(() => mark({ row: 1, col: 10 })).toThrow()
    expect(() => mark({ row: 10, col: 2 })).toThrow()
  })

  it('should mark correct position when receive valid position', () => {
    const { mark, board } = useTicTacToe()

    mark({ row: 0, col: 1 })
    expect(board.value[0][1]).toEqual(1)

    mark({ row: 1, col: 1 })
    expect(board.value[1][1]).toEqual(2)

    mark({ row: 2, col: 2 })
    expect(board.value[2][2]).toEqual(1)

    mark({ row: 1, col: 2 })
    expect(board.value[1][2]).toEqual(2)
  })
})
