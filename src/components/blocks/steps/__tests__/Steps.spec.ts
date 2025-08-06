import { mount } from '@/lib/tests';
import Steps from '../Steps.vue';

describe('Steps', () => {
  test('renders the correct number of steps', () => {
    const wrapper = mount(Steps, {
      props: {
        count: 5,
        progress: 0,
      },
    });

    const steps = wrapper.findAll('.step');

    expect(steps).toHaveLength(5);
  });

  test('applies active class to completed steps', () => {
    const wrapper = mount(Steps, {
      props: {
        count: 5,
        progress: 3,
      },
    });

    const steps = wrapper.findAll('.step');

    steps.forEach((step, index) => {
      if (index < 3) {
        expect(step.classes()).toContain('step--active');
      } else {
        expect(step.classes()).not.toContain('step--active');
      }
    });
  });

  test('renders no active steps if progress is 0', () => {
    const wrapper = mount(Steps, {
      props: {
        count: 4,
        progress: 0,
      },
    });

    const activeSteps = wrapper.findAll('.step--active');

    expect(activeSteps).toHaveLength(0);
  });

  test('renders all steps as active if progress equals count', () => {
    const wrapper = mount(Steps, {
      props: {
        count: 4,
        progress: 4,
      },
    });

    const activeSteps = wrapper.findAll('.step--active');

    expect(activeSteps).toHaveLength(4);
  });
});
