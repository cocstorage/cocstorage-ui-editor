import type { HTMLProps } from 'react';

import type { CustomStyle } from 'cocstorage-ui';

export type EditorContent = {
  key: string;
  tag: string;
  children: {
    key: string;
    tag: string;
    content: string | null;
    attributes: Partial<Record<keyof HTMLProps<HTMLElement>, string>>;
  }[];
};

export type GenericComponentProps<T> = T & {
  customStyle?: CustomStyle;
};
