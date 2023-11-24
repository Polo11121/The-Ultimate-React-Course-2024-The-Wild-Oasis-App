import { createContext, useState, ReactNode, useContext } from "react";

type CounterProps = {
  children: ReactNode;
};

const CounterContext = createContext({
  count: 0,
  onIncrease: () => {},
  onDecrease: () => {},
});

const Counter = ({ children }: CounterProps) => {
  const [count, setCount] = useState(0);

  const increaseHandler = () => setCount((count) => count + 1);
  const decreaseHandler = () => setCount((count) => count - 1);

  const value = {
    count,
    onIncrease: increaseHandler,
    onDecrease: decreaseHandler,
  };

  return (
    <CounterContext.Provider value={value}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
};

export const Value = () => {
  const { count } = useContext(CounterContext);

  return <span>{count}</span>;
};

type LabelProps = {
  children: ReactNode;
};
export const Label = ({ children }: LabelProps) => <span>{children}</span>;

type IncreaseDecreaseProps = {
  icon: string;
};
export const Increase = ({ icon }: IncreaseDecreaseProps) => {
  const { onIncrease } = useContext(CounterContext);

  return <button onClick={onIncrease}>{icon}</button>;
};

export const Decrease = ({ icon }: IncreaseDecreaseProps) => {
  const { onDecrease } = useContext(CounterContext);

  return <button onClick={onDecrease}>{icon}</button>;
};

Counter.Value = Value;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export { Counter };
