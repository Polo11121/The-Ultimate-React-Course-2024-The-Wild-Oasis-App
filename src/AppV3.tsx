import { Counter } from "@/features/compoundComponent";

export const AppV3 = () => (
  <div>
    <h1>Compound Component Pattern</h1>
    <Counter>
      <Counter.Label>My super flexible counter</Counter.Label>
      <Counter.Increase icon="+" />
      <Counter.Decrease icon="-" />
      <Counter.Value />
    </Counter>
  </div>
);
