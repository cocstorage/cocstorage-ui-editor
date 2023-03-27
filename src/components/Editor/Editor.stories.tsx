import { useState } from 'react';

import { Box, Typography, useTheme } from '@cocstorage/ui';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import convertToReactElement from '@utils/convertToReactElement';

import type { EditorContent } from '../../types';

import Editor from '.';

export default {
  title: 'Editor',
  component: Editor,
  argTypes: {
    placeholder: {
      control: { type: 'text' }
    }
  }
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = function Template(args) {
  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const [editorContents, setEditorContents] = useState<EditorContent[]>([]);

  const handleChange = (newEditorContents: EditorContent[]) => setEditorContents(newEditorContents);

  const handleUploadImage = () => 'https://static.cocstorage.com/assets/hotlink-ok/logo.png';

  return (
    <>
      <Editor onChange={handleChange} onUploadImage={handleUploadImage} {...args} />
      <Box customStyle={{ margin: '16px 0', borderTop: `1px solid ${box.filled.normal}` }} />
      <Box
        customStyle={{
          padding: 8,
          border: `1px solid ${box.filled.normal}`,
          borderRadius: 6
        }}
      >
        <Typography variant="h2">ReactElement</Typography>
        <Box
          customStyle={{
            marginTop: 8
          }}
        >
          {convertToReactElement(editorContents)}
        </Box>
      </Box>
      <Box customStyle={{ margin: '16px 0', borderTop: `1px solid ${box.filled.normal}` }} />
      <Box
        customStyle={{
          padding: 8,
          border: `1px solid ${box.filled.normal}`,
          borderRadius: 6
        }}
      >
        <Typography variant="h2">EditorContentsState</Typography>
        <Box
          customStyle={{
            marginTop: 8
          }}
        >
          {JSON.stringify(editorContents)}
        </Box>
      </Box>
    </>
  );
};

export const Default = Template.bind({});
