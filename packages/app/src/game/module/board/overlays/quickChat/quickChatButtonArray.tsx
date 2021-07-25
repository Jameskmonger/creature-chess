import React from "react";
import { QuickChatButton } from "./quickChatButton";
import { QuickChatOption } from "@creature-chess/models";


const QuickChatButtonArray: React.FunctionComponent<{ chatOptions: QuickChatOption[] }> = ({ chatOptions }) => (
	<div className="quick-chat-button-container">
		{
			chatOptions.map(chat => (
				<QuickChatButton
					chatOption={chat}
					key={chat}
				/>
			)
			)
		}
	</div>
);


export { QuickChatButtonArray };
