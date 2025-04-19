import React from "react";

import { QuickChatOption } from "@creature-chess/models";

import { Layout } from "@cc-web/ui";

import { QuickChatButton } from "./quickChatButton";

const QuickChatButtonArray: React.FunctionComponent = () => {
	// to have different options for different overlays etc., pass the Options enum as a parameter to this component
	// and map to array as below.
	const quickChatArray = Object.values(QuickChatOption);
	return (
		<Layout direction="row">
			{quickChatArray.map((chat) => (
				<QuickChatButton chatOption={chat} key={chat} />
			))}
		</Layout>
	);
};

export { QuickChatButtonArray };
