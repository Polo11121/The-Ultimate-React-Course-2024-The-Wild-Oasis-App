import { ReactNode, createContext, useContext } from "react";
import styled from "styled-components";

export const TableContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableCommonRow = styled.div<{
  columns: string;
}>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const TableHeader = styled(TableCommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const TableRow = styled(TableCommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TableBody = styled.section`
  margin: 0.4rem 0;
`;

const TableFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const TableEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableProps = {
  columns: string;
  children: ReactNode;
};

const TableContext = createContext({
  columns: "",
});

const Table = ({ columns, children }: TableProps) => {
  const value = {
    columns,
  };

  return (
    <TableContext.Provider value={value}>
      <TableContainer role="table">{children}</TableContainer>
    </TableContext.Provider>
  );
};

type ChildrenProps = {
  children: ReactNode;
};

const Header = ({ children }: ChildrenProps) => {
  const { columns } = useContext(TableContext);

  return (
    <TableHeader columns={columns} role="row">
      {children}
    </TableHeader>
  );
};

const Row = ({ children }: ChildrenProps) => {
  const { columns } = useContext(TableContext);

  return (
    <TableRow columns={columns} role="row">
      {children}
    </TableRow>
  );
};

type BodyProps<T> = {
  data?: T[];
  render: (_data: T) => JSX.Element;
};

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (!data?.length) {
    return <TableEmpty>No data</TableEmpty>;
  }

  return <TableBody>{data.map(render)}</TableBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = TableFooter;

export { Table };
