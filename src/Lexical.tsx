import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HEADING, ORDERED_LIST, UNORDERED_LIST } from "@lexical/markdown";
import { $setBlocksType } from "@lexical/selection";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {
  HeadingNode,
  HeadingTagType,
  $createHeadingNode,
} from "@lexical/rich-text";
import {
  ListNode,
  ListItemNode,
  REMOVE_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { Toolbar } from "./Toolbar";
import styles from "./Tiptap.module.scss";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

export const Lexical: React.FC = () => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "Playground",
        nodes: [HeadingNode, ListNode, ListItemNode],
        onError: (error) => console.error(error),
      }}
    >
      <div className={styles.tiptapContainer}>
        <div>
          <LexicalToolbar />
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={<div />}
            contentEditable={<ContentEditable />}
          />
        </div>
        <StateViewer />
      </div>
      <LexicalPlugins />
    </LexicalComposer>
  );
};

type BlockType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "paragraph"
  | "bulletList"
  | "orderedList";

const LexicalToolbar: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [$updateToolbar, editor]);

  const formatHeading = useCallback(
    (headingSize: HeadingTagType) => {
      if (blockType !== headingSize) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(headingSize));
          }
        });
      }
    },
    [blockType, editor]
  );

  const formatBulletList = useCallback(() => {
    if (blockType !== "bulletList") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatOrderedList = useCallback(() => {
    if (blockType !== "orderedList") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  return (
    <Toolbar
      boldIsActive={isBold}
      onClickBoldButton={() =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }
      italicIsActive={isItalic}
      onClickItalicButton={() =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }
      underlineIsActive={isUnderline}
      onClickUnderlineButton={() =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
      }
      strikethroughIsActive={isStrikethrough}
      onClickStrikethroughButton={() =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
      }
      h1IsActive={blockType === "h1"}
      onClickH1Button={() => formatHeading("h1")}
      h2IsActive={blockType === "h2"}
      onClickH2Button={() => formatHeading("h2")}
      h3IsActive={blockType === "h3"}
      onClickH3Button={() => formatHeading("h3")}
      h4IsActive={blockType === "h4"}
      onClickH4Button={() => formatHeading("h4")}
      h5IsActive={blockType === "h5"}
      onClickH5Button={() => formatHeading("h5")}
      h6IsActive={blockType === "h6"}
      onClickH6Button={() => formatHeading("h6")}
      bulletListIsActive={blockType === "bulletList"}
      onClickBulletListButton={formatBulletList}
      orderedListIsActive={blockType === "orderedList"}
      onClickOrderedListButton={formatOrderedList}
    />
  );
};

const MY_TRANSFORMERS = [HEADING, ORDERED_LIST, UNORDERED_LIST];
const LexicalPlugins: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <MarkdownShortcutPlugin transformers={MY_TRANSFORMERS} />
      <HistoryPlugin />
    </>
  );
};

const StateViewer: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <TreeView
      editor={editor}
      viewClassName=""
      treeTypeButtonClassName=""
      timeTravelButtonClassName=""
      timeTravelPanelButtonClassName=""
      timeTravelPanelClassName=""
      timeTravelPanelSliderClassName=""
    />
  );
};
