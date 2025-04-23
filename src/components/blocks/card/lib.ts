import { InjectionKey, Ref } from 'vue';

export interface CardInjection {
  type: 'plain' | 'ambient';
}

export const cardInjectionKey = Symbol() as InjectionKey<Ref<CardInjection>>;
