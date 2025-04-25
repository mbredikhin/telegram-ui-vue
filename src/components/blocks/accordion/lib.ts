import { InjectionKey, Ref } from 'vue';

export interface AccordionInjection {
  labelId: string;
  contentId: string;
  expanded: boolean;
  onChange: (expanded?: boolean) => void;
}

export const accordionInjectionKey = Symbol() as InjectionKey<
  Ref<AccordionInjection>
>;

export function useAccordionId(id?: string) {
  const randomId = Date.now();

  const labelId = id ?? `Accordion${randomId}`;
  const contentId = `AccordionContent${id ?? randomId}`;

  return { labelId, contentId };
}
