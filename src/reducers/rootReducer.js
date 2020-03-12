let initState = { user: null, authed: false };
export default (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.user,
        authed: action.user === null ? false : true
      };
    default:
      return state;
  }
};
