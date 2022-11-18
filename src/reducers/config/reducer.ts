import produce from "immer";
import { ConfigActionType, Increment } from "./actions";

export type ConfigState = {
  value: string;
};

const initialState: ConfigState = {
  value: "",
};

export type Action = Increment;

export default function reducer(
  state: ConfigState = initialState,
  action: Action
): ConfigState {
  return produce(state, (newState) => {
    switch (action.type) {
      case ConfigActionType.Set:
        newState.value = action.payload.newValue;
        break;
      default:
        return state;
    }
  });
}
