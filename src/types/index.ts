import { HTMLProps } from 'react';

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
