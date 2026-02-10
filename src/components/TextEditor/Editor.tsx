"use client";

import dynamic from "next/dynamic";
import type { EditorProps } from "./Editor.client";

const RichTextEditor = dynamic<EditorProps>(() => import("./Editor.client").then((mod) => mod.RichTextEditor), { ssr: false });

export { RichTextEditor };
export type { EditorProps };
