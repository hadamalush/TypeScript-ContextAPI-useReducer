import { createContext, useContext, type ReactNode } from "react";

//types for Timer
type Timer = {
	name: string;
	duration: number;
};

//types for TimerState
type TimersState = {
	isRunning: boolean;
	timers: Timer[];
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
const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
	const ctx: TimersContextValue = {
		timers: [],
		isRunning: false,
		addTimer(timerData) {
			//..
		},
		startTimers() {
			//..
		},
		stopTimers() {
			//..
		},
	};

	return (
		<TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
	);
};

export default TimersContextProvider;
