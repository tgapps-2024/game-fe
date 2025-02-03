import React from 'react';

export const RareRibbon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={110}
    height={24}
    fill="none"
    viewBox="0 0 110 24"
  >
    <g clipPath="url(#rare-ribbon-a)">
      <g filter="url(#rare-ribbon-b)">
        <path
          fill="#883308"
          d="M103.854 14.628 110 6.257H97.506V3.05l-7.009-.438a570.563 570.563 0 0 0-71.066.004l-6.937.434v3.206H0l6.146 8.37L0 23h21.165v-3.792a570.632 570.632 0 0 1 67.67 0V23H110l-6.146-8.371Z"
        />
      </g>
      <path
        fill="url(#rare-ribbon-c)"
        d="M21.165 21.492H0l6.146-8.371L0 4.75h21.165v16.742Z"
      />
      <path
        fill="url(#rare-ribbon-d)"
        d="M88.835 21.492H110l-6.146-8.371L110 4.75H88.835v16.742Z"
      />
      <path
        fill="url(#rare-ribbon-e)"
        d="m12.494 1.543 6.937-.434a570.564 570.564 0 0 1 71.066-.003l7.01.437v16.694l-7.01-.437a570.56 570.56 0 0 0-71.066.004l-6.937.433V1.543Z"
      />
      <path
        fill="#883308"
        d="M21.165 17.695v3.793l-8.67-3.254c.067-.003.136-.007.206-.013l6.73-.42 1.734-.106ZM97.506 18.241l-8.671 3.254v-3.792l1.662.101 6.805.424c.068.006.136.01.204.013Z"
      />
    </g>
    <defs>
      <linearGradient
        id="rare-ribbon-c"
        x1={0}
        x2={21.165}
        y1={13.121}
        y2={13.121}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE60" />
        <stop offset={1} stopColor="#FABF33" />
      </linearGradient>
      <linearGradient
        id="rare-ribbon-d"
        x1={110}
        x2={88.835}
        y1={13.121}
        y2={13.121}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE60" />
        <stop offset={1} stopColor="#FABF33" />
      </linearGradient>
      <linearGradient
        id="rare-ribbon-e"
        x1={12.494}
        x2={97.507}
        y1={9.119}
        y2={9.119}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE60" />
        <stop offset={1} stopColor="#FABF33" />
      </linearGradient>
      <clipPath id="rare-ribbon-a">
        <path fill="#fff" d="M0 0h110v24H0z" />
      </clipPath>
      <filter
        id="rare-ribbon-b"
        width={110}
        height={22.492}
        x={0}
        y={1.508}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6661_5855"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_6661_5855"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);