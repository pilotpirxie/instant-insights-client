export enum CounterActionType {
  Increment = "COUNTER/INCREMENT",
}

export type Increment = {
  type: CounterActionType.Increment;
  payload: {
    by: number;
  };
};
