import { HTMLAttributes, createElement } from 'react';

import { Image, Typography } from 'cocstorage-ui';

import { EditorContent } from '../types';

export function convertFromHtmlString(html: string): EditorContent[] {
  const regexp = /<.*?>.*?<\/.*?>/g;
  const firstContent = html.replace(regexp, '');
  const contents: string[] = html.match(regexp) || [];

  if (firstContent) contents.unshift(`<div>${firstContent}</div>`);

  return contents
    .map((content) => {
      const matchWrapperTag = content.match(/<\/.*?>/);
      const lastState: EditorContent = {
        tag: 'div',
        children: []
      };

      if (matchWrapperTag) {
        const wrapperTag = matchWrapperTag.toString().replace(/[<>/]/g, '');
        lastState.tag = wrapperTag;

        const wrapperElement = document.createElement(wrapperTag);
        wrapperElement.innerHTML = content;

        if (!wrapperElement.firstElementChild) return lastState;

        wrapperElement.firstElementChild.childNodes.forEach((childNode, index) => {
          const { nodeName, parentElement, textContent } = childNode;
          const lowerCaseNodeName = nodeName.toLowerCase();

          if (lowerCaseNodeName === 'img' && parentElement) {
            const element = parentElement.children[index];
            const attributes: Record<string, string | null> = {};
            element.getAttributeNames().forEach((name) => {
              attributes[name] = element.getAttribute(name);
            });

            lastState.children.push({
              tag: lowerCaseNodeName,
              content: element.getAttribute('src'),
              attributes
            });
          } else {
            lastState.children.push({
              tag: lowerCaseNodeName,
              content: textContent,
              attributes: {}
            });
          }
        });
      }

      return lastState;
    })
    .filter(({ tag, children }) => tag && children.length > 0);
}

export function convertToReactElement(editorContents: EditorContent[]) {
  return editorContents.map(({ tag, children }, index) =>
    createElement(
      tag,
      {
        // eslint-disable-next-line react/no-array-index-key
        key: `content-${tag}-${index}`
      },
      children.map(
        (
          { tag: childrenTag, content = '', attributes: { alt = 'Content Img', ...attributes } },
          childrenIndex
        ) => {
          if (childrenTag === 'img') {
            return (
              <Image
                // eslint-disable-next-line react/no-array-index-key
                key={`content-${tag}-${index}-image-${content}`}
                src={content || ''}
                alt={alt}
                disableAspectRatio
                disableBackgroundColor
                {...(attributes as HTMLAttributes<HTMLImageElement>)}
              />
            );
          }
          if (childrenTag === 'br') {
            // eslint-disable-next-line react/no-array-index-key
            return <br key={`content-${tag}-${index}-br-${childrenIndex}`} />;
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Typography key={`content-${tag}-${index}-typography-${childrenIndex}`}>
              {content}
            </Typography>
          );
        }
      )
    )
  );
}

export function convertToHtmlString(editorContents: EditorContent[]) {
  return editorContents
    .map(({ tag, children }) => {
      const wrapperElement = document.createElement(tag);

      wrapperElement.innerHTML = children
        .map(({ tag: childrenTag, content, attributes }) => {
          if (childrenTag === '#text') return content;

          const childrenElement = document.createElement(childrenTag);

          Object.keys(attributes).forEach((key) => {
            const attribute = attributes[key as keyof typeof attributes];

            if (!attribute) return;

            childrenElement.setAttribute(key, attribute);
          });

          if (childrenTag !== 'img' && content) {
            childrenElement.innerHTML = content;
          }

          return childrenElement.outerHTML;
        })
        .join('');

      return wrapperElement.outerHTML;
    })
    .join('');
}
