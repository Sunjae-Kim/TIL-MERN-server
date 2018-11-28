const auth = (state=null, action) => {
  console.log(state);
  switch (action.type) {
    case "TYPE":
      return action.payload;
    default:
      return state;
  }
};

export default auth;