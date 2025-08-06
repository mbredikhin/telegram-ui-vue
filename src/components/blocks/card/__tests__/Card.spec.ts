import { h } from 'vue';
import { mount, randomString } from '@/lib/tests';
import Card from '../Card.vue';
import CardCell from '../CardCell.vue';
import CardChip from '../CardChip.vue';

describe('Card', () => {
  test('renders default slot content', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '<div class="test-content"></div>',
      },
    });

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.classes()).toContain('card');
  });

  test('injects type="ambient" to CardCell', () => {
    const wrapper = mount(Card, {
      props: {
        type: 'ambient',
      },
      slots: {
        default: h(CardCell),
      },
      global: {
        components: { CardCell },
      },
    });

    const cell = wrapper.findComponent(CardCell);

    expect(cell.exists()).toBe(true);
    expect(cell.classes()).toContain('card-cell');
    expect(cell.classes()).toContain('card-cell--ambient');
  });

  test('injects default type="plain" to CardCell when not specified', () => {
    const wrapper = mount(Card, {
      slots: {
        default: h(CardCell),
      },
      global: {
        components: { CardCell },
      },
    });

    const cell = wrapper.findComponent(CardCell);

    expect(cell.exists()).toBe(true);
    expect(cell.classes()).toContain('card-cell');
    expect(cell.classes()).not.toContain('card-cell--ambient');
  });

  test('renders CardChip inside Card with correct position and slot content', () => {
    const content = randomString();
    const wrapper = mount(Card, {
      slots: {
        default: h(
          CardChip,
          {},
          {
            default: () => content,
          }
        ),
      },
      global: {
        components: { CardChip },
      },
    });

    const chip = wrapper.findComponent(CardChip);

    expect(chip.exists()).toBe(true);
    expect(chip.classes()).toContain('card-chip');
    expect(chip.text()).toBe(content);
  });
});
