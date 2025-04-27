import { Cell, List, Section } from '@/components/blocks';
import FileInput from './FileInput.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta = {
  title: 'Form/FileInput',
  component: FileInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>;

export default meta;

type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  render: (args) => ({
    components: { FileInput, List, Section, Cell },
    setup() {
      const files = ref<FileList | null>(null);

      return { args, files };
    },
    template: `
    <List>
      <Section>
        <template #header>Component includes only logic of input and label</template>
        <template #footer>
          Listen to the @change event to get the selected files. You can pass children to display the selected files.
        </template>
        <FileInput multiple v-bind="args" @change="files = $event.target.files">
          <Cell 
            v-if="files"
            v-for="file of Array.from(files)" 
            :key="file.name" 
          >
            <template #subtitle>{{ file.size }} bytes</template>
            {{ file.name }}
          </Cell>
        </FileInput>
      </Section>
    </List>`,
  }),
};
