"use client";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("./Editor.client").then((mod) => mod.RichTextEditor), { ssr: false });
export { RichTextEditor };
//# sourceMappingURL=Editor.js.map