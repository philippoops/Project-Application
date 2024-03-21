import { Segment, Header, Comment } from 'semantic-ui-react';
import ChatForm from './ChatForm';
import { useEffect, useState } from 'react';
import { ChatComment } from '../../../apps/layouts/types/event';
import { onChildAdded, ref } from 'firebase/database';
import { fb } from '../../../apps/config/firebase';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

type Props = {
  eventId: string;
};

export default function EventDetailedChat({ eventId }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  });
  useEffect(() => {
    const chatRef = ref(fb, `chat/${eventId}`);
    const unsubscribe = onChildAdded(chatRef, (data) => {
      const comment = { ...data.val(), id: data.key };
      setComments((prevState) => [...prevState, comment]);
    });

    return () => unsubscribe();
  }, [eventId]);

  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null);
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));
    const dataTree: ChatComment[] = [];
    data.forEach((item) => {
      if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
      else dataTree.push(table[item.id]);
    });
    return dataTree;
  }
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached style={{ height: 400, overflowY: 'scroll' }}>
        <ChatForm eventId={eventId} />

        <Comment.Group style={{ padding: 0, margin: 0 }}>
          {createCommentTree(comments)
            .reverse()
            .map((comment) => (
              <Comment key={comment.id}>
                {/* this is the comment for starting the comment start */}
                <Comment.Avatar src={comment.photoURL || '/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profiles/${comment.uid}`}>
                    Matt
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, new Date())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() =>
                        setReplyForm({ open: true, commentId: comment.id })
                      }
                    >
                      Reply
                    </Comment.Action>
                    {replyForm.open && replyForm.commentId === comment.id && (
                      <ChatForm
                        key={comment.id}
                        eventId={eventId}
                        parentId={comment.id}
                        setReplyForm={setReplyForm}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
                {/* this is the comment for starting the comment end */}

                {/* reply start here */}
                <Comment.Group style={{ paddingBottom: 0 }}>
                  {comment.childNodes.map((child) => (
                    <Comment key={child.id}>
                      <Comment.Avatar src={child.photoURL || '/user.png'} />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profiles/${child.uid}`}>
                          Matt
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {formatDistance(child.date, new Date())} ago
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>{child.text}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setReplyForm({ open: true, commentId: child.id })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {replyForm.open &&
                            replyForm.commentId === child.id && (
                              <ChatForm
                                key={comment.id}
                                eventId={eventId}
                                parentId={child.parentId}
                                setReplyForm={setReplyForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
                {/* reply end here */}
              </Comment>
            ))}
        </Comment.Group>
      </Segment>
    </>
  );
}
