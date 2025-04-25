import type { Meta, StoryObj } from '@storybook/vue3';
import AccordionContent from './AccordionContent.vue';
import { Subheadline, Section } from '@/components';
import Accordion from '../Accordion.vue';
import AccordionSummary from '../accordionSummary/AccordionSummary.vue';

const meta = {
  title: 'Blocks/Accordion/AccordionContent',
  component: AccordionContent,
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionContent>;

export default meta;

type Story = StoryObj<typeof AccordionContent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      Accordion,
      AccordionContent,
      AccordionSummary,
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
            This is AccordionContent component, it is just body of Accordion.
          </Subheadline>
        </AccordionContent>
      </Accordion>
    </Section>`,
  }),
};
