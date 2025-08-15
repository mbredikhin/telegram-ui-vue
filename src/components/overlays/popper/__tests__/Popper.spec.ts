import { mount, randomString } from '@/lib/tests';
import { defineComponent, h, markRaw } from 'vue';
import Popper from '../Popper.vue';
import FloatingArrow from '../floatingArrow/FloatingArrow.vue';

vi.mock('@floating-ui/vue', () => {
  return {
    autoUpdate: vi.fn(),
    useFloating: vi.fn(() => ({
      placement: 'bottom',
      middlewareData: { arrow: { x: 5, y: 10 } },
      floatingStyles: { position: 'absolute', top: '10px', left: '20px' },
    })),
  };
});

vi.mock('../lib/useFloatingMiddlewares', () => ({
  useFloatingMiddlewares: vi.fn(() => ({
    strictPlacement: 'bottom',
    middlewares: [],
  })),
}));

describe('Popper', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders default popper with div root', () => {
    const content = randomString();
    const wrapper = mount(Popper, {
      props: { anchor: document.createElement('button') },
      slots: {
        default: () => h('span', { class: 'test-content' }, content),
      },
    });

    const popper = wrapper.find('.popper');

    expect(popper.exists()).toBe(true);
    expect(popper.element.tagName).toBe('DIV');
    expect(popper.find('.test-content').text()).toBe(content);
  });

  test('respects "is" prop to render custom root element', () => {
    const wrapper = mount(Popper, {
      props: {
        anchor: document.createElement('button'),
        is: 'section',
      },
    });

    expect(wrapper.find('.popper').element.tagName).toBe('SECTION');
  });

  test('renders FloatingArrow when withArrow is true', () => {
    const wrapper = mount(Popper, {
      props: {
        anchor: document.createElement('button'),
      },
    });

    const arrow = wrapper.findComponent(FloatingArrow);

    expect(arrow.exists()).toBe(true);
    expect(arrow.props('coords')).toEqual({ x: 5, y: 10 });
    expect(arrow.props('placement')).toBe('bottom');
  });

  test('passes custom arrow icon', () => {
    const CustomIcon = markRaw(
      defineComponent({
        name: 'CustomIcon',
        setup() {
          return () => h('span', { class: 'test-icon' }, 'icon');
        },
      })
    );

    const wrapper = mount(Popper, {
      props: {
        anchor: document.createElement('button'),
        arrowIcon: CustomIcon,
      },
    });

    const arrow = wrapper.findComponent(FloatingArrow);

    expect(arrow.props('icon')).toBe(CustomIcon);
  });

  test('does not render without anchor', () => {
    const wrapper = mount(Popper, {
      props: {
        anchor: null,
      },
    });

    expect(wrapper.find('.popper').exists()).toBe(false);
  });

  test('merges attrs with defaults and applies to popper', () => {
    const wrapper = mount(Popper, {
      props: {
        anchor: document.createElement('button'),
      },
      attrs: {
        'data-test': randomString(),
      },
    });

    const popper = wrapper.find('.popper');

    expect(popper.attributes('data-test')).toBeTruthy();
    expect(popper.attributes('style')).toContain('position: absolute');
  });
});
