import { createContext, useContext, type ReactNode, useReducer } from "react";

//types for Timer
export type Timer = {
	name: string;
	duration: number;
};

//types for TimerState
type TimersState = {
	isRunning: boolean;
	timers: Timer[];
};

const initialState: TimersState = {
	isRunning: true,
	timers: [],
};

//types merge with function. This object will manipulate whis this methods
type TimersContextValue = TimersState & {
	addTimer: (timerData: Timer) => void;
	startTimers: () => void;
	stopTimers: () => void;
};

//generic type // export to allow access elsewhere in the application

const TimersContext = createContext<TimersContextValue | null>(null);

export const useTimersContext = () => {
	const timersCtx = useContext(TimersContext);

	if (timersCtx === null) {
		throw new Error("TimersContext is null - that should not be the case!");
	}

	return timersCtx;
};

//defining type for Provider
type TimersContextProviderProps = {
	children: ReactNode;
};

type StartTimersAction = {
	type: "START_TIMERS";
};

type StopTimersAction = {
	type: "STOP_TIMERS";
};

type AddTimerAction = {
	type: "ADD_TIMER";
	payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

// We create below above actions to blocked the access payload for other actions
// type Action = {
// 	type: "ADD_TIMER" | "START_TIMER" | "STOP_TIMER";
// 	payload?: Timer;
// };

function timersReducer(state: TimersState, action: Action): TimersState {
	if (action.type === "START_TIMERS") {
		// state.isRunning = true  - not do this! Always create a new state
		return {
			...state,
			isRunning: true,
		};
	}
	if (action.type === "STOP_TIMERS") {
		return {
			...state,
			isRunning: false,
		};
	}
	if (action.type === "ADD_TIMER") {
		return {
			...state,
			timers: [
				...state.timers,
				{ name: action.payload.name, duration: action.payload.duration },
			],
		};
	}

	return state;
}

const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
	const [timersState, dispatch] = useReducer(timersReducer, initialState);

	const ctx: TimersContextValue = {
		timers: timersState.timers,
		isRunning: timersState.isRunning,

		addTimer(timerData) {
			dispatch({ type: "ADD_TIMER", payload: timerData });
		},
		startTimers() {
			dispatch({ type: "START_TIMERS" });
		},
		stopTimers() {
			dispatch({ type: "STOP_TIMERS" });
		},
	};

	return (
		<TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
	);
};

export default TimersContextProvider;
