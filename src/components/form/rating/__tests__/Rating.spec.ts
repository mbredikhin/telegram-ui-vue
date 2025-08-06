import { mount } from '@/lib/tests';
import Rating from '../Rating.vue';

test('renders correct number of icons based on `max`', () => {
  const wrapper = mount(Rating, {
    props: { max: 3 },
  });

  expect(wrapper.findAll('.element')).toHaveLength(3);
});

test('renders 5 icons by default', () => {
  const wrapper = mount(Rating);

  expect(wrapper.findAll('.element')).toHaveLength(5);
});

test('renders picked elements for integer value', () => {
  const wrapper = mount(Rating, {
    props: { value: 3 },
  });

  expect(wrapper.findAll('.element--picked')).toHaveLength(3);
});

test('renders fractional picked width for non-integer value', () => {
  const wrapper = mount(Rating, {
    props: {
      value: 2.5,
      precision: 0.5,
    },
  });

  const picked = wrapper.findAll('.element--picked');

  expect(picked).toHaveLength(3);

  const last = picked[2];

  expect(last.attributes('style')).toContain('width: 50%');
});

test('emits change when selecting an input', async () => {
  const wrapper = mount(Rating, {
    props: { precision: 1 },
  });

  const input = wrapper.find('input[value="4.0"]');
  await input.setValue();

  expect(wrapper.emitted('change')).toBeTruthy();
  expect(wrapper.emitted('change')![0]).toEqual([4]);
});
