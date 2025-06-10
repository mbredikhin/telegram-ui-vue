import AccordionContent from '../AccordionContent.vue';
import { AccordionInjection, accordionInjectionKey } from '../../lib';
import { Ref, ref } from 'vue';
import { mount } from '@/helpers/tests';

describe('AccordionContent', () => {
  let injection: Ref<AccordionInjection>;

  beforeEach(() => {
    injection = ref({
      labelId: 'label-id',
      contentId: 'content-id',
      expanded: true,
      onChange: vi.fn(),
    });
  });

  test('renders content and sets accessibility attributes', () => {
    const wrapper = mount(AccordionContent, {
      global: {
        provide: {
          [accordionInjectionKey as symbol]: injection,
        },
      },
      slots: {
        default: '<div class="content-body">Body</div>',
      },
    });

    const region = wrapper.find('[role="region"]');
    expect(region.attributes('aria-labelledby')).toBe('label-id');
    expect(region.attributes('id')).toBe('content-id');
    expect(region.attributes('aria-hidden')).toBe('false');
    expect(wrapper.find('.content-body').exists()).toBe(true);
  });

  test('collapsed state sets max-height to 0px', () => {
    injection.value.expanded = false;

    const wrapper = mount(AccordionContent, {
      global: {
        provide: {
          [accordionInjectionKey as symbol]: injection,
        },
      },
    });

    const body = wrapper.find('.body');
    expect(body.attributes('style')).toContain('max-height: 0px');
  });

  test('expanded state sets max-height based on scrollHeight', async () => {
    const wrapper = mount(AccordionContent, {
      global: {
        provide: {
          [accordionInjectionKey as symbol]: injection,
        },
      },
      attachTo: document.body,
    });

    const body = wrapper.find('.body').element;

    Object.defineProperty(body, 'scrollHeight', {
      configurable: true,
      get: () => 100,
    });

    await wrapper.vm.$nextTick();

    const bodyDiv = wrapper.find('.body');
    expect(bodyDiv.attributes('style')).toContain('max-height: 100px');
  });
});
