const Qualitie = ({ user, styleWhite }) => {
  return (
    <>
      {user.qualities.length === 1 ? (
        <td>
          <span style={styleWhite} className={"bg-" + user.qualities[0].color}>
            {user.qualities[0].name}
          </span>
        </td>
      ) : (
        <td>
          {user.qualities.map((e) => (
            <span key={e.name} style={styleWhite} className={"bg-" + e.color}>
              {e.name + " "}
            </span>
          ))}
        </td>
      )}
    </>
  );
};

export default Qualitie;
