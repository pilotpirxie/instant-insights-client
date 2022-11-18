import React from 'react'
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {CounterActionType} from "../../reducers/counter/actions";
import {ConfigActionType} from "../../reducers/config/actions";

export default function App() {
  const counter = useAppSelector(state => state.counter);
  const config = useAppSelector(state => state.config);
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch({
            type: CounterActionType.Increment,
            payload: {
              by: 3
            }}
          )}
        >
          ab
        </button>
        <button
          onClick={() => dispatch({
            type: ConfigActionType.Set,
            payload: {
              newValue: 'test'
            }}
          )}
        >
          cd
        </button>
        <span>{counter.counter}</span>
        <span>{config.value}</span>
      </div>
    </div>
  )
}