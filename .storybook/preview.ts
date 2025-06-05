import { setup, Preview } from '@storybook/vue3';
import { AppRoot } from '../src/components/service';
import './global.css';
import { computed } from 'vue';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

setup((app) => {
  app.component('AppRoot', AppRoot);
});

const decorators = [
  (story, context) => {
    return {
      components: { story, AppRoot },
      setup() {
        const appearance = context.globals.theme || 'light';
        const classes = computed(() => [
          'appearance-decorator',
          `appearance-decorator--${appearance}`,
        ]);

        return { appearance, classes };
      },
      template: `
      <div :class="classes">
        <AppRoot :appearance="appearance">
          <story />
        </AppRoot>
      </div>
      `,
    };
  },
];

const preview: Preview = {
  decorators,
};

export default preview;
