import Button from "./UI/Button.tsx";
import { useTimersContext } from "../store/timers-context.tsx";

export default function Header() {
	//exclamation mark means that the context should never be null
	const timersCtx = useTimersContext();

	return (
		<header>
			<h1>ReactTimer</h1>

			<Button>{timersCtx.isRunning ? "Stop Timers" : "Start Timers"}</Button>
		</header>
	);
}
