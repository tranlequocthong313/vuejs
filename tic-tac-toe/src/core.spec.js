import { describe, expect, it } from 'vitest'
import useTicTacToe from './composables/useTicTacToe'
import {
    isValidPosition,
    initBoard,
    gameOver,
    makeMove,
    undo,
    redo
} from '@/core'

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

    it('should throw an error when the movement is illegal', () => {
        const board = initBoard({ rowNum: 3, colNum: 3 })

        expect(() => makeMove(board, { row: -1, col: 0 })).toThrow()
        expect(() => makeMove(board, { row: 0, col: -1 })).toThrow()
        expect(() => makeMove(board, { row: 10, col: 1 })).toThrow()
        expect(() => makeMove(board, { row: 1, col: 10 })).toThrow()

        const { newBoard } = makeMove(board, { row: 1, col: 1 })
        expect(() => makeMove(newBoard, { row: 1, col: 1 })).toThrow()
    })

    it('should make a move and return a new board and player when the movement is legal', () => {
        const board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]

        let player = 1
        board.map((row, i) => {
            row.map((col, j) => {
                const { newBoard, newPlayer } = makeMove(board, { row: i, col: j, player })
                expect(newBoard[i][j]).toEqual(player)
                expect(newPlayer).toEqual(player === 1 ? 2 : 1)
                player = newPlayer
            })
        })
    })

    it('should not undo and throw an error if there has not been any move yet', () => {
        const currentMove = 0

        expect(() => undo({ currentMove })).toThrow()
    })

    it('should undo when there has been a move', () => {
        const currentMove = 1

        const { newMove, newPlayer } = undo({ currentMove, player: 2 })

        expect(newMove).toEqual(0)
        expect(newPlayer).toEqual(1)
    })

    it('should not redo and throw an error if there is the last move', () => {
        const currentMove = 0
        const numberOfBoards = 0

        expect(() => redo({ currentMove, numberOfBoards })).toThrow()
    })

    it('should undo when there has been a move', () => {
        const currentMove = 3
        const numberOfBoards = 4

        const { newMove, newPlayer } = redo({ currentMove, numberOfBoards, player: 2 })

        expect(newMove).toEqual(numberOfBoards)
        expect(newPlayer).toEqual(1)
    })
})
