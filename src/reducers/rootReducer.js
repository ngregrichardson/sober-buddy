// The initial Redux state
let initState = { user: null, authed: false };

/**
 * The Redux reducer to handle updating the global state
 */
export default (state = initState, action) => {
  // Check the type of action
  switch (action.type) {
    // If updating the user
    case "UPDATE_USER":
      // Return the current state, but change the user and authed state
      return {
        ...state,
        user: action.user,
        authed: action.user === null ? false : true
      };
    // Return the current state by default
    default:
      return state;
  }
};
