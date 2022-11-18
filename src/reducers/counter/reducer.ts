import {
  CounterActionType,
  Increment,
} from './actions';

export type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0
};

export type Action = Increment;

export default function reducer(
  state: CounterState = initialState,
  action: Action,
): CounterState {
  switch (action.type) {
    case CounterActionType.Increment:
      return {
        ...state,
        counter: state.counter + action.payload.by
      };
    default:
      return state;
  }
}