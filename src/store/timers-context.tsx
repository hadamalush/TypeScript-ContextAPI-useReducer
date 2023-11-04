import { createContext } from "react";

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

//generic type

const TimersContext = createContext<TimersContextValue | null>(null);
