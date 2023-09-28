import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import App from './App.vue'

const factory = () => {
  return mount(App)
}

describe('App', () => {
  it('should have empty board by default', () => {
    const wrapper = factory()

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(wrapper.find(`#col-${i}-${j}`).text()).toContain('')
        expect(wrapper.find(`#col-${i}-${j}`).text()).not.toContain('X')
        expect(wrapper.find(`#col-${i}-${j}`).text()).not.toContain('O')
      }
    }

    expect(wrapper.find('button.play-again').exists()).toBeFalsy()
    expect(wrapper.find('.gameover').exists()).toBeFalsy()
  })

  it('should display correct mark when users are playing', async () => {
    const wrapper = factory()

    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')
    await wrapper.find('#col-2-2').trigger('click')

    expect(wrapper.find('#col-1-1').text()).toContain('X')
    expect(wrapper.find('#col-2-1').text()).toContain('O')
    expect(wrapper.find('#col-2-2').text()).toContain('X')
  })

  it('should not let user mark a position twice', async () => {
    const wrapper = factory()

    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')

    expect(wrapper.find('#col-1-1').text()).toContain('X')
    expect(wrapper.find('#col-2-1').text()).toContain('O')
    expect(wrapper.find('#col-1-1').text()).toContain('X')
    expect(wrapper.find('#col-2-1').text()).toContain('O')
  })

  it('should show gameover text and play again button when player 1 won', async () => {
    const wrapper = factory()

    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')
    await wrapper.find('#col-2-2').trigger('click')
    await wrapper.find('#col-1-0').trigger('click')
    await wrapper.find('#col-0-0').trigger('click')

    expect(wrapper.find('button.play-again').exists()).toBeTruthy()
    expect(wrapper.find('.gameover').text()).toEqual('Player 1 won!')
  })

  it('should show gameover text and play again button when player 2 won', async () => {
    const wrapper = factory()

    await wrapper.find('#col-0-0').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-1-0').trigger('click')
    await wrapper.find('#col-0-1').trigger('click')
    await wrapper.find('#col-0-2').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')

    expect(wrapper.find('button.play-again').exists()).toBeTruthy()
    expect(wrapper.find('.gameover').text()).toEqual('Player 2 won!')
  })

  it('should show gameover text and play again button when no on won', async () => {
    const wrapper = factory()

    await wrapper.find('#col-0-0').trigger('click')
    await wrapper.find('#col-0-1').trigger('click')
    await wrapper.find('#col-0-2').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-1-0').trigger('click')
    await wrapper.find('#col-1-2').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')
    await wrapper.find('#col-2-0').trigger('click')
    await wrapper.find('#col-2-2').trigger('click')

    expect(wrapper.find('button.play-again').exists()).toBeTruthy()
    expect(wrapper.find('.gameover').text()).toEqual('Draw!')
  })

  it('should reset game when user clicks play again button', async () => {
    const wrapper = factory()

    await wrapper.find('#col-0-0').trigger('click')
    await wrapper.find('#col-0-1').trigger('click')
    await wrapper.find('#col-0-2').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-1-0').trigger('click')
    await wrapper.find('#col-1-2').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')
    await wrapper.find('#col-2-0').trigger('click')
    await wrapper.find('#col-2-2').trigger('click')

    expect(wrapper.find('button.play-again').exists()).toBeTruthy()
    expect(wrapper.find('.gameover').text()).toEqual('Draw!')

    await wrapper.find('button.play-again').trigger('click')

    expect(wrapper.find('button.play-again').exists()).toBeFalsy()
    expect(wrapper.find('.gameover').exists()).toBeFalsy()
  })

  it('should display undo and redo buttons by default', async () => {
    const wrapper = factory()

    expect(wrapper.find('button.undo').exists()).toBeTruthy()
    expect(wrapper.find('button.redo').exists()).toBeTruthy()
  })

  it('should hide undo and redo buttons when game is over', async () => {
    const wrapper = factory()

    await wrapper.find('#col-0-0').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-1-0').trigger('click')
    await wrapper.find('#col-0-1').trigger('click')
    await wrapper.find('#col-0-2').trigger('click')
    await wrapper.find('#col-2-1').trigger('click')


    expect(wrapper.find('button.undo').exists()).toBeFalsy()
    expect(wrapper.find('button.redo').exists()).toBeFalsy()
  })

  it('should undo correctly when player clicks on it', async () => {
    const wrapper = factory()

    await wrapper.find('#col-0-0').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')

    expect(wrapper.find('#col-0-0').text()).toEqual('X')
    expect(wrapper.find('#col-1-1').text()).toEqual('O')

    await wrapper.find('button.undo').trigger('click')
    expect(wrapper.find('#col-0-0').text()).toEqual('X')
    expect(wrapper.find('#col-1-1').text()).toEqual('')

    await wrapper.find('button.undo').trigger('click')
    expect(wrapper.find('#col-0-0').text()).toEqual('')
  })

  it('should redo correctly when player clicks on it', async () => {
    const wrapper = factory()

    await wrapper.find('#col-0-0').trigger('click')
    await wrapper.find('#col-1-1').trigger('click')
    await wrapper.find('#col-1-0').trigger('click')

    expect(wrapper.find('#col-0-0').text()).toEqual('X')
    expect(wrapper.find('#col-1-1').text()).toEqual('O')
    expect(wrapper.find('#col-1-0').text()).toEqual('X')

    await wrapper.find('button.undo').trigger('click')
    await wrapper.find('button.undo').trigger('click')
    expect(wrapper.find('#col-0-0').text()).toEqual('X')
    expect(wrapper.find('#col-1-1').text()).toEqual('')
    expect(wrapper.find('#col-1-0').text()).toEqual('')

    await wrapper.find('button.redo').trigger('click')
    expect(wrapper.find('#col-1-1').text()).toEqual('O')

    await wrapper.find('button.redo').trigger('click')
    expect(wrapper.find('#col-1-0').text()).toEqual('X')
  })
})
