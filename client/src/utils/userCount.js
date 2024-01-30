import { useQuery, useMutation } from '@apollo/client';
import { chatrooms, ENTER_CHATROOM, LEAVE_CHATROOM } from '../../../server/graphql/schema';

// This component allows users to enter and leave chatrooms
export function enterLeaveChat() {
  // Fetch chatrooms using the chatrooms query
  const { loading, error, data } = useQuery(chatrooms);

  // Set up mutations for entering and leaving chatrooms
  const [enterChatroom] = useMutation(ENTER_CHATROOM);
  const [leaveChatroom] = useMutation(LEAVE_CHATROOM);

  // display loading message while the chatrooms are being fetched
  if (loading) return <p>Loading...</p>;

  // display error message if there is an error fetching chatrooms
  if (error) return <p>Error :(</p>;

  // handler for entering a chatroom
  const handleEnterChatroom = async (chatroomId) => {
    try {
      // execute the enterChatroom mutation with the chatroom ID and user ID
      await enterChatroom({ variables: { chatroomId, userId } });
    } catch (error) {
      // log error if the mutation fails
      console.error("Error entering chatroom:", error);
    }
  };

  // handler for removing user from chatroom 
  const handleLeaveChatroom = async (chatroomId) => {
    try {
      // execute the leaveChatroom mutation with the chatroom ID and user ID
      await leaveChatroom({ variables: { chatroomId, userId } });
    } catch (error) {
      // log error if the mutation fails
      console.error("Error leaving chatroom:", error);
    }
  };
}
