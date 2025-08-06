import { mount, randomString } from '@/lib/tests';
import Placeholder from '../Placeholder.vue';

describe('Placeholder', () => {
  test('renders with default slot content', () => {
    const content = randomString();
    const wrapper = mount(Placeholder, {
      slots: {
        default: `<div class="test-main-content">${content}</div>`,
      },
    });

    const contentElement = wrapper.find('.test-main-content');

    expect(contentElement.exists()).toBe(true);
    expect(contentElement.html()).toContain(content);
  });

  test('renders header slot inside of dt element', () => {
    const headerContent = randomString();
    const wrapper = mount(Placeholder, {
      slots: {
        header: `<span class="test-header-text">${headerContent}</span>`,
      },
    });

    const dt = wrapper.find('dt');

    expect(dt.exists()).toBe(true);
    expect(dt.classes()).toContain('title');
    expect(dt.html()).toContain(headerContent);
  });

  test('renders description slot inside of dd element', () => {
    const descriptionContent = randomString();
    const wrapper = mount(Placeholder, {
      slots: {
        description: `<span class="test-description-text">${descriptionContent}</span>`,
      },
    });

    const dd = wrapper.find('dd');

    expect(dd.exists()).toBe(true);
    expect(dd.classes()).toContain('description');
    expect(dd.html()).toContain(descriptionContent);
  });

  test('renders both header and description inside fields', () => {
    const wrapper = mount(Placeholder, {
      slots: {
        header: '<span>Header</span>',
        description: '<span>Description</span>',
      },
    });

    const dl = wrapper.find('dl.fields');

    expect(dl.exists()).toBe(true);
    expect(dl.find('dt').exists()).toBe(true);
    expect(dl.find('dd').exists()).toBe(true);
  });

  test('renders action slot content', () => {
    const actionText = randomString();
    const wrapper = mount(Placeholder, {
      slots: {
        action: `<button class="test-action-button">${actionText}</button>`,
      },
    });

    const button = wrapper.find('.test-action-button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe(actionText);
  });

  test('does not render fields if both header and description slots are missing', () => {
    const wrapper = mount(Placeholder);

    expect(wrapper.find('dl.fields').exists()).toBe(false);
  });
});
