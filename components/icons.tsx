/** @jsx h */

import { h, tw } from "../deps.ts";

export interface ArrowForwardOptions {
  size?: string;
  class?: string;
}

export function ArrowForward(
  { size = "1.5rem", class: className = "" }: ArrowForwardOptions,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`${className} ${tw`ml-2`}`}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
}
