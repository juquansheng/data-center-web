
import { useDispatch, useSelector } from 'react-redux';
 
import {
  decrement,
  increment,
  incrementByAmount
} from '@/store/slice/counterSlice.ts';
 
export default function Counter() {
  const count = useSelector((state)=>state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div >
        <button
          
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span >{count}</span>
        <button
          
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          
          aria-label="Increment 10"
          
          onClick={() => dispatch(incrementByAmount(10))}
        >
          +10
        </button>
      </div>
    </div>
  );
}