import DOMPurify from "isomorphic-dompurify";

export function RichTextRenderer({ content }: { content: string }) {
  const cleanHtml = DOMPurify.sanitize(content);
  return (
    <div className="ql-snow ql-container w-full border-none!">
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} className="ql-editor w-full" />
    </div>
  );
}
