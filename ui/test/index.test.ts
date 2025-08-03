import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ZWatermark } from '../lib'

const AXIOM = 'Rem is the best girl'

describe('watermark.vue', () => {
  it('create', () => {
    const wrapper = mount(() =>
      h(ZWatermark, { class: 'watermark' }, () => AXIOM),
    )

    expect(wrapper.classes()).toContain('watermark')
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('content props', () => {
    const wrapper = mount(() =>
      h(ZWatermark, {
        class: 'watermark',
        content: ['水印测试', 'zhangqihui'],
        rotate: -30,
        getContainer: () => document.createElement('div'),
      }, () => AXIOM),
    )

    expect(wrapper.html()).toMatchInlineSnapshot(`"<div class="watermark">Rem is the best girl</div>"`)
  })
  it('image props', () => {
    const wrapper = mount(() =>
      h(ZWatermark, {
        class: 'watermark',
        width: 200,
        height: 200,
        image: 'https://www.baidu.com/img/flexible/logo/pc/result@2.png',
        getContainer: () => document.createElement('div'),
      }, () => AXIOM),
    )

    expect(wrapper.html()).toMatchInlineSnapshot(`"<div class="watermark">Rem is the best girl</div>"`)
  })
  it('container empty', () => {
    const wrapper = mount(() =>
      h(ZWatermark, {
        class: 'watermark',
        style: { display: 'none' },
        // @ts-expect-error
        getContainer: () => null,
      }, () => AXIOM),
    )

    expect(wrapper.text()).toContain(AXIOM)
  })
  it('slots', () => {
    const wrapper = mount(() =>
      h(ZWatermark, null, () => AXIOM),
    )

    expect(wrapper.text()).toContain(AXIOM)
  })
})
