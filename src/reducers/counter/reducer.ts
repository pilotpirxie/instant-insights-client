import produce from "immer";

import { CounterActionType, Increment } from "./actions";

export type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0,
};

export type Action = Increment;

export default function reducer(
  state: CounterState = initialState,
  action: Action
): CounterState {
  return produce(state, (newState) => {
    switch (action.type) {
      case CounterActionType.Increment:
        newState.counter = state.counter + action.payload.by;
        break;
      default:
        return state;
    }
  });
}
