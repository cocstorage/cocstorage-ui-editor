import { EditorContent } from '../types';

export default function convertToHtmlString(editorContents: EditorContent[]) {
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
