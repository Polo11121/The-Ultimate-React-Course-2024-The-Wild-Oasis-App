import {
  ReactNode,
  createContext,
  useState,
  useContext,
  MouseEvent,
} from "react";
import { useClickOutside } from "@/hooks";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const MenuList = styled.ul<{
  position: {
    x: number;
    y: number;
  };
}>`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const MenuButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext({
  close: () => {},
  open: (_id: number) => {},
  openId: null as null | number,
  position: {
    x: 0,
    y: 0,
  },

  changePosition: (_position: { x: number; y: number }) => {},
});

type ChildrenProps = {
  children: ReactNode;
};

const Menus = ({ children }: ChildrenProps) => {
  const [openId, setOpenId] = useState<null | number>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const close = () => setOpenId(null);
  const open = (id: number) => setOpenId(id);
  const changePosition = ({ x, y }: { x: number; y: number }) =>
    setPosition({ x, y });

  const value = {
    close,
    open,
    openId,
    position,
    changePosition,
  };

  return (
    <MenusContext.Provider value={value}>{children}</MenusContext.Provider>
  );
};

type IdProps = {
  id: number;
};

export const Menu = ({ children }: ChildrenProps) => (
  <MenuContainer>{children}</MenuContainer>
);

export const Toggle = ({ id }: IdProps) => {
  const { open, openId, close, changePosition } = useContext(MenusContext);

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const targetButton = event.target as HTMLElement;
    const button = targetButton.closest("button");

    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();

    changePosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId !== id || !openId) {
      open(id);
    } else {
      close();
    }
  };

  return (
    <MenuToggle onClick={clickHandler}>
      <HiEllipsisVertical />
    </MenuToggle>
  );
};

export const List = ({ id, children }: IdProps & ChildrenProps) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useClickOutside(close);

  if (openId !== id) {
    return null;
  }

  return createPortal(
    <MenuList ref={ref} position={position}>
      {children}
    </MenuList>,
    document.body
  );
};

type ButtonProps = {
  icon?: ReactNode;
  onClick?: () => void;
} & ChildrenProps;

export const Button = ({ icon, onClick, children }: ButtonProps) => {
  const { close } = useContext(MenusContext);

  const clickHandler = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <MenuButton onClick={clickHandler}>
        {icon}
        <span>{children}</span>
      </MenuButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export { Menus };
