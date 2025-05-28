import AddIcon from "~/components/icons/AddIcon";
import Button from "../../ui/Button";
import styles from "./Sidebar.module.css";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import TrashIcon from "~/components/icons/TrashIcon";
import ChatIcon from "~/components/icons/ChatIcon";
import { useChats } from "~/lib/store";
import { NavLink } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const { chats, createChat, clearChats } = useChats();

  const handleCreateChat = () => {
    const id = uuid();
    createChat(id);
    navigate(`/chat/${id}`);
  };

  const handleRemoveChats = () => {
    navigate("/");
    clearChats();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Button onClick={handleCreateChat}>
          <AddIcon size={17} />
          New Chat
        </Button>
      </div>

      <div className={styles.chats}>
        {chats.map((chat) => (
          <NavLink
            to={{
              pathname: `/chat/${chat.id}`,
            }}
            key={chat.id}
            className={({ isActive }) =>
              `${styles.chat} ${isActive && styles.active}`
            }
          >
            <ChatIcon size={16} />
            {chat.label}
          </NavLink>
        ))}
      </div>

      <div className={styles.bottom}>
        <Button onClick={handleRemoveChats}>
          <TrashIcon size={17} />
          Clear chats
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
