import type { Meta, StoryObj } from '@storybook/vue3';
import { Section, Blockquote } from '@/components';
import Accordion from './Accordion.vue';
import AccordionSummary from './accordionSummary/AccordionSummary.vue';
import AccordionContent from './accordionContent/AccordionContent.vue';
import { ref, watch } from 'vue';

const meta = {
  title: 'Blocks/Accordion/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    id: {
      type: 'string',
      description:
        'Optional ID for the accordion element, enhancing accessibility (a11y) by associating the accordion summary and content. If not provided, a unique ID will be generated automatically. This ID is crucial for screen readers and other assistive technologies to understand the relationship between the accordion header and content.',
    },
    expanded: {
      type: 'boolean',
      description:
        'Determines whether the accordion is currently expanded or collapsed.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    expanded: false,
  },
  render: (args) => ({
    components: {
      Accordion,
      AccordionSummary,
      AccordionContent,
      Blockquote,
      Section,
    },
    setup() {
      const expanded = ref(args.expanded);

      watch(
        () => args.expanded,
        (value) => {
          expanded.value = value;
        }
      );

      return { args, expanded };
    },
    template: `
    <Section style="background: var(--tgui-secondary-bg-color); padding: 20px; width: 500px">
      <Accordion v-bind="args" :expanded="expanded" @change="expanded = !expanded">
        <AccordionSummary>History of accordion</AccordionSummary>
        <AccordionContent>
          <div style="padding: 10px 20px 20px">
            <Blockquote>
              The accordion&apos;s basic form is believed to have been invented in Berlin, in 1822,
              by Christian Friedrich Ludwig Buschmann, although one instrument was discovered in 2006
              that appears to have been built earlier. The earliest history of the accordion in Russia is poorly documented.
            </Blockquote>
          </div>
        </AccordionContent>
      </Accordion>
    </Section>`,
  }),
};
