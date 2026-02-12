import DOMPurify from "isomorphic-dompurify";

export function RichTextRenderer({ html }: { html: string }) {
  const cleanHtml = DOMPurify.sanitize(html);
  return (
    <div className="ql-snow ql-container w-full border-none!">
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} className="ql-editor w-full" />
    </div>
  );
}
