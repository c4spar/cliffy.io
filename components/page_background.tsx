/** @jsx h */

import { Fragment, h, styles, tw } from "../deps.ts";

export function PageBackground() {
  return (
    <Fragment>
      <svg
        height="240"
        width="680"
        class={tw`absolute top-0 right-0 ${styles.transform.primary}
          fill-current text(blue-100 dark:black) opacity(40 dark:10)`}
      >
        <polygon points="0,0 680,0 680,240" />
      </svg>
      <svg
        height="1300"
        width="450"
        class={tw`absolute top-0 left-0 ${styles.transform.primary}
          fill-current text(blue-100 dark:black) opacity(40 dark:10)`}
      >
        <polygon points="0,0 450,0 0,1300" />
      </svg>
    </Fragment>
  );
}
