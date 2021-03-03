import createStore, { UseStore } from "zustand";
import { redux } from "zustand/middleware";
import {
  reducer,
  UserAction,
  UserState,
  WorkersAction,
  WorkersState
} from "./reducers";
import { runOneOf } from "./util";

export type Action = UserAction | WorkersAction;

export type Dispatch = (action: Action) => Action;

export type State = {
  user: UserState;
  workers: WorkersState;
};

const initialState: State = {
  user: {
    isLoading: false,
    isLoggedIn: false
  },
  workers: {
    isLoading: false,
    workers: []
  }
};

export const api = {
  login: (dispatch: Dispatch) => (name: string) => {
    dispatch({
      type: "LOGIN_BEGIN"
    });
    setTimeout(() => {
      const success = () =>
        dispatch({
          type: "LOGIN_SUCCESS",
          name
        });
      const failure = () =>
        dispatch({
          type: "LOGIN_FAIL",
          error: `Failed to login with username '${name}'`
        });
      runOneOf(success, success, failure);
    }, 500);
  },

  logout: (dispatch: Dispatch) => () => {
    dispatch({
      type: "LOGOUT_BEGIN"
    });
    setTimeout(() => {
      const success = () =>
        dispatch({
          type: "LOGOUT_SUCCESS"
        });
      const failure = () =>
        dispatch({
          type: "LOGOUT_FAIL",
          error: "Failed to log out!"
        });
      runOneOf(success, success, failure);
    }, 500);
  }
};

export const useStore: UseStore<State> & { dispatch?: Dispatch } = createStore<
  State & { dispatch?: Dispatch }
>(redux<State, Action>(reducer, initialState));
