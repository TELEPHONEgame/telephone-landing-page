import React, { useState, useEffect } from "react";
import {
  useEditor,
  FloatingMenu,
  BubbleMenu,
  EditorContent,
} from "@tiptap/react";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { History } from "@tiptap/extension-history";
import { Italic } from "@tiptap/extension-italic";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import styles from "./styles.module.scss";
import { Submission } from "@/components/portal/v2/types";

const RichTextField = ({
  submission,
  onChange,
}: {
  submission: Submission;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      Bold,
      BulletList,
      Document,
      Dropcursor,
      Gapcursor,
      HardBreak,
      History,
      Italic,
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
    ],
    content: submission.written_work,
  });

  editor.on("update", () => {
    onChange(editor.getHTML());
  });

  return (
    <div className={styles.formField}>
      <h2 className={styles.formFieldLabel}>Written work</h2>
      <div>
        <EditorContent editor={editor} className={styles.richTextEditor} />
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      </div>
    </div>
  );
};

export default RichTextField;
