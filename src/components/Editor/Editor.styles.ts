import styled from '@emotion/styled';
import { Typography } from 'cocstorage-ui';

export const StyledEditor = styled.div`
  border: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.filled.normal};
  border-radius: 8px;
`;

export const Toolbar = styled.div`
  padding: 3px 2px;
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.filled.normal};
`;

export const Content = styled(Typography)`
  height: 100%;
  padding: 8px;
  outline: 0;
  user-select: text;
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
`;
