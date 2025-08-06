import Avatar from '../Avatar.vue';
import { mount, randomString } from '@/lib/tests';

describe('Avatar', () => {
  test('displays acronym as fallback', () => {
    const acronym = randomString(2);
    const wrapper = mount(Avatar, {
      props: {
        src: '',
        acronym,
      },
    });

    const fallback = wrapper.find('.fallback > .typography');

    expect(fallback.text()).toBe(acronym);
  });

  test('renders fallback-icon slot when acronym is not provided', () => {
    const wrapper = mount(Avatar, {
      props: { src: '' },
      slots: {
        'fallback-icon': '<div class="fallback-icon-slot">Icon</div>',
      },
    });

    expect(wrapper.find('.fallback-icon-slot').exists()).toBe(true);
  });

  test('renders default slot content', () => {
    const wrapper = mount(Avatar, {
      props: { src: '' },
      slots: {
        default: '<div class="default-slot-content">Avatar Content</div>',
      },
    });

    expect(wrapper.find('.default-slot-content').exists()).toBe(true);
  });

  test('applies avatar class and conditional class with acronym', () => {
    const acronym = randomString(2);
    const wrapper = mount(Avatar, {
      props: {
        src: '',
        acronym,
      },
    });

    const image = wrapper.findComponent({ name: 'Image' });

    expect(image.classes()).toContain('avatar');
    expect(image.classes()).toContain('avatar--with-acronym');
  });

  test('does not apply avatar--with-acronym class without acronym', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: '',
      },
    });

    const image = wrapper.findComponent({ name: 'Image' });

    expect(image.classes()).toContain('avatar');
    expect(image.classes()).not.toContain('avatar--with-acronym');
  });
});
