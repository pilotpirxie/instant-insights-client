import {
  ConfigActionType,
  Increment,
} from './actions';
import produce from "immer";

export type ConfigState = {
  value: string;
};

const initialState: ConfigState = {
  value: ''
};

export type Action = Increment;

export default function reducer(
  state: ConfigState = initialState,
  action: Action,
): ConfigState {
  switch (action.type) {
    case ConfigActionType.Set:
      return produce(state, newState => {
        newState.value = action.payload.newValue;
      });
    default:
      return state;
  }
}