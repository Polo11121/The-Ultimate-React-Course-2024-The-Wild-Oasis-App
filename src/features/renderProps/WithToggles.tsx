import { useState } from "react";

type WrappedComponentProps<T> = {
  title: string;
  items: T[];
};
export const WithToggles = <T,>(
  WrappedComponent: (props: WrappedComponentProps<T>) => JSX.Element
) => {
  return function List(props: WrappedComponentProps<T>) {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;

    const toggleOpenHandler = () => {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    };

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpenHandler}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>
        {isOpen && <WrappedComponent {...props} items={displayItems} />}
        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
        </button>
      </div>
    );
  };
};
