import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //get all conversation of current user
  const conversations = await getConversations();

  //get all users
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
