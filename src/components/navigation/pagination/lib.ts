import { useEnsuredControl } from '@/composables/useEnsuredControl';
import { range } from '@/helpers/array';
import { computed, watch, ComputedRef, Ref } from 'vue';

export enum PaginationType {
  Page = 'page',
  Next = 'next',
  Previous = 'previous',
  StartEllipsis = 'start-ellipsis',
  EndEllipsis = 'end-ellipsis',
}

export interface UsePaginationProps {
  /** Number of always visible pages at the beginning and end. */
  boundaryCount?: number;
  /** The total number of pages. */
  count?: number;
  /** The page selected by default when the component is uncontrolled */
  defaultPage?: number;
  /** If `true`, hide the next-page button. */
  hideNextButton?: boolean;
  /** If `true`, hide the previous-page button. */
  hidePrevButton?: boolean;
  /** The current page. */
  page?: number;
  /** Number of always visible pages before and after the current page. */
  siblingCount?: number;
}

export type OnChange = (event: Event, page: number) => void;

interface PaginationParams extends Required<Omit<UsePaginationProps, 'page'>> {
  page?: number | undefined;
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

export const usePagination = (
  props: Ref<UsePaginationProps>,
  onChange?: OnChange
): UsePaginationResult => {
  const params = computed<PaginationParams>(() => ({
    boundaryCount: props.value.boundaryCount ?? 1,
    count: props.value.count ?? 1,
    defaultPage: props.value.defaultPage ?? 1,
    hideNextButton: props.value.hideNextButton ?? false,
    hidePrevButton: props.value.hidePrevButton ?? false,
    page: props.value.page,
    siblingCount: props.value.siblingCount ?? 1,
  }));

  const [page, setPage] = useEnsuredControl({
    value: params.value.page,
    defaultValue: params.value.defaultPage,
  });

  const startPages = computed(() =>
    range(1, Math.min(params.value.boundaryCount, params.value.count))
  );

  const endPages = computed(() =>
    range(
      Math.max(params.value.count - params.value.boundaryCount + 1, params.value.boundaryCount + 1),
      params.value.count
    )
  );

  const siblingsStart = computed(() =>
    Math.max(
      Math.min(
        // Natural start
        page.value - params.value.siblingCount,
        // Lower boundary when page is high
        params.value.count - params.value.boundaryCount - params.value.siblingCount * 2 - 1
      ),
      // Greater than startPages
      params.value.boundaryCount + 2
    )
  );

  const siblingsEnd = computed(() =>
    Math.min(
      Math.max(
        // Natural end
        page.value + params.value.siblingCount,
        // Upper boundary when page is low
        params.value.boundaryCount + params.value.siblingCount * 2 + 2
      ),
      // Less than endPages
      endPages.value.length > 0 ? endPages.value[0] - 2 : params.value.count - 1
    )
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = computed<(PaginationType | number)[]>(() => [
    ...(params.value.hidePrevButton ? [] : [PaginationType.Previous]),
    ...startPages.value,

    // Start ellipsis

    ...(siblingsStart.value > params.value.boundaryCount + 2
      ? [PaginationType.StartEllipsis]
      : params.value.boundaryCount + 1 < params.value.count - params.value.boundaryCount
        ? [params.value.boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart.value, siblingsEnd.value),

    // End ellipsis

    ...(siblingsEnd.value < params.value.count - params.value.boundaryCount - 1
      ? [PaginationType.EndEllipsis]
      : params.value.count - params.value.boundaryCount > params.value.boundaryCount
        ? [params.value.count - params.value.boundaryCount]
        : []),

    ...endPages.value,
    ...(params.value.hideNextButton ? [] : [PaginationType.Next]),
  ]);

  const handleClick: OnChange = (event, value) => {
    setPage(value);
    if (onChange) {
      onChange(event, value);
    }
  };

  watch(
    () => params.value.page,
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
          disabled: false,
          'aria-current': typeOrPageNumber === page.value ? 'true' : undefined,
          onClick: (event) => handleClick(event, typeOrPageNumber),
        };
      }

      return {
        type: typeOrPageNumber,
        page: buttonToPage(typeOrPageNumber),
        selected: false,
        disabled:
          ![PaginationType.StartEllipsis, PaginationType.EndEllipsis].includes(typeOrPageNumber) &&
          (typeOrPageNumber === PaginationType.Next
            ? page.value >= params.value.count
            : page.value <= 1),
        onClick: (event) => handleClick(event, buttonToPage(typeOrPageNumber) || 0),
      };
    })
  );

  return { paginationItems };
};
