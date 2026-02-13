"use client";

import QuillTableBetter from "quill-table-better";
import { useEffect, useRef } from "react";
import Quill from "quill";

const SIZE_VALUES = ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "22px", "24px", "32px", "36px"];

const buildSizePickerCss = () => {
  const rules = SIZE_VALUES.map((value) => {
    const label = value.replace("px", "");
    return [
      `.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="${value}"]::before { content: "${label}"; }`,
      `.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="${value}"]::before { content: "${label}"; }`,
    ].join("\n");
  });

  rules.push(`.ql-snow .ql-picker.ql-size .ql-picker-label:not([data-value])::before { content: "12"; }`);

  return rules.join("\n");
};

export type EditorProps = {
  initialData?: string;
   
  onChange: (_html: string) => void;
};

const TextEditor = ({ initialData, onChange }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const initialDataRef = useRef(initialData);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorRoot = container.ownerDocument.createElement("div");
    container.appendChild(editorRoot);

    const styleId = "quill-size-picker-labels";
    const doc = container.ownerDocument;
    if (!doc.getElementById(styleId)) {
      const styleEl = doc.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = buildSizePickerCss();
      doc.head.appendChild(styleEl);
    }

    const Size = Quill.import("attributors/style/size") as {
      whitelist: string[];
    };
    Size.whitelist = SIZE_VALUES;
    const registerTarget = Size as unknown as Parameters<typeof Quill.register>[0];
    Quill.register(registerTarget, true);

    Quill.register(
      {
        "modules/table-better": QuillTableBetter,
      },
      true,
    );

    const quill = new Quill(editorRoot, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ size: Size.whitelist }],
          ["link", "bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }, "table-better"],
          [{ script: "sub" }, { script: "super" }],
          ["clean"],
        ],
        "table-better": {
          language: "tr_TR",
          toolbarTable: true,
        },
        keyboard: {
          bindings: QuillTableBetter.keyboardBindings,
        },
      },
    });

    quill.root.style.fontSize = "12px";
    quill.format("size", "12px");

    quillRef.current = quill;

    if (initialDataRef.current) {
      const delta = quill.clipboard.convert({ html: initialDataRef.current });
      quill.updateContents(delta, Quill.sources.USER);
    }

    const handler = () => {
      const html = quill.root.innerHTML;
      onChangeRef.current(html);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
      quillRef.current = null;
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} />;
};

export const RichTextEditor = ({ initialData, onChange }: EditorProps) => {
  return <TextEditor initialData={initialData} onChange={onChange} />;
};
