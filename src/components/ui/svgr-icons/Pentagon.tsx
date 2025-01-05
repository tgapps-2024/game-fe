import { SVGProps } from "react";

export const Pentagon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-5 -5 122 54"
    fill="none"
    overflow="visible"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g clipPath="url(#a)">
      <g filter="url(#b)">
        <path
          fill="#009F00"
          d="M0 8a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v18.71a8 8 0 0 1-6.813 7.912l-48 7.2a8 8 0 0 1-2.374 0l-48-7.2A8 8 0 0 1 0 26.71V8Z"
        />
      </g>
      <g filter="url(#c)">
        <path
          fill="#02DB07"
          d="M0 8a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v16.45a8 8 0 0 1-6.772 7.906l-48 7.453a8 8 0 0 1-2.456 0l-48-7.453A8 8 0 0 1 0 24.451V8Z"
        />
      </g>
      <path fill="#0F0" d="M0 0h112v4H0z" opacity={0.6} />
      <path
        stroke="#000"
        d="M.5 8A7.5 7.5 0 0 1 8 .5h96a7.5 7.5 0 0 1 7.5 7.5v20.359a7.5 7.5 0 0 1-6.336 7.409l-48 7.543a7.502 7.502 0 0 1-2.328 0l-48-7.543A7.5 7.5 0 0 1 .5 28.359V8Z"
      />
    </g>
    <defs>
      <filter
        id="b"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3407_5430"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3407_5430"
          result="shape"
        />
      </filter>
      <clipPath id="a">
        <rect width={112} height={44} fill="#fff" rx={8} />
      </clipPath>
    </defs>
  </svg>
);
