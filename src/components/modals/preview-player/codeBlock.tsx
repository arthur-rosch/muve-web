import { Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  onCopy: () => void;
}

export function CodeBlock({ code, language, onCopy }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex items-center justify-between py-4 px-6 border rounded-md bg-[#1e1e1e] border-none">
      <SyntaxHighlighter
        language={language}
        style={solarizedlight}
        customStyle={{
          borderRadius: '5px',
          padding: '10px',
          width: '100%',
          overflow: 'hidden',
          background: 'rgb(40, 44, 52)',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <Copy
        size={32}
        onClick={handleCopy}
        className={`cursor-pointer hover:text-[#187BF0] ${
          copied ? 'text-[#187BF0]' : 'text-white'
        } transition-colors duration-300 ml-4`}
      />
    </div>
  );
}