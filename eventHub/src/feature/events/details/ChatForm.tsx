import { push, ref, set } from 'firebase/database';
import { KeyboardEvent } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, Loader } from 'semantic-ui-react';
import { auth, fb } from '../../../apps/config/firebase';

type Props = {
  eventId: string;
  parentId?: string | null;
  setReplyForm?: (value: any) => void;
};

export default function ChatForm({ eventId, parentId, setReplyForm }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { comment: '' },
  });

  async function onSubmit(data: FieldValues) {
    try {
      // make sure to used here is the ref from firebase/database this diff function in firestore
      const chatRef = ref(fb, `chat/${eventId}`);
      const newChatRef = push(chatRef);
      await set(newChatRef, {
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
        text: data.comment,
        date: Date.now(),
        parentId: parentId || null,
      });

      if (parentId && setReplyForm)
        setReplyForm({ open: false, commentId: null });
      reset();
    } catch (error: any) {
      toast.error(error.messsage);
    }
  }
  return (
    <Form>
      <Form.TextArea
        {...register('comment', { required: true })}
        placeholder="Enter your comment (Enter to submit, SHIFT + Enter to add new line)"
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && e.shiftKey) {
            return;
          }
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      />
      <Loader active={isSubmitting} />
    </Form>
  );
}
