import { useReducer, Reducer, useRef, useEffect } from "react";

/**
 * @hook useReducerWithLogger
 * @description A custom hook that wraps React's `useReducer` and adds detailed logging
 * for debugging and state tracking purposes. Logs the previous state, the dispatched action,
 * and the resulting next state after each dispatch.
 *
 * @template S - The type of the state.
 * @template A - The type of the action.
 *
 * @param {Reducer<S, A>} reducer - The reducer function handling state transitions.
 * @param {S} initialState - The initial state value.
 * @returns {[S, (action: A) => void]} A tuple containing the current state and a dispatch function with logging.
 *
 * @example
 * const reducer = (state: number, action: { type: string }) => {
 *   switch (action.type) {
 *     case "increment":
 *       return state + 1;
 *     default:
 *       return state;
 *   }
 * };
 *
 * const [count, dispatch] = useReducerWithLogger(reducer, 0);
 * dispatch({ type: "increment" });
 */
function useReducerWithLogger<S, A>(reducer: Reducer<S, A>, initialState: S) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const prevStateRef = useRef<S>(state);
    const lastActionRef = useRef<A | null>(null);

    const dispatchWithLogger = (action: A) => {
        console.groupCollapsed("Previous State");
        console.log("%cValue:", "color: #9E9E9E;", prevStateRef.current);
        console.log("%cAction:", "color: #03A9F4;", action);
        lastActionRef.current = action;
        dispatch(action);
        console.groupEnd();
    };

    useEffect(() => {
        if (lastActionRef.current !== null) {
            console.groupCollapsed("Next State (after dispatch)");
            console.log("%cValue:", "color: #4CAF50;", state);
            console.groupEnd();
            prevStateRef.current = state;
            lastActionRef.current = null;
        }
    }, [state]);

    return [state, dispatchWithLogger] as const;
}

export default useReducerWithLogger;
