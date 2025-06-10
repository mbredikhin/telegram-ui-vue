import AccordionSummary from '../AccordionSummary.vue';
import { accordionInjectionKey } from '../../lib';
import { ref } from 'vue';
import { mount } from '@/helpers/tests';

describe('AccordionSummary', () => {
  const injection = ref({
    labelId: 'label-id',
    contentId: 'content-id',
    expanded: false,
    onChange: vi.fn(),
  });

  test('sets accessibility attributes', () => {
    const wrapper = mount(AccordionSummary, {
      global: {
        provide: {
          [accordionInjectionKey]: injection,
        },
      },
    });

    const cell = wrapper.find('[aria-expanded]');
    expect(cell.attributes('aria-expanded')).toBe('false');
    expect(cell.attributes('aria-controls')).toBe('content-id');
    expect(cell.attributes('id')).toBe('label-id');
  });

  test('toggles expanded state on click', async () => {
    const wrapper = mount(AccordionSummary, {
      global: {
        provide: {
          [accordionInjectionKey]: injection,
        },
      },
    });

    await wrapper.trigger('click');
    expect(injection.value.onChange).toHaveBeenCalledWith(true);
  });

  test('renders chevron and updates class when expanded', async () => {
    injection.value.expanded = true;
    const wrapper = mount(AccordionSummary, {
      global: {
        provide: {
          [accordionInjectionKey]: injection,
        },
      },
    });

    const chevron = wrapper.find('.chevron');
    expect(chevron.exists()).toBe(true);
    expect(chevron.classes()).toContain('chevron--expanded');
  });
});
