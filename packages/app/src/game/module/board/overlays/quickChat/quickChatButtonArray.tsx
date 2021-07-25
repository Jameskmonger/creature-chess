import React from "react";
import { QuickChatButton } from "./quickChatButton";
import { QuickChatOption } from "@creature-chess/models";


const QuickChatButtonArray: React.FunctionComponent = () => {
	// to have different options for different overlays etc., pass the Options enum as a parameter to this component
	// and map to array as below.
	const quickChatArray = Object.values(QuickChatOption).map(option => option);
	return (
		<div className="quick-chat-button-container">
			{
				Object.values(quickChatArray).map(chat => (
					<QuickChatButton
						chatOption={chat}
						key={chat}
					/>
				)
				)
			}
		</div>
	);
};


export { QuickChatButtonArray };
