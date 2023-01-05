import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'cocstorage-ui';

import { EditorProps } from '.';

export const StyledEditor = styled.div<Pick<EditorProps, 'fullScreen' | 'hideLine'>>`
  display: flex;
  flex-direction: column;

  border-radius: 8px;

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

  ${({ fullScreen }): CSSObject =>
    fullScreen
      ? {
          width: '100%',
          height: '100%'
        }
      : {}}
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
  height: 100%;
  padding: 8px;
  outline: 0;
  user-select: text;
  cursor: text;
  * {
    user-select: text;
  }
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

  ${({ fullScreen }): CSSObject =>
    fullScreen
      ? {
          flex: 1
        }
      : {}}
`;
