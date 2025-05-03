import { InjectionKey, Ref } from 'vue';

export interface InlineButtonsInjection {
  mode?: 'plain' | 'bezeled' | 'gray';
}

export const inlineButtonsInjectionKey = Symbol() as InjectionKey<
  Ref<InlineButtonsInjection>
>;
