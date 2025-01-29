import { setup, Preview } from '@storybook/vue3';
import { AppRoot } from '../src/components/service';

setup((app) => {
  app.component('AppRoot', AppRoot);
});

const decorators = [
  (story) => ({
    components: { story, AppRoot },
    template: '<AppRoot><story /></AppRoot>',
  }),
];

const preview: Preview = {
  decorators,
};

export default preview;
