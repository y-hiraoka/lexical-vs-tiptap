import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import History from "@tiptap/extension-history";
import { Toolbar } from "./Toolbar";
import styles from "./Tiptap.module.scss";

export const Tiptap: React.FC = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      Bold,
      Italic,
      Link,
      Strike,
      Underline,
      History,
    ],

    content: "<p>Hello World! 🌎️</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.tiptapContainer}>
      <div>
        <Toolbar
          boldIsActive={editor.isActive("bold")}
          boldIsDisabled={!editor.can().chain().focus().toggleBold().run()}
          onClickBoldButton={() => editor.chain().focus().toggleBold().run()}
          italicIsActive={editor.isActive("italic")}
          italicIsDisabled={!editor.can().chain().focus().toggleItalic().run()}
          onClickItalicButton={() =>
            editor.chain().focus().toggleItalic().run()
          }
          underlineIsActive={editor.isActive("underline")}
          underlineIsDisabled={
            !editor.can().chain().focus().toggleUnderline().run()
          }
          onClickUnderlineButton={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          strikethroughIsActive={editor.isActive("strike")}
          strikethroughIsDisabled={
            !editor.can().chain().focus().toggleStrike().run()
          }
          onClickStrikethroughButton={() =>
            editor.chain().focus().toggleStrike().run()
          }
          h1IsActive={editor.isActive("heading", { level: 1 })}
          onClickH1Button={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          h2IsActive={editor.isActive("heading", { level: 2 })}
          onClickH2Button={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          h3IsActive={editor.isActive("heading", { level: 3 })}
          onClickH3Button={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          h4IsActive={editor.isActive("heading", { level: 4 })}
          onClickH4Button={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          h5IsActive={editor.isActive("heading", { level: 5 })}
          onClickH5Button={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          h6IsActive={editor.isActive("heading", { level: 6 })}
          onClickH6Button={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          bulletListIsActive={editor.isActive("bulletList")}
          onClickBulletListButton={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          orderedListIsActive={editor.isActive("orderedList")}
          onClickOrderedListButton={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        />
        <EditorContent editor={editor} className={styles.tiptap} />
      </div>
      <pre className={styles.stateViewer}>
        {JSON.stringify(editor.getJSON(), null, 2)}
      </pre>
    </div>
  );
};
