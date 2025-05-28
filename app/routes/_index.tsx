import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import AddIcon from "~/components/icons/AddIcon";
import Button from "~/components/ui/Button";
import { useChats } from "~/lib/store";
import styles from "../styles/index.module.css";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Chat Assistant" },
    {
      name: "description",
      content: "Chat with AI Assistant powered by OpenRouter",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { createChat } = useChats();

  const handleCreateChat = () => {
    const id = uuid();
    createChat(id);
    navigate(`/chat/${id}`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.welcomeCard}>
        <h1>Welcome to AI Chat Assistant</h1>
        <p>
          Start a new conversation with our AI assistant powered by OpenRouter
        </p>
        <div className={styles.button}>
          <Button onClick={handleCreateChat}>
            <AddIcon size={20} />
            New Conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
