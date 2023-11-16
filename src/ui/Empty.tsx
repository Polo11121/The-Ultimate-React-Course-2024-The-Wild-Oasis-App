type EmptyProps = {
  resource: string;
};

export const Empty = ({ resource }: EmptyProps) => (
  <p>No {resource} could be found.</p>
);
