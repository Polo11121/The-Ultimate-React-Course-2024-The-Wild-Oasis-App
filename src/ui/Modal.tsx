import { useClickOutside } from "@/hooks";
import {
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext({
  close: () => {},
  open: (_name: string) => {},
  openModalName: "",
});

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const [openModalName, setOpenModalName] = useState("");

  const closeModalHandler = () => setOpenModalName("");

  const openModalHandler = (name: string) => setOpenModalName(name);

  const value = {
    close: closeModalHandler,
    open: openModalHandler,
    openModalName,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

type OpenProps = {
  children: JSX.Element;
  opens: string;
};

const Open = ({ children, opens }: OpenProps) => {
  const { open } = useContext(ModalContext);

  const openModalHandler = () => open(opens);

  return cloneElement(children, { onClick: openModalHandler });
};

type WindowProps = {
  children: JSX.Element;
  name: string;
};

const Window = ({ children, name }: WindowProps) => {
  const { close, openModalName } = useContext(ModalContext);
  const ref = useClickOutside(close);

  if (openModalName !== name) {
    return null;
  }

  return createPortal(
    <ModalOverlay>
      <ModalContainer ref={ref}>
        <ModalButton onClick={close}>
          <HiXMark />
        </ModalButton>
        <div>{cloneElement(children, { onClose: close })}</div>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export { Modal };
