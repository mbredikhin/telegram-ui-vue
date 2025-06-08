<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <defs>
      <clipPath id="a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
    <g clip-path="url(#a)" fill="currentColor">
      <path
        d="M5.682 26.252a1.5 1.5 0 0 1 0-2.121l5.078-5.079a1.5 1.5 0 0 1 2.122 2.122l-5.079 5.078a1.5 1.5 0 0 1-2.121 0"
        opacity=".837"
      />
      <path
        d="M16.045 21.09a1.5 1.5 0 0 1 1.5 1.5v6.455a1.5 1.5 0 0 1-3 0V22.59a1.5 1.5 0 0 1 1.5-1.5"
        opacity=".467"
      />
    </g>
    <animate
      attributeName="opacity"
      values="0.837;0;1;0.8366;0;0"
      dur="0.8s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.75;0.87;1;1;1"
      keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
      additive="replace"
      fill="freeze"
    />
    <animate
      attributeName="opacity"
      values="0.467;0;1;0.4669;0;0"
      dur="0.8s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.63;0.75;1;1;1"
      keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
      additive="replace"
      fill="freeze"
    />
  </svg>
</template>
