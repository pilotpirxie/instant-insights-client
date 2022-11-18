export enum ConfigActionType {
  Set = "CONFIG/SET",
}

export type Increment = {
  type: ConfigActionType.Set;
  payload: {
    newValue: string;
  };
};
