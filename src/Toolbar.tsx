import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
} from "react-icons/all";
import styles from "./Toolbar.module.css";

type Props = {
  boldIsActive: boolean;
  boldIsDisabled?: boolean;
  onClickBoldButton: () => void;
  italicIsActive: boolean;
  italicIsDisabled?: boolean;
  onClickItalicButton: () => void;
  underlineIsActive: boolean;
  underlineIsDisabled?: boolean;
  onClickUnderlineButton: () => void;
  strikethroughIsActive: boolean;
  strikethroughIsDisabled?: boolean;
  onClickStrikethroughButton: () => void;

  h1IsActive: boolean;
  onClickH1Button: () => void;
  h2IsActive: boolean;
  onClickH2Button: () => void;
  h3IsActive: boolean;
  onClickH3Button: () => void;
  h4IsActive: boolean;
  onClickH4Button: () => void;
  h5IsActive: boolean;
  onClickH5Button: () => void;
  h6IsActive: boolean;
  onClickH6Button: () => void;
  bulletListIsActive: boolean;
  onClickBulletListButton: () => void;
  orderedListIsActive: boolean;
  onClickOrderedListButton: () => void;
};

export const Toolbar: React.FC<Props> = ({
  boldIsActive,
  boldIsDisabled,
  onClickBoldButton,
  italicIsActive,
  italicIsDisabled,
  onClickItalicButton,
  underlineIsActive,
  underlineIsDisabled,
  onClickUnderlineButton,
  strikethroughIsActive,
  strikethroughIsDisabled,
  onClickStrikethroughButton,
  h1IsActive,
  onClickH1Button,
  h2IsActive,
  onClickH2Button,
  h3IsActive,
  onClickH3Button,
  h4IsActive,
  onClickH4Button,
  h5IsActive,
  onClickH5Button,
  h6IsActive,
  onClickH6Button,
  bulletListIsActive,
  onClickBulletListButton,
  orderedListIsActive,
  onClickOrderedListButton,
}) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.inlineStyleButtons}>
        <button
          type="button"
          disabled={boldIsDisabled}
          onClick={onClickBoldButton}
          aria-pressed={boldIsActive}
          className={styles.inlineStyleButton}
        >
          <MdFormatBold />
        </button>
        <button
          type="button"
          disabled={italicIsDisabled}
          onClick={onClickItalicButton}
          aria-pressed={italicIsActive}
          className={styles.inlineStyleButton}
        >
          <MdFormatItalic />
        </button>
        <button
          type="button"
          disabled={underlineIsDisabled}
          onClick={onClickUnderlineButton}
          aria-pressed={underlineIsActive}
          className={styles.inlineStyleButton}
        >
          <MdFormatUnderlined />
        </button>
        <button
          type="button"
          disabled={strikethroughIsDisabled}
          onClick={onClickStrikethroughButton}
          aria-pressed={strikethroughIsActive}
          className={styles.inlineStyleButton}
        >
          <MdFormatStrikethrough />
        </button>
      </div>
      <div className={styles.blockTypeButtons}>
        <button
          type="button"
          onClick={onClickH1Button}
          aria-pressed={h1IsActive}
          className={styles.blockTypeButton}
        >
          H1
        </button>
        <button
          type="button"
          onClick={onClickH2Button}
          aria-pressed={h2IsActive}
          className={styles.blockTypeButton}
        >
          H2
        </button>
        <button
          type="button"
          onClick={onClickH3Button}
          aria-pressed={h3IsActive}
          className={styles.blockTypeButton}
        >
          H3
        </button>
        <button
          type="button"
          onClick={onClickH4Button}
          aria-pressed={h4IsActive}
          className={styles.blockTypeButton}
        >
          H4
        </button>
        <button
          type="button"
          onClick={onClickH5Button}
          aria-pressed={h5IsActive}
          className={styles.blockTypeButton}
        >
          H5
        </button>
        <button
          type="button"
          onClick={onClickH6Button}
          aria-pressed={h6IsActive}
          className={styles.blockTypeButton}
        >
          H6
        </button>
        <button
          type="button"
          onClick={onClickBulletListButton}
          aria-pressed={bulletListIsActive}
          className={styles.blockTypeButton}
        >
          UL
        </button>
        <button
          type="button"
          onClick={onClickOrderedListButton}
          aria-pressed={orderedListIsActive}
          className={styles.blockTypeButton}
        >
          OL
        </button>
      </div>
    </div>
  );
};
