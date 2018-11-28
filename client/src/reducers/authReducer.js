const auth = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "TYPE":
      return state;
    default:
      return action;
  }
};

export default auth;
