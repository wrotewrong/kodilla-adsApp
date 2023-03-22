/* SELECTORS */

export const getUser = ({ user }) => user.login;

/* ACTIONS */
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

/* ACTION CREATORS */
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});

/* THUNKS */

/* INITIAL STATE */

const initialState = {
  user: null,
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return { user: null };
    default:
      return statePart;
  }
}
