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
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => (
          <a className="text-green-500 underline" target="_blank" {...props} />
        ),
        table: (props) => (
          <table className="table-auto w-full" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}