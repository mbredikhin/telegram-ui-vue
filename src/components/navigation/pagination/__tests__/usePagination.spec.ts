import { usePagination, PaginationType } from '../lib';
import { nextTick, ref } from 'vue';

function getPages(
  paginationItems: ReturnType<typeof usePagination>['paginationItems']
) {
  return paginationItems.value.map((item) =>
    item.type === PaginationType.Page ? item.page : item.type
  );
}

describe('usePagination', () => {
  test('defaults to 1 page with page 1 selected', () => {
    const { paginationItems } = usePagination({});
    const items = paginationItems.value;

    expect(items.length).toBe(3);
    expect(items[1]).toMatchObject({
      type: PaginationType.Page,
      page: 1,
      selected: true,
      'aria-current': 'true',
    });
  });

  test('shows ellipses correctly for longer ranges', () => {
    const { paginationItems } = usePagination({
      count: 10,
      page: 5,
      siblingCount: 1,
      boundaryCount: 1,
    });

    const result = getPages(paginationItems);
    expect(result).toEqual([
      PaginationType.Previous,
      1,
      PaginationType.StartEllipsis,
      4,
      5,
      6,
      PaginationType.EndEllipsis,
      10,
      PaginationType.Next,
    ]);
  });

  test('respects boundaryCount and siblingCount', () => {
    const { paginationItems } = usePagination({
      count: 20,
      page: 10,
      siblingCount: 2,
      boundaryCount: 2,
    });

    const result = getPages(paginationItems);
    expect(result).toContain(PaginationType.StartEllipsis);
    expect(result).toContain(PaginationType.EndEllipsis);
    expect(result).toContain(10);
  });

  test('hides previous and next buttons', () => {
    const { paginationItems } = usePagination({
      count: 5,
      hidePrevButton: true,
      hideNextButton: true,
    });

    const result = getPages(paginationItems);
    expect(result).not.toContain(PaginationType.Previous);
    expect(result).not.toContain(PaginationType.Next);
  });

  test('calls onChange on click', () => {
    const onChange = vi.fn();
    const { paginationItems } = usePagination({
      count: 5,
      onChange,
    });

    const page3 = paginationItems.value.find(({ page }) => page === 3);
    page3?.onClick(new MouseEvent('click'));

    expect(onChange).toHaveBeenCalledWith(expect.any(MouseEvent), 3);
  });

  test('disables next on last page', () => {
    const { paginationItems } = usePagination({
      count: 3,
      page: 3,
    });

    const next = paginationItems.value.find(
      ({ type }) => type === PaginationType.Next
    );
    expect(next?.disabled).toBe(true);
  });

  test('disables previous on first page', () => {
    const { paginationItems } = usePagination({
      count: 3,
      page: 1,
    });

    const prev = paginationItems.value.find(
      ({ type }) => type === PaginationType.Previous
    );
    expect(prev?.disabled).toBe(true);
  });

  test('reacts to controlled value change', async () => {
    const page = ref(1);
    const { paginationItems } = usePagination({
      count: 5,
      page,
    });

    expect(
      paginationItems.value.some(({ page, selected }) => page === 1 && selected)
    ).toBe(true);

    page.value = 3;
    await nextTick();

    expect(
      paginationItems.value.some(({ page, selected }) => page === 3 && selected)
    ).toBe(true);
  });

  test('fallbacks to defaultPage if page is undefined', () => {
    const { paginationItems } = usePagination({
      count: 3,
      defaultPage: 2,
    });

    const selected = paginationItems.value.find(({ selected }) => selected);
    expect(selected?.page).toBe(2);
  });
});
