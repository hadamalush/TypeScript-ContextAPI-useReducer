import { useTimersContext } from "../store/timers-context";
import Timer from "./Timer";

export default function Timers() {
	const { timers } = useTimersContext();

	return (
		<ul>
			{timers.map((timer, index) => {
				return (
					<li key={index}>
						<Timer {...timer} />
					</li>
				);
			})}
		</ul>
	);
}
