import { useRef, useEffect } from 'react';
import { Box, IconButton, Divider, Tooltip } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Title,
  Code,
} from '@mui/icons-material';

const WordPadEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleChange();
  };

  const handleChange = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarButtons = [
    { icon: <FormatBold />, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: <FormatItalic />, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: <FormatUnderlined />, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
    { divider: true },
    { icon: <Title />, command: 'formatBlock', value: 'h2', tooltip: 'Heading' },
    { divider: true },
    { icon: <FormatListBulleted />, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: <FormatListNumbered />, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { divider: true },
    { icon: <FormatAlignLeft />, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: <FormatAlignCenter />, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: <FormatAlignRight />, command: 'justifyRight', tooltip: 'Align Right' },
  ];

  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          p: 1,
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          flexWrap: 'wrap',
        }}
      >
        {toolbarButtons.map((btn, index) => {
          if (btn.divider) {
            return <Divider key={index} orientation="vertical" flexItem sx={{ mx: 0.5 }} />;
          }
          return (
            <Tooltip key={index} title={btn.tooltip}>
              <IconButton
                size="small"
                onClick={() => execCommand(btn.command, btn.value)}
                sx={{
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                {btn.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>

      {/* Editor Area */}
      <Box
        ref={editorRef}
        contentEditable
        onInput={handleChange}
        onBlur={handleChange}
        sx={{
          minHeight: '400px',
          maxHeight: '600px',
          overflowY: 'auto',
          p: 3,
          backgroundColor: '#fff',
          outline: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          lineHeight: 1.6,
          '&:focus': {
            backgroundColor: '#fafafa',
          },
          '& h2': {
            fontSize: '24px',
            fontWeight: 'bold',
            marginTop: '16px',
            marginBottom: '12px',
          },
          '& h3': {
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '14px',
            marginBottom: '10px',
          },
          '& p': {
            marginBottom: '12px',
          },
          '& ul, & ol': {
            marginLeft: '24px',
            marginBottom: '12px',
          },
          '& li': {
            marginBottom: '6px',
          },
          '& strong': {
            fontWeight: 'bold',
          },
          '& em': {
            fontStyle: 'italic',
          },
          '& u': {
            textDecoration: 'underline',
          },
        }}
        suppressContentEditableWarning
      />
    </Box>
  );
};

export default WordPadEditor;
