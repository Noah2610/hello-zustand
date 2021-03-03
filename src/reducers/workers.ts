import produce from "immer";

export type WorkersState = {
    isLoading: boolean;
    workers: string[];
};

export type WorkersAction =
    | {
          type: "LOAD_WORKERS_BEGIN";
      }
    | {
          type: "LOAD_WORKERS_SUCCESS";
          workers: string[];
      };

export const workersReducer = (
    baseState: WorkersState,
    action: WorkersAction,
) =>
    produce(baseState, (state) => {
        switch (action.type) {
            case "LOAD_WORKERS_BEGIN":
                state.isLoading = true;
                break;
            case "LOAD_WORKERS_SUCCESS":
                state.isLoading = false;
                state.workers = action.workers;
                break;
        }
    });
