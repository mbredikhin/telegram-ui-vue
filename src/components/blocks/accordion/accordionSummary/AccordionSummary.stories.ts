import type { Meta, StoryObj } from '@storybook/vue3';
import { Subheadline, Section } from '@/components';
import Accordion from '../Accordion.vue';
import AccordionSummary from './AccordionSummary.vue';
import AccordionContent from '../accordionContent/AccordionContent.vue';

const meta = {
  title: 'Blocks/Accordion/AccordionSummary',
  component: AccordionSummary,
  tags: ['autodocs'],
  argTypes: {
    is: {
      type: 'string',
      description:
        'Custom component or HTML tag to be used as the root element of the cell, div by default',
    },
    hovered: {
      type: 'boolean',
      description:
        'Controls the hover state of the component externally, useful for keyboard navigation',
    },
    multiline: {
      type: 'boolean',
      description: 'Allows for multiline content without truncation',
    },
    interactiveAnimation: {
      control: 'select',
      options: ['opacity', 'background'],
    },
  },
} satisfies Meta<typeof AccordionSummary>;

export default meta;

type Story = StoryObj<typeof AccordionSummary>;

export const Default: Story = {
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
        <AccordionSummary v-bind="args">Accordion summary</AccordionSummary>
        <AccordionContent>
          <Subheadline style="padding: 12px 24px 24px" level="2">
            AccordionSummary is Cell component, you can pass all the same props from Cell to it.
          </Subheadline>
        </AccordionContent>
      </Accordion>
    </Section>`,
  }),
};
