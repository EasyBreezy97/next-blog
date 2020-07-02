const LogOut = ({logoutHandler}) => {
  return (
    <div>
      <button onClick={logoutHandler} className="btn btn-red">
        გასვლა ადმინიდან
      </button>
    </div>
  );
};

export default LogOut;
