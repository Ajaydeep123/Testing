import { useState } from 'react';

export function useCount(initialCount = 0) {
  const [count, setCount] = useState(initialCount);

  const incrementCount = () => setCount(prevCount => prevCount + 1);
  const decrementCount = () => setCount(prevCount => prevCount - 1);

  return {
    count,
    incrementCount,
    decrementCount,
  };
}
