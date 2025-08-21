import { mount } from '@/lib/tests';
import Ripple from '../Ripple.vue';
import type { Wave } from '../lib';

describe('Ripple', () => {
  function makeWave(overrides: Partial<Wave> = {}): Wave {
    return {
      x: 10,
      y: 20,
      date: Date.now(),
      pointerId: 1,
      ...overrides,
    };
  }

  test('renders no waves if clicks is empty', () => {
    const wrapper = mount(Ripple, { props: { clicks: [] } });

    expect(wrapper.findAll('.wave')).toHaveLength(0);
  });

  test('renders waves for each click', () => {
    const wave1 = makeWave({ x: 50, y: 100, date: 1000 });
    const wave2 = makeWave({ x: 25, y: 75, date: 0 });

    const wrapper = mount(Ripple, { props: { clicks: [wave1, wave2] } });

    const waves = wrapper.findAll('.wave');
    expect(waves).toHaveLength(2);

    expect(waves[0].attributes('style')).toContain('top: 100px;');
    expect(waves[0].attributes('style')).toContain('left: 50px;');

    expect(waves[1].attributes('style')).toContain('top: 75px;');
    expect(waves[1].attributes('style')).toContain('left: 25px;');
  });
});
