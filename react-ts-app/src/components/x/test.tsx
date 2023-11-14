import React, { useState } from "react";

interface MyComponentProps {
  initialCount: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default MyComponent;
