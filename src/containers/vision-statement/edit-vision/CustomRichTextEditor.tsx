import React from 'react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Italic from '@tiptap/extension-italic';
import { Box } from '@mantine/core';

interface CustomRichTextEditorProps {
   content: string;
   placeholder: string;
   onUpdate: (content: string) => void;
}

const CustomRichTextEditor: React.FC<CustomRichTextEditorProps> = ({
   content,
   placeholder,
   onUpdate
}) => {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Underline,
         Link,
         Superscript,
         Subscript,
         Highlight,
         BulletList,
         ListItem,
         TextStyle,
         FontFamily,
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
         Placeholder.configure({ placeholder }),
         Italic
      ],
      content,
      editorProps: {
         attributes: {
            class: 'border: none'
         }
      },
      onUpdate: ({ editor }) => {
         onUpdate(editor.getHTML());
      }
   });

   const controlStyle = {
      margin: '0 0.313rem',
      border: 'none',
      color: 'black'
   };

   const controlsGroupStyle = {
      display: 'flex',
      border: '0.625rem solid #ccc',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
      padding: '0.313rem',
      borderRadius: '0.25rem',
      backgroundColor: '#fff'
   };

   return (
      <Box className='w-full border w-50 h-50 p-2'>
         <RichTextEditor
            editor={editor}
            className='min-h-[6.25rem]'
            style={{ border: 'none', color: 'greyDark' }}
         >
            {editor && (
               <BubbleMenu editor={editor}>
                  <div style={controlsGroupStyle}>
                     <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold style={controlStyle} />
                        <RichTextEditor.Italic style={controlStyle} />
                        <RichTextEditor.Underline style={controlStyle} />
                        <RichTextEditor.Strikethrough style={controlStyle} />
                        <RichTextEditor.BulletList style={controlStyle} />
                        <RichTextEditor.OrderedList style={controlStyle} />
                     </RichTextEditor.ControlsGroup>
                  </div>
               </BubbleMenu>
            )}
            <RichTextEditor.Content />
         </RichTextEditor>
      </Box>
   );
};

export default CustomRichTextEditor;
