import produce from "immer";

export type UserState = {
    isLoading: boolean;
    isLoggedIn: boolean;
    name?: string;
    error?: string;
};

export type UserAction =
    | {
          type: "LOGIN_BEGIN";
      }
    | {
          type: "LOGIN_SUCCESS";
          name: string;
      }
    | {
          type: "LOGIN_FAIL";
          error: string;
      }
    | {
          type: "LOGOUT_BEGIN";
      }
    | {
          type: "LOGOUT_SUCCESS";
      }
    | {
          type: "LOGOUT_FAIL";
          error: string;
      };

export const userReducer = (
    baseState: UserState,
    action: UserAction,
): UserState =>
    produce(baseState, (state) => {
        switch (action.type) {
            case "LOGIN_BEGIN":
                state.isLoading = true;
                state.isLoggedIn = false;
                state.error = undefined;
                break;
            case "LOGIN_SUCCESS":
                state.isLoading = false;
                state.isLoggedIn = true;
                state.name = action.name;
                state.error = undefined;
                break;
            case "LOGIN_FAIL":
                state.isLoading = false;
                state.error = action.error;
                break;
            case "LOGOUT_BEGIN":
                state.isLoading = true;
                state.error = undefined;
                break;
            case "LOGOUT_SUCCESS":
                state.isLoading = false;
                state.isLoggedIn = false;
                state.name = undefined;
                state.error = undefined;
                break;
            case "LOGOUT_FAIL":
                state.isLoading = false;
                state.error = action.error;
                break;
        }
    });
