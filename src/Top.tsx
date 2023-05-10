import { Link } from "react-router-dom";
import styles from "./Top.module.css";

export const Top: React.FC = () => {
  return (
    <div className={styles.top}>
      <Link to="/tiptap">Tiptap</Link>
      <Link to="/lexical">Lexical</Link>
    </div>
  );
};
