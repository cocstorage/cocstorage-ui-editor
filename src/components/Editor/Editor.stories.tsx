import { RefAttributes, useState } from 'react';

import { Box, Typography, useTheme } from '@cocstorage/ui';
import { Meta, StoryObj } from '@storybook/react';

import { EditorContent } from '@types';
import convertToReactElement from '@utils/convertToReactElement';

import Editor, { EditorProps } from '.';

const meta: Meta<typeof Editor> = {
  title: 'Components/Editor',
  component: Editor
};

export default meta;
type Story = StoryObj<typeof Editor>;

function EditorWithHooks(args: EditorProps & RefAttributes<HTMLDivElement>) {
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
      <Editor {...args} onChange={handleChange} onUploadImage={handleUploadImage} />
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
}

export const Default: Story = {
  render: (args) => <EditorWithHooks {...args} />
};
