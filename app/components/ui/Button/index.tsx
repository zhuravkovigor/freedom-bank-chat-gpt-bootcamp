import type { FC, ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

const Button: FC<Props> = (props) => {
  const { children, onClick } = props;

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
