/** @jsx h */

import { type Children, h, render, tw } from "../deps.ts";

export interface ButtonOptions {
  href?: string;
  target?: string;
  children: Children;
  class?: string;
  style?: string;
}

function Button(
  { class: className, href, target, children, style }: ButtonOptions,
) {
  const css = tw`!text-white font-bold
   text-sm px-4 py-3 rounded shadow hover:shadow-md outline-none
   focus:outline-none mr-1 mb-1 ease-linear transition duration-150
   inline-flex items-center`;

  const content = Array.isArray(children)
    ? children.map((child) => render(child))
    : render(children);

  return (
    <a
      target={target}
      href={href}
      class={`${css} ${className}`}
      style={style}
    >
      {content}
    </a>
  );
}

export function SecondaryButton(
  { class: className, ...options }: ButtonOptions,
) {
  return Button({
    class: `${tw`bg-indigo-500 active:bg-indigo-600`} ${className}`,
    ...options,
  });
}

export function PrimaryButton({ class: className, ...options }: ButtonOptions) {
  return Button({
    class: `${tw`bg-purple-500 active:bg-purple-600`} ${className}`,
    ...options,
  });
}
