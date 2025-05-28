import { useState, type FC } from "react";
import { useParams } from "react-router";
import MessageList from "~/components/parts/MessageList";
import Input from "~/components/ui/Input";
import { sendMessageToAPI } from "~/lib/api";
import { useChats } from "~/lib/store";
import styles from "../styles/chat.module.css";
import type { Route } from "./+types/chat.$id";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chat - AI Assistant" },
    { name: "description", content: "Chat with AI Assistant" },
  ];
}

const Chat: FC<Route.MetaArgs> = () => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getChatById, addMessage } = useChats();

  const chat = getChatById(id || "");
  const messages = chat?.messages || [];

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  const sendMessage = async () => {
    if (!id || !userInput.trim() || isLoading) return;

    addMessage(id, userInput, "user");
    setUserInput("");
    setIsLoading(true);

    try {
      const updatedChat = getChatById(id);
      if (!updatedChat) throw new Error("Chat not found");

      const assistantMessage = await sendMessageToAPI(updatedChat.messages);

      addMessage(id, assistantMessage, "assistant");
    } catch (error) {
      console.error("Error fetching response:", error);
      addMessage(
        id,
        "Sorry, there was an error processing your request. Please try again.",
        "assistant"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <MessageList messages={messages} loading={isLoading} />
      <Input
        value={userInput}
        onChange={handleInputChange}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default Chat;
