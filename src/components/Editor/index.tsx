import { ChangeEvent, forwardRef, useEffect, useRef } from 'react';

import { convertFromHtmlString, convertToHtmlString } from '@utils';
import { Button, CustomStyle, Icon } from 'cocstorage-ui';

import { EditorContent } from '../../types';
import { Content, StyledEditor, Toolbar } from './Editor.styles';

export interface EditorProps {
  onChange?: (editorContents: EditorContent[]) => void;
  onUploadImage?: (file: File | null) => Promise<string> | string;
  fullScreen?: boolean;
  hideLine?: boolean;
  initEditorContents?: EditorContent[];
  initValue?: string;
  placeholder?: string;
  disabled?: boolean;
  customStyle?: CustomStyle;
  toolbarCustomStyle?: CustomStyle;
  contentCustomStyle?: CustomStyle;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(function Editor(
  {
    onChange,
    onUploadImage,
    fullScreen,
    hideLine,
    initEditorContents,
    initValue,
    placeholder = '내용을 입력해 주세요.',
    disabled,
    customStyle,
    toolbarCustomStyle,
    contentCustomStyle,
    ...props
  },
  ref
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInit = useRef(false);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!contentRef.current) return;

    const { files } = event.currentTarget;

    if (onUploadImage && typeof onUploadImage === 'function' && files) {
      const src = await onUploadImage(files[0]);
      const img = new window.Image();
      img.src = src;
      img.alt = files[0].name;
      img.onload = () => {
        if (!contentRef.current) return;
        const { width, height } = img;

        img.width = width;
        img.height = height;
        contentRef.current.innerHTML = `${contentRef.current.innerHTML}<div>${img.outerHTML}</div>`;

        if (onChange && typeof onChange === 'function') {
          onChange(convertFromHtmlString(contentRef.current.innerHTML));
        }
      };
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleKeyUp = () => {
    if (!contentRef.current) return;

    if (onChange && typeof onChange === 'function') {
      onChange(convertFromHtmlString(contentRef.current.innerHTML));
    }
  };

  useEffect(() => {
    if (
      onChange &&
      typeof onChange === 'function' &&
      !isInit.current &&
      contentRef.current &&
      !contentRef.current.innerHTML &&
      initValue
    ) {
      isInit.current = true;
      contentRef.current.innerHTML = initValue;
      onChange(convertFromHtmlString(contentRef.current.innerHTML));
    }
  }, [onChange, initValue]);

  useEffect(() => {
    if (
      onChange &&
      typeof onChange === 'function' &&
      !isInit.current &&
      contentRef.current &&
      !contentRef.current.innerHTML &&
      initEditorContents &&
      initEditorContents.length
    ) {
      isInit.current = true;
      contentRef.current.innerHTML = convertToHtmlString(initEditorContents);
      onChange(convertFromHtmlString(contentRef.current.innerHTML));
    }
  }, [onChange, initEditorContents]);

  return (
    <StyledEditor ref={ref} fullScreen={fullScreen} hideLine={hideLine} css={customStyle}>
      <Toolbar hideLine={hideLine} css={toolbarCustomStyle}>
        <Button
          variant="transparent"
          startIcon={<Icon name="ImageOutlined" />}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </Button>
      </Toolbar>
      <Content
        ref={contentRef}
        onKeyUp={handleKeyUp}
        contentEditable={!disabled}
        placeholder={placeholder}
        fullScreen={fullScreen}
        css={contentCustomStyle}
        {...props}
      />
    </StyledEditor>
  );
});

export default Editor;
