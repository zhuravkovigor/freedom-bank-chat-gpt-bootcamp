import { type FC } from "react";
import type { Message as MessageType } from "~/lib/types";
import styles from "./Message.module.css";

type Props = {
  message: MessageType;
};

const Message: FC<Props> = ({ message }) => {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div
      className={`${styles.messageContainer} ${
        isUser ? styles.user : styles.assistant
      }`}
    >
      <div className={styles.avatar}>{isUser ? "👤" : "🤖"}</div>
      <div className={styles.messageContent}>
        <p className={styles.role}>{isUser ? "You" : "Assistant"}</p>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default Message;
