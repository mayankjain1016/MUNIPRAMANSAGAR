import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';

const EditorJSComponent = ({ data, onChange, holder = 'editorjs' }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          delimiter: Delimiter,
          inlineCode: {
            class: InlineCode,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            }
          }
        },
        data: data || {},
        placeholder: 'Start writing your news article...',
        onChange: async () => {
          if (editorRef.current && onChange) {
            const content = await editorRef.current.save();
            onChange(content);
          }
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Update editor data when prop changes
  useEffect(() => {
    if (editorRef.current && data) {
      editorRef.current.isReady.then(() => {
        editorRef.current.render(data);
      });
    }
  }, [data]);

  return (
    <div 
      id={holder} 
      style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        padding: '20px',
        minHeight: '400px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default EditorJSComponent;
