import type { HTMLProps } from 'react';

import type { CustomStyle } from 'cocstorage-ui';

export type EditorContent = {
  tag: string;
  children: {
    tag: string;
    content: string | null;
    attributes: Partial<Record<keyof HTMLProps<HTMLElement>, string>>;
  }[];
};

export type GenericComponentProps<T> = T & {
  customStyle?: CustomStyle;
};
