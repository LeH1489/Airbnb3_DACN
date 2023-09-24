"use client";

import clsx from "clsx";
import EmptyState from "../components/EmptyState";

const ConversationPage = () => {
  return (
    <div className="lg:pl-80 h-full ">
      <EmptyState
        title="No conversations"
        subtitle="Looks like you have no conversation!"
      />
    </div>
  );
};

export default ConversationPage;
