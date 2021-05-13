import * as React from "react";
import { Segment } from "./segment";

const Loading: React.FunctionComponent = () => {
	const [demoOpen, setDemoOpen] = React.useState<boolean>(false);
	const onDemoClick = () => setDemoOpen(!demoOpen);

	return (
		<div className="loading-full">
			<h1>Loading...</h1>

			<p>This can sometimes take up to 30 secs (sorry! I'm using cheap and free servers)</p>

			<Segment
				header="Why not watch a demo video while you wait?"
				open={demoOpen}
				onHeaderClick={onDemoClick}
			>
				<div className="video-container">
					<video controls autoPlay className="video">
						<source src="https://i.imgur.com/EAwP0Qm.mp4" type="video/mp4" />
						Your browser does not support videos.
					</video>
				</div>
			</Segment>
		</div>
	);
};

export { Loading };
