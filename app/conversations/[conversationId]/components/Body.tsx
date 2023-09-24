"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  //get a new message => scroll down
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  //every time body component load ==> call api => mark the message has been seen
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    //subscribe the channel
    pusherClient.subscribe(conversationId);

    //everytime we join the conversation ==> scroll down to see the lastest message
    bottomRef?.current?.scrollIntoView();

    //receive newMessage from the pusher client
    const messageHandler = (message: FullMessageType) => {
      //when we receive a new message ==> mark the message has been seen
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        //find in messages array and check if this array has the id of the new message or not
        //if true => message already displayed
        //don't set message =  new message
        //ensure we don't duplicate the message
        //find method using lodash
        if (find(current, { id: message.id })) {
          return current;
        }

        //if false ==> messages array doens't include the new message
        //set message = new message from pusher server
        return [...current, message];
      });
    };

    //for alerting we has seen the message
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          //find the exact message and replace it with the new message (update seenID)
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    //listen the event (event name, handler)
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    //unbind and unsubscribe when this component is unmounted
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
