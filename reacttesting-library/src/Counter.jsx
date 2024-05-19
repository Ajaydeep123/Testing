import {useCount} from "./useCount"

function Counter({initialCount = 0}) {
    const {count, incrementCount, decrementCount} = useCount(initialCount)

  return (
    <div>
        <button onClick={decrementCount}>-</button>
        <span data-testid="count">{count}</span>
        <button onClick={incrementCount}>+</button>
    </div>
  )
}

export default Counter