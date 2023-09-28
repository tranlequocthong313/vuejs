import { describe, expect, it } from 'vitest'
import useTicTacToe from './useTicTacToe'

describe('useTicTacToe', () => {
  it('should have empty board by default', () => {
    const { board } = useTicTacToe()

    expect(board.value).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })

  it('should not mark when receive invalid position', () => {
    const { mark, board } = useTicTacToe()

    mark({ row: -1, col: 2 })
    mark({ row: 1, col: -2 })
    mark({ row: 1, col: -2 })
    mark({ row: 1, col: 10 })
    mark({ row: 10, col: 2 })

    expect(board.value).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
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

  it('should undo correctly', () => {
    const { mark, undo, board } = useTicTacToe()

    mark({ row: 0, col: 1 })
    mark({ row: 1, col: 1 })
    mark({ row: 2, col: 2 })
    mark({ row: 1, col: 2 })

    undo()
    undo()

    expect(board.value[1][2]).toEqual(0)
    expect(board.value[2][2]).toEqual(0)
    expect(board.value[1][1]).toEqual(2)
  })

  it('should redo correctly', () => {
    const { mark, undo, redo, board } = useTicTacToe()

    mark({ row: 0, col: 1 })
    mark({ row: 1, col: 1 })
    mark({ row: 2, col: 2 })

    undo()
    expect(board.value[2][2]).toEqual(0)
    expect(board.value[1][1]).toEqual(2)

    redo()
    expect(board.value[2][2]).toEqual(1)
  })

  it('should not redo ', () => {
    const { redo, board } = useTicTacToe()

    redo()
    expect(board.value).toEqual(
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
    )
  })
})
