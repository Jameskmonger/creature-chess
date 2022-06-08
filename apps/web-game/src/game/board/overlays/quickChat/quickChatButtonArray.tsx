import React from "react";
import { QuickChatButton } from "./quickChatButton";
import { QuickChatOption } from "@creature-chess/models";
import { Layout } from "@creature-chess/ui";

const QuickChatButtonArray: React.FunctionComponent = () => {
	// to have different options for different overlays etc., pass the Options enum as a parameter to this component
	// and map to array as below.
	const quickChatArray = Object.values(QuickChatOption);
	return (
		<Layout direction="row">
		{
			Object.values(quickChatArray).map(chat => (
				<QuickChatButton
					chatOption={chat}
					key={chat}
				/>
			)
			)
		}
		</Layout>
	);
};


export { QuickChatButtonArray };
