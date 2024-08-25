'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  markdown: string
}

const MarkdownRenderer = ({ markdown }: Props) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-midnight">
      {markdown}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer