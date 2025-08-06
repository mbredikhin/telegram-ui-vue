import { mount } from '@/lib/tests';
import CircularProgress from '../CircularProgress.vue';

describe('CircularProgress', () => {
  test('renders an SVG with default props', () => {
    const wrapper = mount(CircularProgress);

    const svg = wrapper.find('svg.circular-progress');

    expect(svg.exists()).toBe(true);
    expect(svg.attributes('width')).toBe('36');
    expect(svg.attributes('height')).toBe('36');

    const circles = wrapper.findAll('circle');

    expect(circles).toHaveLength(2);
  });

  test.each([
    ['small', 28, 3, 10],
    ['medium', 36, 3, 14],
    ['large', 56, 4, 18],
  ] as const)(
    'uses correct attributes for size = %s',
    (size, expectedSize, strokeWidth, radius) => {
      const wrapper = mount(CircularProgress, {
        props: { size },
      });

      const svg = wrapper.find('svg');

      expect(svg.attributes('width')).toBe(String(expectedSize));
      expect(svg.attributes('height')).toBe(String(expectedSize));

      const circles = wrapper.findAll('circle');

      for (const circle of circles) {
        expect(circle.attributes('cx')).toBe(String(expectedSize / 2));
        expect(circle.attributes('cy')).toBe(String(expectedSize / 2));
        expect(circle.attributes('r')).toBe(String(radius));
        expect(circle.attributes('stroke-width')).toBe(String(strokeWidth));
      }
    }
  );

  test.each([
    [0, 1],
    [25, 0.75],
    [50, 0.5],
    [75, 0.25],
    [100, 0],
  ])('progress=%i results in correct dashoffset', (progress, ratio) => {
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    const wrapper = mount(CircularProgress, {
      props: { progress },
    });

    const progressCircle = wrapper.findAll('circle')[1];
    const actual = parseFloat(
      progressCircle.attributes('stroke-dashoffset') ?? ''
    );
    const expected = circumference * ratio;

    expect(actual).toBeCloseTo(expected, 2);
  });
});
