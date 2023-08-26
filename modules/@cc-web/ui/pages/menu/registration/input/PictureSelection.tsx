import React from "react";

import { createUseStyles } from "react-jss";

import { AVAILABLE_PROFILE_PICTURES } from "@creature-chess/models";

import { CreatureImage } from "../../../../src/display/creatureImage";
import { BaseRegistrationInput } from "./BaseRegistrationInput";

const useStyles = createUseStyles({
	pictureList: {
		display: "inline-block",
	},
});

const PictureSelection: React.FunctionComponent<{
	currentImage: number;
	onChange: (picture: number) => void;
}> = ({ currentImage, onChange }) => {
	const styles = useStyles();

	return (
		<BaseRegistrationInput
			heading="Profile Picture"
			info="Choose a profile picture - more can be unlocked!"
		>
			{Object.entries(AVAILABLE_PROFILE_PICTURES).map(
				([pictureString, creatureName]) => {
					const picture = parseInt(pictureString, 10);
					const onSelect = () => onChange(picture);

					return (
						<div className={styles.pictureList} key={picture}>
							<CreatureImage definitionId={picture} />
							<p>{creatureName}</p>
							<input
								type="radio"
								value={picture}
								checked={currentImage === picture}
								onChange={onSelect}
							/>
						</div>
					);
				}
			)}
		</BaseRegistrationInput>
	);
};

export { PictureSelection };
