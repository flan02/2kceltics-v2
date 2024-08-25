import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

// ! ReactMarkdown is a server-side rendering library, so it is not recommended to use it in the client-side.

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        div: (props) => <div className="text-red-500" {...props} />,
        p: (props) => <p className="text-midnight px-4" {...props} />,
        table: (props) => (
          <table className="table-auto w-full text-midnight" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}