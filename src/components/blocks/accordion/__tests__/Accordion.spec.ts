import Accordion from '../Accordion.vue';
import { mount, randomString } from '@/helpers/tests';
import AccordionSummary from '../accordionSummary/AccordionSummary.vue';
import AccordionContent from '../accordionContent/AccordionContent.vue';

describe('Accordion', () => {
  test('displays content and summary', async () => {
    const summaryText = randomString();
    const contentText = randomString();

    const wrapper = mount(Accordion, {
      props: {
        expanded: true,
      },
      slots: {
        default: `
          <AccordionSummary>${summaryText}</AccordionSummary>
          <AccordionContent>${contentText}</AccordionContent>`,
      },
      global: {
        components: { AccordionSummary, AccordionContent },
      },
    });
    const summary = wrapper.find('.cell .title');
    const content = wrapper.find('.accordion-content .body');

    expect((content.element as HTMLElement).style.maxHeight).toBe('inherit');
    expect(summary.text()).toBe(summaryText);
    expect(content.text()).toBe(contentText);
  });

  test('content is hidden if the accordion is not expanded', async () => {
    const summaryText = randomString();
    const contentText = randomString();

    const wrapper = mount(Accordion, {
      props: {
        expanded: false,
      },
      slots: {
        default: `
          <AccordionSummary>${summaryText}</AccordionSummary>
          <AccordionContent>${contentText}</AccordionContent>`,
      },
      global: {
        components: { AccordionSummary, AccordionContent },
      },
    });
    const content = wrapper.find('.accordion-content .body');

    expect((content.element as HTMLElement).style.maxHeight).toBe('0px');
  });

  test('provides expanded state and emits change on toggle', async () => {
    const wrapper = mount(Accordion, {
      props: {
        expanded: false,
      },
      slots: {
        default: `
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionContent>Content</AccordionContent>
        `,
      },
      global: {
        components: { AccordionSummary, AccordionContent },
      },
    });

    const summary = wrapper.findComponent(AccordionSummary);
    await summary.trigger('click');

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')![0]).toEqual([true]);
  });

  test('generates IDs if not provided', () => {
    const wrapper = mount(Accordion, {
      props: { expanded: true },
      slots: {
        default: `
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionContent>Content</AccordionContent>
        `,
      },
      global: {
        components: { AccordionSummary, AccordionContent },
      },
    });

    const summary = wrapper.find('[aria-expanded]');
    const content = wrapper.find('[role="region"]');

    expect(summary.attributes('aria-controls')).toBe(content.attributes('id'));
    expect(content.attributes('aria-labelledby')).toBe(
      summary.attributes('id')
    );
  });
});
