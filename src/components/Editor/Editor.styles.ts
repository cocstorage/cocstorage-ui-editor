import { Typography } from '@cocstorage/ui';
import styled, { CSSObject } from '@emotion/styled';

import { EditorProps } from '.';

export const StyledEditor = styled.div<Pick<EditorProps, 'fullScreen' | 'hideLine'>>`
  display: flex;
  flex-direction: column;

  ${({
    theme: {
      palette: { box }
    },
    hideLine
  }): CSSObject =>
    !hideLine
      ? {
          border: `1px solid ${box.filled.normal}`
        }
      : {}};

  ${({ fullScreen }): CSSObject =>
    fullScreen
      ? {
          width: '100%',
          height: '100%',
          flex: 1
        }
      : {
          borderRadius: 8
        }}
`;

export const Toolbar = styled.div<Pick<EditorProps, 'hideLine'>>`
  padding: 3px 2px;
  ${({
    theme: {
      palette: { box }
    },
    hideLine
  }): CSSObject =>
    !hideLine
      ? {
          borderBottom: `1px solid ${box.filled.normal}`
        }
      : {}}
`;

export const Content = styled(Typography)<Pick<EditorProps, 'fullScreen'>>`
  padding: 8px;
  outline: 0;
  user-select: text;
  cursor: text;
  * {
    user-select: text;
  }
  overflow-y: auto;
  &:empty:before {
    content: attr(placeholder);
    color: ${({
      theme: {
        mode,
        palette: { text }
      }
    }) => text[mode].text3};
  }
  & img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }

  ${({ fullScreen }): CSSObject =>
    fullScreen
      ? {
          flex: 1
        }
      : {}}
`;
