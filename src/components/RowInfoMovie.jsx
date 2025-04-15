export const RowInfoMovie = ({nameRow, info}) => {
  return (
    <div className="row-info">
      <div className="row-info-child-1">{nameRow}</div>
      <div className="row-info-child-2">{info}</div>
    </div>
  );
};
