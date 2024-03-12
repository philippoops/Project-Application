import TestModal from '../../../feature/scratch/TestModal';
import { useAppSelector } from '../../../store/store';
import LoginForm from '../../../feature/auth/LoginForm';
import RegisterForm from '../../../feature/auth/RegisterForm';
export default function ModalManager() {
  const modalLockup = {
    TestModal,
    LoginForm,
    RegisterForm,
  };

  const { type, data, open } = useAppSelector((state) => state.modal);
  let rendredModal;

  if (open && type) {
    const ModalComponent = (modalLockup as any)[type];
    rendredModal = <ModalComponent data={data} />;
  }
  return <span>{rendredModal}</span>;
}
