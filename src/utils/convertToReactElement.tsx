import { HTMLAttributes, createElement } from 'react';

import { Image, Typography } from 'cocstorage-ui';

import { EditorContent } from '../types';

export default function convertToReactElement(editorContents: EditorContent[]) {
  return editorContents.map(({ key, tag, children }) =>
    createElement(
      tag,
      {
        key
      },
      children.map(
        ({
          key: childrenKey,
          tag: childrenTag,
          content = '',
          attributes: { alt = 'Content Img', ...attributes }
        }) => {
          if (childrenTag === 'img') {
            return (
              <Image
                key={childrenKey}
                src={content || ''}
                alt={alt}
                disableAspectRatio
                disableBackgroundColor
                {...(attributes as HTMLAttributes<HTMLImageElement>)}
              />
            );
          }
          if (childrenTag === 'br') {
            return <br key={childrenKey} />;
          }
          return <Typography key={childrenKey}>{content}</Typography>;
        }
      )
    )
  );
}
