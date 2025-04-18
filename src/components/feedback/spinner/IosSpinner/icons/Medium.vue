<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <defs>
      <clipPath id="clipPath1">
        <path d="M0,0h32v0v32v0h-32v0v-32z" fill="white" clip-rule="nonzero" />
      </clipPath>
    </defs>
    <g clip-path="url(#clipPath1)">
      <!-- Each element group goes here -->
      <!-- I'm using clean IDs like id="g1", "g2" etc. -->
      <g
        id="g1"
        transform="matrix(-0.7071,-0.7071,0.7071,-0.7071,6.7429,27.3137)"
        opacity="0.837"
      >
        <path
          d="M1.5,0c0.8284,0 1.5,0.6716 1.5,1.5v7.1818c0,0.8284 -0.6716,1.5 -1.5,1.5s-1.5,-0.6716 -1.5,-1.5v-7.1818c0,-0.8284 0.6716,-1.5 1.5,-1.5z"
          fill="currentColor"
        />
      </g>
      <g id="g2" transform="matrix(1,0,0,1,14.5454,21.0909)" opacity="0.467">
        <path
          d="M1.5,0c0.8284,0 1.5,0.6716 1.5,1.5v6.4545c0,0.8284 -0.6716,1.5 -1.5,1.5s-1.5,-0.6716 -1.5,-1.5v-6.4545c0,-0.8284 0.6716,-1.5 1.5,-1.5z"
          fill="currentColor"
        />
      </g>
      <!-- Add the rest of your path groups here and ensure unique IDs -->
    </g>

    <!-- Animation: Reference the cleaned IDs like #g1, #g2, etc. -->
    <animate
      href="#g1"
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
      href="#g2"
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
