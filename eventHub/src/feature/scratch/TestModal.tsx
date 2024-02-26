import ModalWrapper from '../../apps/common/modal/ModalWrapper';
import { useAppSelector } from '../../store/store';

export default function TestModal() {
  const { data } = useAppSelector((state) => state.modal);
  return (
    <ModalWrapper header={'Testing'}>
      <div>Test data is {data}</div>
    </ModalWrapper>
  );
}
