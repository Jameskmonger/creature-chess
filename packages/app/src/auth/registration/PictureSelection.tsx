import React from "react"
import { AVAILABLE_PROFILE_PICTURES } from "@creature-chess/models"

const PictureSelection: React.FunctionComponent<{
    currentImage: number,
    handleImageChange: (picture: number) => void
    }> = ({ currentImage, handleImageChange }) => {

    return (
        <div className = "picture-selection">

            <h1 className = "section-heading">Profile Picture</h1>
            <h2 className="picture-selection-heading">Choose a profile picture - more can be unlocked!</h2>
            <form>
                    {
                        Object.entries(AVAILABLE_PROFILE_PICTURES).map(([pictureString, creatureName])=>{
                            const picture = Number(pictureString)
                            return(
                                <div className="available-pictures" key = {picture}>
                                    <img
                                        className="picture-selector-element"
                                        src={`https://creaturechess.jamesmonger.com/images/front/${picture}.png`}
                                        alt={creatureName}
                                    />
                                    <p>{creatureName}</p>
                                    <input
                                        className="picture-selector-element"
                                        type="radio"
                                        value={picture}
                                        checked={currentImage === picture}
                                        onChange={() => handleImageChange(picture)}
                                    />
                                </div>
                            )
                        })
                    }
            </form>
        </div>
    )
}
export default PictureSelection
