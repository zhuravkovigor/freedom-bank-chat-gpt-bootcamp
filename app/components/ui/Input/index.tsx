import type { FC, KeyboardEvent } from "react";
import SendIcon from "~/components/icons/SendIcon";
import styles from "./Input.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

const Input: FC<Props> = (props) => {
  const { onChange, value, onSend, disabled } = props;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey && value.trim()) {
      event.preventDefault();
      onSend();
    }
  };

  const handleSendClick = () => {
    if (value.trim()) {
      onSend();
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        placeholder="Ask anything.."
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className={styles.sendButton}
        onClick={handleSendClick}
        disabled={disabled || !value.trim()}
      >
        <SendIcon size={24} />
      </button>
    </div>
  );
};

export default Input;
