import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/quill-custom.css';

const QuillEditor = ({ value, onChange, placeholder, className, style }) => {
  const quillRef = useRef(null);

  // Suppress ReactQuill deprecation warnings
  useEffect(() => {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('findDOMNode is deprecated') ||
         args[0].includes('DOMNodeInserted'))
      ) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('findDOMNode is deprecated') ||
         args[0].includes('DOMNodeInserted'))
      ) {
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image'
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      style={style}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditor;
