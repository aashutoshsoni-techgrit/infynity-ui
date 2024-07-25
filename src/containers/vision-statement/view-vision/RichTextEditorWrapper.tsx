import React from 'react';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import colours from '@/src/constants/palette';

interface RichTextEditorWrapperProps {
   content: string;
}

const RichTextEditorWrapper: React.FC<RichTextEditorWrapperProps> = ({ content }) => {
   const editor = useEditor({
      extensions: [StarterKit, Underline],
      content: content,
      editable: false,
      editorProps: {
         attributes: {
            class: 'border: none'
         }
      }
   });

   return (
      <RichTextEditor
         editor={editor}
         style={{ border: 'none', color: colours.greyDark, paddingBottom: '0.7rem' }}
      >
         <RichTextEditor.Content />
      </RichTextEditor>
   );
};

export default RichTextEditorWrapper;
