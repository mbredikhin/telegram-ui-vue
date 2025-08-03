import Pagination from '../Pagination.vue';
import { mount } from '@/lib/tests';
import { nextTick } from 'vue';

describe('Pagination', () => {
  test('renders default single page with previous and next', () => {
    const wrapper = mount(Pagination);
    const buttons = wrapper.findAll('[role="tablist"] .button');

    expect(buttons).toHaveLength(3);
    expect(buttons[1].text()).toBe('1');
    expect(buttons[1].classes()).toContain('button--selected');
  });

  test('renders ellipsis correctly for multi-page input', () => {
    const wrapper = mount(Pagination, {
      attrs: {
        count: 10,
        page: 5,
        siblingCount: 1,
        boundaryCount: 1,
      },
    });

    const textContent = wrapper
      .findAll('.button')
      .map((button) => button.text().trim())
      .filter(Boolean);

    expect(textContent).toContain('...');
    expect(textContent).toContain('1');
    expect(textContent).toContain('10');
    expect(textContent).toContain('5');
  });

  test('adds correct class for selected and disabled buttons', () => {
    const wrapper = mount(Pagination, {
      attrs: { count: 3, page: 1 },
    });

    const buttons = wrapper.findAll('.button');
    expect(buttons[0].classes()).toContain('button--disabled');
    expect(buttons[1].classes()).toContain('button--selected');
    expect(buttons[3].classes()).not.toContain('button--disabled');
  });

  test('emits change event on click', async () => {
    const wrapper = mount(Pagination, {
      attrs: { count: 5, page: 1 },
    });

    const page3 = wrapper
      .findAll('.button')
      .find((button) => button.text() === '3');
    expect(page3).toBeDefined();

    await page3?.trigger('click');

    const emitted = wrapper.emitted('change');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0][0]).toBe(3);
    expect(emitted?.[0][1]).toBeInstanceOf(Event);
  });

  test('does not emit when clicking ellipsis or disabled', async () => {
    const wrapper = mount(Pagination, {
      attrs: {
        count: 10,
        page: 1,
        siblingCount: 0,
        boundaryCount: 0,
      },
    });

    const ellipsis = wrapper
      .findAll('.button')
      .find((button) => button.text() === '...');
    await ellipsis?.trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();

    const prev = wrapper
      .findAll('.button')
      .find((button) => button.find('svg'));
    await prev?.trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  test('applies disabled class to entire component', () => {
    const wrapper = mount(Pagination, {
      props: { disabled: true },
    });

    const root = wrapper.find('[role="tablist"]');
    expect(root.classes()).toContain('pagination--disabled');
    expect(root.attributes('aria-disabled')).toBe('true');
  });

  test('updates selection when props.page changes (controlled)', async () => {
    const wrapper = mount(Pagination, {
      attrs: {
        count: 5,
        page: 1,
      },
    });

    expect(wrapper.findAll('.button')[1].text()).toBe('1');

    await wrapper.setProps({ page: 4 });
    await nextTick();

    const selected = wrapper
      .findAll('.button')
      .find((button) => button.classes().includes('button--selected'));

    expect(selected?.text()).toBe('4');
  });

  test('renders correctly with boundaryCount and siblingCount set to 0', () => {
    const wrapper = mount(Pagination, {
      attrs: {
        count: 7,
        page: 4,
        siblingCount: 0,
        boundaryCount: 0,
      },
    });

    const pages = wrapper
      .findAll('.button')
      .map((button) => button.text().trim());
    expect(pages).toContain('4');
    expect(pages).toContain('...');
    expect(pages.length).toBeLessThan(7);
  });
});
