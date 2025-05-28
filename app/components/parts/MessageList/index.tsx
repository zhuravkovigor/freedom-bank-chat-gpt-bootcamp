import { useEffect, useRef, type FC } from "react";
import type { Message as MessageType } from "~/lib/types";
import Message from "../Message";
import styles from "./MessageList.module.css";

type Props = {
  messages: MessageType[];
  loading?: boolean;
};

const MessageList: FC<Props> = ({ messages, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоматическая прокрутка вниз при добавлении новых сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <h3>Welcome to AI Chat</h3>
          <p>Send a message to start a conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingDot}></div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
