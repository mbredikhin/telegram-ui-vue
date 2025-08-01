import { useEnsuredControl } from '@/composables/useEnsuredControl';
import { range } from '@/lib/array';
import {
  computed,
  watch,
  ComputedRef,
  MaybeRef,
  toValue,
  UnwrapRef,
} from 'vue';

export enum PaginationType {
  Page = 'page',
  Next = 'next',
  Previous = 'previous',
  StartEllipsis = 'start-ellipsis',
  EndEllipsis = 'end-ellipsis',
}

export type OnChange = (event: Event, page: number) => void;

export interface UsePaginationConfig {
  /** Number of always visible pages at the beginning and end. */
  boundaryCount: MaybeRef<number>;
  /** The total number of pages. */
  count: MaybeRef<number>;
  /** The page selected by default when the component is uncontrolled */
  defaultPage: MaybeRef<number>;
  /** If `true`, hide the next-page button. */
  hideNextButton: MaybeRef<boolean>;
  /** If `true`, hide the previous-page button. */
  hidePrevButton: MaybeRef<boolean>;
  /** The current page. */
  page: MaybeRef<number>;
  /** Number of always visible pages before and after the current page. */
  siblingCount: MaybeRef<number>;
  /** Controls whether the Pagination component is interactive. */
  disabled: MaybeRef<boolean>;
  /** Callback to be fired when value changed. */
  onChange: OnChange;
}

export interface UsePaginationResult {
  paginationItems: ComputedRef<UsePaginationItem[]>;
}

export interface UsePaginationItem {
  type: PaginationType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
  'aria-current'?: 'true' | 'false';
  onClick: (event: Event) => void;
}

export function usePagination(
  props: Partial<UsePaginationConfig>
): UsePaginationResult {
  const config = computed<UnwrapRef<Omit<UsePaginationConfig, 'onChange'>>>(
    () => ({
      boundaryCount: toValue(props.boundaryCount) ?? 1,
      count: toValue(props.count) ?? 1,
      defaultPage: toValue(props.defaultPage) ?? 1,
      hideNextButton: toValue(props.hideNextButton) ?? false,
      hidePrevButton: toValue(props.hidePrevButton) ?? false,
      page: toValue(props.page) ?? 0,
      siblingCount: toValue(props.siblingCount) ?? 1,
      disabled: toValue(props.disabled) ?? false,
    })
  );

  const [page, setPage] = useEnsuredControl({
    value: computed(() =>
      config.value.page ? config.value.page : undefined
    ) as ComputedRef<number>,
    defaultValue: config.value.defaultPage,
  });

  const startPages = computed(() =>
    range(1, Math.min(config.value.boundaryCount, config.value.count))
  );

  const endPages = computed(() =>
    range(
      Math.max(
        config.value.count - config.value.boundaryCount + 1,
        config.value.boundaryCount + 1
      ),
      config.value.count
    )
  );

  const siblingsStart = computed(() =>
    Math.max(
      Math.min(
        // Natural start
        page.value - config.value.siblingCount,
        // Lower boundary when page is high
        config.value.count -
          config.value.boundaryCount -
          config.value.siblingCount * 2 -
          1
      ),
      // Greater than startPages
      config.value.boundaryCount + 2
    )
  );

  const siblingsEnd = computed(() =>
    Math.min(
      Math.max(
        // Natural end
        page.value + config.value.siblingCount,
        // Upper boundary when page is low
        config.value.boundaryCount + config.value.siblingCount * 2 + 2
      ),
      // Less than endPages
      endPages.value.length > 0 ? endPages.value[0] - 2 : config.value.count - 1
    )
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = computed<(PaginationType | number)[]>(() => [
    ...(config.value.hidePrevButton ? [] : [PaginationType.Previous]),
    ...startPages.value,

    // Start ellipsis

    ...(siblingsStart.value > config.value.boundaryCount + 2
      ? [PaginationType.StartEllipsis]
      : config.value.boundaryCount + 1 <
          config.value.count - config.value.boundaryCount
        ? [config.value.boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart.value, siblingsEnd.value),

    // End ellipsis

    ...(siblingsEnd.value < config.value.count - config.value.boundaryCount - 1
      ? [PaginationType.EndEllipsis]
      : config.value.count - config.value.boundaryCount >
          config.value.boundaryCount
        ? [config.value.count - config.value.boundaryCount]
        : []),

    ...endPages.value,
    ...(config.value.hideNextButton ? [] : [PaginationType.Next]),
  ]);

  const handleClick: OnChange = (event, value) => {
    setPage(value);
    props.onChange?.(event, value);
  };

  watch(
    () => config.value.page,
    (page) => {
      if (page) {
        setPage(page);
      }
    }
  );

  // Map the button type to its page number
  function buttonToPage(type: UsePaginationItem['type']) {
    switch (type) {
      case 'previous':
        return page.value - 1;
      case 'next':
        return page.value + 1;
      default:
        return null;
    }
  }

  const paginationItems = computed(() =>
    itemList.value.map<UsePaginationItem>((typeOrPageNumber) => {
      if (typeof typeOrPageNumber === 'number') {
        return {
          type: PaginationType.Page,
          page: typeOrPageNumber,
          selected: typeOrPageNumber === page.value,
          disabled: config.value.disabled,
          'aria-current': typeOrPageNumber === page.value ? 'true' : undefined,
          onClick: (event) => handleClick(event, typeOrPageNumber),
        };
      }

      return {
        type: typeOrPageNumber,
        page: buttonToPage(typeOrPageNumber),
        selected: false,
        disabled:
          config.value.disabled ||
          (![PaginationType.StartEllipsis, PaginationType.EndEllipsis].includes(
            typeOrPageNumber
          ) &&
            (typeOrPageNumber === PaginationType.Next
              ? page.value >= config.value.count
              : page.value <= 1)),
        onClick: (event) =>
          handleClick(event, buttonToPage(typeOrPageNumber) || 0),
      };
    })
  );

  return { paginationItems };
}
