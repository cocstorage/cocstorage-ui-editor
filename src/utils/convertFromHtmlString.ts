import createUniqueKey from '@utils/createUniqueKey';

import { EditorContent } from '../types';

export default function convertFromHtmlString(html: string): EditorContent[] {
  const regexp = /<.*?>.*?<\/.*?>/g;
  const firstContent = html.replace(regexp, '');
  const contents: string[] = html.match(regexp) || [];

  if (firstContent) contents.unshift(`<div>${firstContent}</div>`);

  return contents
    .map((content, index) => {
      const matchWrapperTag = content.match(/<\/.*?>/);
      const lastState: EditorContent = {
        key: `coc-ui-editor-div-${createUniqueKey(`div-${index}`)}`,
        tag: 'div',
        children: []
      };

      if (matchWrapperTag) {
        const wrapperTag = matchWrapperTag.toString().replace(/[<>/]/g, '');
        lastState.tag = wrapperTag;

        const wrapperElement = document.createElement(wrapperTag);
        wrapperElement.innerHTML = content;

        if (!wrapperElement.firstElementChild) return lastState;

        wrapperElement.firstElementChild.childNodes.forEach((childNode, childIndex) => {
          const { nodeName, parentElement, textContent } = childNode;
          const lowerCaseNodeName = nodeName.toLowerCase();

          if (lowerCaseNodeName === 'img' && parentElement) {
            const element = parentElement.children[childIndex];
            const attributes: Record<string, string | null> = {};
            element.getAttributeNames().forEach((name) => {
              attributes[name] = element.getAttribute(name);
            });

            lastState.children.push({
              key: `coc-ui-editor-${lowerCaseNodeName}-${createUniqueKey(
                `${lowerCaseNodeName}-${childIndex}`
              )}`,
              tag: lowerCaseNodeName,
              content: element.getAttribute('src'),
              attributes
            });
          } else {
            lastState.children.push({
              key: `coc-ui-editor-${lowerCaseNodeName}-${createUniqueKey(
                `${lowerCaseNodeName}-${childIndex}`
              )}`,
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
