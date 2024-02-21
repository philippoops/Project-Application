import { Button } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { decrement, increment, incrementByAmount } from './testSlice';

export default function Scratch() {
  const { data } = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Scratch Devo</h1>
      <h1>Feature scratch: {data}</h1>

      <Button
        onClick={() => dispatch(increment())}
        color="green"
        content="Increment"
      />
      <Button
        onClick={() => dispatch(decrement())}
        color="brown"
        content="Decrement"
      />
      <Button
        onClick={() => dispatch(incrementByAmount(5))}
        color="teal"
        content="Increment by 5"
      />
    </div>
  );
}
