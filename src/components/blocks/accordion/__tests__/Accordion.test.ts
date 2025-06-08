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
});
