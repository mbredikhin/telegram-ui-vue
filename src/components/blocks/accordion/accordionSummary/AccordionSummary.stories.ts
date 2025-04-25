import type { Meta, StoryObj } from '@storybook/vue3';
import { Subheadline, Section } from '@/components';
import Accordion from '../Accordion.vue';
import AccordionSummary from './AccordionSummary.vue';
import AccordionContent from '../accordionContent/AccordionContent.vue';

const meta = {
  title: 'Blocks/Accordion/AccordionSummary',
  component: AccordionSummary,
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionSummary>;

export default meta;

type Story = StoryObj<typeof AccordionSummary>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      Accordion,
      AccordionSummary,
      AccordionContent,
      Subheadline,
      Section,
    },
    setup() {
      return { args };
    },
    template: `
    <Section style="background: var(--tgui-secondary-bg-color); padding: 20px; width: 500px">
      <Accordion expanded @change="console.log">
        <AccordionSummary>Accordion summary</AccordionSummary>
        <AccordionContent v-bind="args">
          <Subheadline style="padding: 12px 24px 24px" level="2">
            AccordionSummary is Cell component, you can pass all the same props from Cell to it.
          </Subheadline>
        </AccordionContent>
      </Accordion>
    </Section>`,
  }),
};
