// constants
const GET_DASHBOARD = "stock/GET_DASHBOARD";
const GET_SECURITY = "stock/GET_SECURITY";
const GET_WATCHLIST = "stock/GET_WATCHLIST";
const ADD_TO_WATCHLIST = "stock/ADD_TO_WATCHLIST";
const DELETE_FROM_WATCHLIST = "stock/DELETE_FROM_WATCHLIST";
const GET_PORTFOLIO = "stock/GET_PORTFOLIO";
const ADD_TO_PORTFOLIO = "stock/ADD_PORTFOLIO";
const DELETE_FROM_PORTFOLIO = "stock/DELETE_FROM_PORTFOLIO";

//thunks
const addStock = (type, payload) => ({
  type,
  payload,
});

const getStock = (type, payload) => ({
  type,
  payload,
});

const deleteStock = (type, payload) => ({
  type,
  payload,
});

export const dashboard = () => async (dispatch) => {
  const response = await fetch("/api/dashboard", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) return;
  dispatch(getStock(GET_DASHBOARD, data));
};

export const getIndividualSecurity = (ticker) => async (dispatch) => {
  const response = await fetch(`/api/securities/${ticker}`);
  const data = await response.json();
  if (data.errors) return;
  dispatch(getStock(GET_SECURITY, data));
  return data
};

export const getWatchlist = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/watchlist`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const data = await response.json();
  if (data.errors) return;
  dispatch(getStock(GET_WATCHLIST, data));
  return data
};

export const addToWatchList = (userId, ticker) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/watchlist/${ticker}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) return;
  dispatch(addStock(ADD_TO_WATCHLIST, data));
};

export const deleteFromWatchList = (userId, ticker) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/watchlist/${ticker}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) return;
  dispatch(deleteStock(DELETE_FROM_WATCHLIST, data));
};

export const getPortfolio = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/portfolio`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) return;
  dispatch(getStock(GET_PORTFOLIO, data));
};

export const addToPortfolio = (userId, ticker) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/portfolio/${ticker}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) return;
  dispatch(addStock(ADD_TO_PORTFOLIO, data));
};

export const deleteFromPortfolio = (userId, ticker) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/portfolio/${ticker}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) return;
  dispatch(deleteStock(DELETE_FROM_PORTFOLIO, data));
};

const initialState = { stock: null };

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_DASHBOARD:
      console.log(action.payload);
      newState = Object.assign({}, state);
      newState.dashboard = action.payload;
      return newState;
    case GET_SECURITY:
      newState = Object.assign({}, state);
      newState.security = action.payload;
      return newState;
    case GET_WATCHLIST:
      newState = Object.assign({}, state);
      newState.watchlist = action.payload;
      return newState;
    case ADD_TO_WATCHLIST:
      newState = Object.assign({}, state);
      newState.addedWatchlist = action.payload;
      return newState;
    case DELETE_FROM_WATCHLIST:
      newState = Object.assign({}, state);
      newState.deleteWatchlist = action.payload;
      return newState;
    case GET_PORTFOLIO:
      newState = Object.assign({}, state);
      newState.portfolio = action.payload;
      return newState;
    case ADD_TO_PORTFOLIO:
      newState = Object.assign({}, state);
      newState.addedPortfolio = action.payload;
      return newState;
    case DELETE_FROM_PORTFOLIO:
      newState = Object.assign({}, state);
      newState.deleteFromPortfolio = action.payload;
      return newState;
    default:
      return state;
  }
}
// const GET_DASHBOARD = "stock/GET_DASHBOARD";
// const GET_SECURITY = "stock/GET_SECURITY";
// const GET_WATCHLIST = "stock/GET_WATCHLIST";
// const ADD_TO_WATCHLIST = "stock/ADD_TO_WATCHLIST";
// const DELETE_FROM_WATCHLIST = "stock/DELETE_FROM_WATCHLIST";
// const GET_PORTFOLIO = "stock/GET_PORTFOLIO";
// const ADD_TO_PORTFOLIO = "stock/ADD_PORTFOLIO";
// const DELETE_FROM_PORTFOLIO = "stock/DELETE_FROM_PORTFOLIO";
