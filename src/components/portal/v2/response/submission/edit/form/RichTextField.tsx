import React from "react";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import { Tooltip } from 'react-tooltip';
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
import { Underline } from "@tiptap/extension-underline";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
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
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Underline,
    ],
    content: submission.written_work,
  });

  editor.on("update", () => {
    onChange(editor.getHTML());
  });

  return (
    <div className={styles.formField}>
      <h2 className={styles.formFieldLabel}>Written work</h2>
      <div className={styles.richTextContainer}>
        <EditorContent editor={editor} className={styles.richTextEditor} />
        <div className={styles.richTextToolbar}>
          {/* Bold */}
          <button
            aria-label="Bold"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Bold"
            className={
              editor.isActive("bold")
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.1474 7.8587C10.7941 7.41203 11.2474 6.6787 11.2474 5.9987C11.2474 4.49203 10.0807 3.33203 8.58073 3.33203H5.08073C4.71406 3.33203 4.41406 3.63203 4.41406 3.9987V11.9987C4.41406 12.3654 4.71406 12.6654 5.08073 12.6654H8.93406C10.3141 12.6654 11.5741 11.5387 11.5807 10.152C11.5874 9.13203 11.0141 8.2587 10.1474 7.8587ZM6.41406 4.9987H8.41406C8.9674 4.9987 9.41406 5.44536 9.41406 5.9987C9.41406 6.55203 8.9674 6.9987 8.41406 6.9987H6.41406V4.9987ZM6.41406 10.9987H8.7474C9.30073 10.9987 9.7474 10.552 9.7474 9.9987C9.7474 9.44536 9.30073 8.9987 8.7474 8.9987H6.41406V10.9987Z"
              />
            </svg>
          </button>
          {/* Italic */}
          <button
            aria-label="Italic"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Italic"
            className={
              editor.isActive("italic")
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path d="M6.66667 4.33203C6.66667 4.88536 7.11333 5.33203 7.66667 5.33203H8.14L5.86 10.6654H5C4.44667 10.6654 4 11.112 4 11.6654C4 12.2187 4.44667 12.6654 5 12.6654H8.33333C8.88667 12.6654 9.33333 12.2187 9.33333 11.6654C9.33333 11.112 8.88667 10.6654 8.33333 10.6654H7.86L10.14 5.33203H11C11.5533 5.33203 12 4.88536 12 4.33203C12 3.7787 11.5533 3.33203 11 3.33203H7.66667C7.11333 3.33203 6.66667 3.7787 6.66667 4.33203Z" />
            </svg>
          </button>
          {/* Strike-through */}
          <button
            aria-label="Strike-through"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Strike-through"
            className={
              editor.isActive("strike")
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.62667 5.44276C9.69333 5.61609 9.72667 5.80276 9.72667 6.00943H11.7333C11.7333 5.56943 11.6467 5.16943 11.48 4.80276C11.3133 4.43609 11.0733 4.11609 10.76 3.84943C10.4533 3.58276 10.0733 3.36943 9.63333 3.22276C9.18667 3.06943 8.7 2.99609 8.16 2.99609C7.63333 2.99609 7.14667 3.06276 6.70667 3.18943C6.27333 3.32276 5.89333 3.50943 5.57333 3.74276C5.25333 3.98276 5.00667 4.26943 4.83333 4.60276C4.65333 4.94276 4.56667 5.30943 4.56667 5.71609C4.56667 6.14276 4.65333 6.50943 4.82667 6.82943C4.8477 6.8715 4.87704 6.91773 4.90485 6.96155C4.9123 6.97328 4.91963 6.98483 4.92667 6.99609H8C7.57333 6.84943 7.31333 6.69609 7.06 6.52943C6.73333 6.30943 6.56667 6.04276 6.56667 5.72276C6.56667 5.56943 6.6 5.42276 6.66667 5.28276C6.73333 5.14276 6.83333 5.02276 6.96 4.91609C7.08667 4.81609 7.24667 4.73609 7.44 4.67609C7.63333 4.61609 7.86667 4.58943 8.12667 4.58943C8.39333 4.58943 8.63333 4.62943 8.83333 4.69609C9.03333 4.76943 9.2 4.86276 9.33333 4.98943C9.46667 5.11609 9.56667 5.26276 9.62667 5.44276ZM2.66667 7.66276H13.3333C13.7 7.66276 14 7.96276 14 8.32943V8.34276C14 8.70943 13.7 9.00943 13.3333 9.00943H11.42C11.46 9.07609 11.5 9.15609 11.5333 9.22943C11.6733 9.54276 11.74 9.90276 11.74 10.3028C11.74 10.7294 11.6533 11.1094 11.4867 11.4428C11.32 11.7761 11.08 12.0628 10.7733 12.2894C10.4667 12.5161 10.0933 12.6894 9.66 12.8161C9.22667 12.9428 8.74 13.0028 8.20667 13.0028C7.88667 13.0028 7.56667 12.9694 7.24667 12.9161C6.92667 12.8561 6.62 12.7694 6.32667 12.6561C6.03333 12.5428 5.76 12.3961 5.51333 12.2228C5.26 12.0494 5.04667 11.8428 4.86 11.6094C4.67333 11.3694 4.53333 11.1028 4.42667 10.8028C4.32 10.5028 4.26667 10.1161 4.26667 9.74943H6.24667C6.24667 10.0494 6.32 10.3494 6.41333 10.5561C6.50667 10.7628 6.64 10.9294 6.80667 11.0561C6.97333 11.1828 7.18 11.2761 7.41333 11.3361C7.64667 11.3961 7.91333 11.4228 8.2 11.4228C8.45333 11.4228 8.68 11.3894 8.87333 11.3361C9.06667 11.2761 9.22 11.2028 9.34667 11.1028C9.47333 11.0028 9.56667 10.8828 9.62667 10.7494C9.68667 10.6094 9.72 10.4628 9.72 10.3094C9.72 10.1361 9.69333 9.98276 9.64667 9.84943C9.59333 9.70943 9.5 9.58276 9.36 9.46943C9.22 9.35609 9.02667 9.24276 8.78 9.12943C8.72909 9.10906 8.66609 9.08697 8.60067 9.06404C8.53758 9.04191 8.47224 9.019 8.41333 8.99609H2.66667C2.3 8.99609 2 8.69609 2 8.32943C2 7.96276 2.3 7.66276 2.66667 7.66276Z"
              />
            </svg>
          </button>
          {/* Underline */}
          <button
            aria-label="Underline"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Underline"
            className={
              editor.isActive("underline")
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0026 7.19333C12.0026 9.22667 10.5493 11.04 8.52927 11.3C6.08927 11.6133 4.0026 9.71333 4.0026 7.33333V2.83333C4.0026 2.37333 4.37594 2 4.83594 2C5.29594 2 5.66927 2.37333 5.66927 2.83333V7.33333C5.66927 8.78 6.98927 9.92667 8.48927 9.61333C9.5826 9.39333 10.3359 8.38 10.3359 7.26667V2.83333C10.3359 2.37333 10.7093 2 11.1693 2C11.6293 2 12.0026 2.37333 12.0026 2.83333V7.19333ZM4.0026 14C3.63594 14 3.33594 13.7 3.33594 13.3333C3.33594 12.9667 3.63594 12.6667 4.0026 12.6667H12.0026C12.3693 12.6667 12.6693 12.9667 12.6693 13.3333C12.6693 13.7 12.3693 14 12.0026 14H4.0026Z"
              />
            </svg>
          </button>
          <span className={styles.richTextToolbarDivider} />
          {/* Unordered list */}
          <button
            aria-label="Bulleted list"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Bulleted list"
            className={
              editor.isActive("bulletList")
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.83594 4C1.83594 3.44667 2.2826 3 2.83594 3C3.38927 3 3.83594 3.44667 3.83594 4C3.83594 4.55333 3.38927 5 2.83594 5C2.2826 5 1.83594 4.55333 1.83594 4ZM1.83594 8C1.83594 7.44667 2.2826 7 2.83594 7C3.38927 7 3.83594 7.44667 3.83594 8C3.83594 8.55333 3.38927 9 2.83594 9C2.2826 9 1.83594 8.55333 1.83594 8ZM2.83594 11C2.2826 11 1.83594 11.4533 1.83594 12C1.83594 12.5467 2.28927 13 2.83594 13C3.3826 13 3.83594 12.5467 3.83594 12C3.83594 11.4533 3.38927 11 2.83594 11ZM13.5026 12.6667H5.5026C5.13594 12.6667 4.83594 12.3667 4.83594 12C4.83594 11.6333 5.13594 11.3333 5.5026 11.3333H13.5026C13.8693 11.3333 14.1693 11.6333 14.1693 12C14.1693 12.3667 13.8693 12.6667 13.5026 12.6667ZM5.5026 8.66667H13.5026C13.8693 8.66667 14.1693 8.36667 14.1693 8C14.1693 7.63333 13.8693 7.33333 13.5026 7.33333H5.5026C5.13594 7.33333 4.83594 7.63333 4.83594 8C4.83594 8.36667 5.13594 8.66667 5.5026 8.66667ZM5.5026 4.66667C5.13594 4.66667 4.83594 4.36667 4.83594 4C4.83594 3.63333 5.13594 3.33333 5.5026 3.33333H13.5026C13.8693 3.33333 14.1693 3.63333 14.1693 4C14.1693 4.36667 13.8693 4.66667 13.5026 4.66667H5.5026Z"
              />
            </svg>
          </button>
          {/* Ordered list */}
          <button
            aria-label="Numbered list"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Numbered list"
            className={
              editor.isActive("orderedList")
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.9974 3.33464H2.33073V5.0013C2.33073 5.18797 2.4774 5.33464 2.66406 5.33464C2.85073 5.33464 2.9974 5.18797 2.9974 5.0013V3.0013C2.9974 2.81464 2.85073 2.66797 2.66406 2.66797H1.9974C1.81073 2.66797 1.66406 2.81464 1.66406 3.0013C1.66406 3.18797 1.81073 3.33464 1.9974 3.33464ZM13.6641 4.66797H5.66406C5.2974 4.66797 4.9974 4.36797 4.9974 4.0013C4.9974 3.63464 5.2974 3.33464 5.66406 3.33464H13.6641C14.0307 3.33464 14.3307 3.63464 14.3307 4.0013C14.3307 4.36797 14.0307 4.66797 13.6641 4.66797ZM5.66406 11.3346H13.6641C14.0307 11.3346 14.3307 11.6346 14.3307 12.0013C14.3307 12.368 14.0307 12.668 13.6641 12.668H5.66406C5.2974 12.668 4.9974 12.368 4.9974 12.0013C4.9974 11.6346 5.2974 11.3346 5.66406 11.3346ZM13.6641 7.33464H5.66406C5.2974 7.33464 4.9974 7.63464 4.9974 8.0013C4.9974 8.36797 5.2974 8.66797 5.66406 8.66797H13.6641C14.0307 8.66797 14.3307 8.36797 14.3307 8.0013C14.3307 7.63464 14.0307 7.33464 13.6641 7.33464ZM3.33073 10.668C3.5174 10.668 3.66406 10.8146 3.66406 11.0013V13.0013C3.66406 13.188 3.5174 13.3346 3.33073 13.3346H1.9974C1.81073 13.3346 1.66406 13.188 1.66406 13.0013C1.66406 12.8146 1.81073 12.668 1.9974 12.668H2.9974V12.3346H2.66406C2.4774 12.3346 2.33073 12.188 2.33073 12.0013C2.33073 11.8146 2.4774 11.668 2.66406 11.668H2.9974V11.3346H1.9974C1.81073 11.3346 1.66406 11.188 1.66406 11.0013C1.66406 10.8146 1.81073 10.668 1.9974 10.668H3.33073ZM1.9974 6.66797H3.33073C3.5174 6.66797 3.66406 6.81464 3.66406 7.0013V7.14797C3.66406 7.2213 3.6374 7.3013 3.58406 7.3613L2.46406 8.66797H3.33073C3.5174 8.66797 3.66406 8.81464 3.66406 9.0013C3.66406 9.18797 3.5174 9.33464 3.33073 9.33464H1.9974C1.81073 9.33464 1.66406 9.18797 1.66406 9.0013V8.85464C1.66406 8.7813 1.69073 8.7013 1.74406 8.6413L2.86406 7.33464H1.9974C1.81073 7.33464 1.66406 7.18797 1.66406 7.0013C1.66406 6.81464 1.81073 6.66797 1.9974 6.66797Z"
              />
            </svg>
          </button>
          <span className={styles.richTextToolbarDivider} />
          {/* Text-align left */}
          <button
            aria-label="Left align"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Left align"
            className={
              editor.isActive({ textAlign: "left" })
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            disabled={!editor.can().chain().focus().setTextAlign("left").run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66667 3.33333C2.3 3.33333 2 3.03333 2 2.66667C2 2.3 2.3 2 2.66667 2H13.3333C13.7 2 14 2.3 14 2.66667C14 3.03333 13.7 3.33333 13.3333 3.33333H2.66667ZM9.33333 4.66667H2.66667C2.3 4.66667 2 4.96667 2 5.33333C2 5.7 2.3 6 2.66667 6H9.33333C9.7 6 10 5.7 10 5.33333C10 4.96667 9.7 4.66667 9.33333 4.66667ZM9.33333 10H2.66667C2.3 10 2 10.3 2 10.6667C2 11.0333 2.3 11.3333 2.66667 11.3333H9.33333C9.7 11.3333 10 11.0333 10 10.6667C10 10.3 9.7 10 9.33333 10ZM13.3333 8.66667H2.66667C2.3 8.66667 2 8.36667 2 8C2 7.63333 2.3 7.33333 2.66667 7.33333H13.3333C13.7 7.33333 14 7.63333 14 8C14 8.36667 13.7 8.66667 13.3333 8.66667ZM2.66667 14H13.3333C13.7 14 14 13.7 14 13.3333C14 12.9667 13.7 12.6667 13.3333 12.6667H2.66667C2.3 12.6667 2 12.9667 2 13.3333C2 13.7 2.3 14 2.66667 14Z"
              />
            </svg>
          </button>
          {/* Text-align right */}
          <button
            aria-label="Right align"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Right align"
            className={
              editor.isActive({ textAlign: "right" })
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            disabled={!editor.can().chain().focus().setTextAlign("right").run()}
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66667 3.33333C2.3 3.33333 2 3.03333 2 2.66667C2 2.3 2.3 2 2.66667 2H13.3333C13.7 2 14 2.3 14 2.66667C14 3.03333 13.7 3.33333 13.3333 3.33333H2.66667ZM6.66667 6H13.3333C13.7 6 14 5.7 14 5.33333C14 4.96667 13.7 4.66667 13.3333 4.66667H6.66667C6.3 4.66667 6 4.96667 6 5.33333C6 5.7 6.3 6 6.66667 6ZM13.3333 8.66667H2.66667C2.3 8.66667 2 8.36667 2 8C2 7.63333 2.3 7.33333 2.66667 7.33333H13.3333C13.7 7.33333 14 7.63333 14 8C14 8.36667 13.7 8.66667 13.3333 8.66667ZM6.66667 11.3333H13.3333C13.7 11.3333 14 11.0333 14 10.6667C14 10.3 13.7 10 13.3333 10H6.66667C6.3 10 6 10.3 6 10.6667C6 11.0333 6.3 11.3333 6.66667 11.3333ZM2.66667 14H13.3333C13.7 14 14 13.7 14 13.3333C14 12.9667 13.7 12.6667 13.3333 12.6667H2.66667C2.3 12.6667 2 12.9667 2 13.3333C2 13.7 2.3 14 2.66667 14Z"
              />
            </svg>
          </button>
          {/* Text-align center */}
          <button
            aria-label="Center align"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Center align"
            className={
              editor.isActive({ textAlign: "center" })
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            disabled={
              !editor.can().chain().focus().setTextAlign("center").run()
            }
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66667 3.33333C2.3 3.33333 2 3.03333 2 2.66667C2 2.3 2.3 2 2.66667 2H13.3333C13.7 2 14 2.3 14 2.66667C14 3.03333 13.7 3.33333 13.3333 3.33333H2.66667ZM4.66667 5.33333C4.66667 5.7 4.96667 6 5.33333 6H10.6667C11.0333 6 11.3333 5.7 11.3333 5.33333C11.3333 4.96667 11.0333 4.66667 10.6667 4.66667H5.33333C4.96667 4.66667 4.66667 4.96667 4.66667 5.33333ZM13.3333 8.66667H2.66667C2.3 8.66667 2 8.36667 2 8C2 7.63333 2.3 7.33333 2.66667 7.33333H13.3333C13.7 7.33333 14 7.63333 14 8C14 8.36667 13.7 8.66667 13.3333 8.66667ZM4.66667 10.6667C4.66667 11.0333 4.96667 11.3333 5.33333 11.3333H10.6667C11.0333 11.3333 11.3333 11.0333 11.3333 10.6667C11.3333 10.3 11.0333 10 10.6667 10H5.33333C4.96667 10 4.66667 10.3 4.66667 10.6667ZM2.66667 14H13.3333C13.7 14 14 13.7 14 13.3333C14 12.9667 13.7 12.6667 13.3333 12.6667H2.66667C2.3 12.6667 2 12.9667 2 13.3333C2 13.7 2.3 14 2.66667 14Z"
              />
            </svg>
          </button>
          {/* Text-align justify */}
          <button
            aria-label="Justify"
            data-tooltip-id="tb-tooltip"
            data-tooltip-content="Justify"
            className={
              editor.isActive({ textAlign: "justify" })
                ? styles.richTextToolbarButtonActive
                : styles.richTextToolbarButton
            }
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            disabled={
              !editor.can().chain().focus().setTextAlign("justify").run()
            }
            type="button"
          >
            <svg
              className={styles.richTextToolbarButtonIcon}
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66667 3.33333C2.3 3.33333 2 3.03333 2 2.66667C2 2.3 2.3 2 2.66667 2H13.3333C13.7 2 14 2.3 14 2.66667C14 3.03333 13.7 3.33333 13.3333 3.33333H2.66667ZM2.66667 6H13.3333C13.7 6 14 5.7 14 5.33333C14 4.96667 13.7 4.66667 13.3333 4.66667H2.66667C2.3 4.66667 2 4.96667 2 5.33333C2 5.7 2.3 6 2.66667 6ZM13.3333 8.66667H2.66667C2.3 8.66667 2 8.36667 2 8C2 7.63333 2.3 7.33333 2.66667 7.33333H13.3333C13.7 7.33333 14 7.63333 14 8C14 8.36667 13.7 8.66667 13.3333 8.66667ZM2.66667 11.3333H13.3333C13.7 11.3333 14 11.0333 14 10.6667C14 10.3 13.7 10 13.3333 10H2.66667C2.3 10 2 10.3 2 10.6667C2 11.0333 2.3 11.3333 2.66667 11.3333ZM2.66667 14H13.3333C13.7 14 14 13.7 14 13.3333C14 12.9667 13.7 12.6667 13.3333 12.6667H2.66667C2.3 12.6667 2 12.9667 2 13.3333C2 13.7 2.3 14 2.66667 14Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <Tooltip id="tb-tooltip" />
    </div>
  );
};

export default RichTextField;
