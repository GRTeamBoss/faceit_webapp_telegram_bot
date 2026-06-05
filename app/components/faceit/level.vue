<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="level-svg"
  >
    <title>Skill level 3</title>
    <defs>
      <radialGradient id="bar-bg-gradient" cx="0.5" cy="0.5" r="0.55">
        <stop offset="0.4" stop-color="#5D5D5D"></stop>
        <stop offset="1" stop-color="#242424"></stop>
      </radialGradient>
      <linearGradient id="fill-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop
          class="startStop"
          offset="0.5"
          stop-color="var(--fill-start,#F1F1F1)"
        ></stop>
        <stop
          class="endStop"
          offset="1"
          stop-color="var(--fill-end,#383838)"
        ></stop>
      </linearGradient>
      <radialGradient id="fill-calibration" cx="0" cy="0.9" r="2">
        <stop offset="0.0865385" stop-color="#2A2A2A"></stop>
        <stop offset="0.384615" stop-color="#4A4A4A"></stop>
        <stop offset="0.711538" stop-color="#8D8D8D"></stop>
        <stop offset="1" stop-color="#A6A6A6"></stop>
      </radialGradient>
    </defs>
    <circle
      class="background"
      r="50%"
      cx="50%"
      cy="50%"
      fill="#060606"
    ></circle>
    <path
      class="bar-bg-gradient"
      d=" M 6.5, 18.4 A 8.4, 8.4 0 1 1 17.5, 18.4 "
      stroke="url(#bar-bg-gradient)"
      stroke-width="2.4"
    ></path>
    <path
      class="progress"
      d=" M 6.5, 18.4 A 8.4, 8.4 0 1 1 17.5, 18.4 "
      stroke="url(#fill-gradient)"
      stroke-width="2.4"
      pathLength="10"
    ></path>
    <path
      class="calibration"
      d=" M 6.5, 18.4 A 8.4, 8.4 0 1 1 17.5, 18.4 "
      stroke="url(#fill-calibration)"
      stroke-width="2.4"
    ></path>
    <text class="level-number n1" id="n1" x="50%" y="49%" fill="white">1</text>
    <text class="level-number n2" id="n2" x="51%" y="49%" fill="lightgreen">
      2
    </text>
    <text class="level-number n3" id="n3" x="51%" y="49%" fill="green">3</text>
    <text class="level-number n4" id="n4" x="50%" y="49%" fill="yellow">4</text>
    <text class="level-number n5" id="n5" x="51%" y="49%" fill="orange">5</text>
    <text class="level-number n6" id="n6" x="50%" y="49%" fill="darkyellow">
      6
    </text>
    <text class="level-number n7" id="n7" x="51%" y="49%" fill="darkorange">
      7
    </text>
    <text class="level-number n8" id="n8" x="51%" y="49%" fill="lightred">
      8
    </text>
    <text class="level-number n9" id="n9" x="51%" y="49%" fill="red">9</text>
    <text class="level-number n10" id="n10" x="49%" y="49%" fill="darkred">
      10
    </text>
    <text class="level-number nq" id="nq" x="51%" y="49%" fill="brightred">
      ?
    </text>
  </svg>
</template>

<style scoped>
text.level-number {
  user-select: none;
  cursor: default;
  font-size: 8px;
  font-family: sans-serif;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;
  opacity: 0;
  transition: opacity 500ms;
}
.progress {
  /* 10.1 here is used to fix an issue where at larger sizes a slight gap at the end of the bar is visible at level 10: */
  stroke-dasharray: 10.1, 10000;
  stroke-dashoffset: calc(10px - 0.99px);
}
.calibration {
  opacity: 0;
  transition: opacity 500ms;
}
.level-svg {
  display: inline-block;
  width: 24px;
  height: 24px;
}
</style>
