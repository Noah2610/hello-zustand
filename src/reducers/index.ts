import produce from "immer";
import { Action, State } from "../store";
import { userReducer, UserAction } from "./user";
import { workersReducer, WorkersAction } from "./workers";

export { UserAction, WorkersAction };
export { UserState } from "./user";
export { WorkersState } from "./workers";

export const reducer = (baseState: State, action: Action): State =>
    produce(baseState, (state) => {
        state.user = userReducer(state.user, action as UserAction);
        state.workers = workersReducer(state.workers, action as WorkersAction);
    });
