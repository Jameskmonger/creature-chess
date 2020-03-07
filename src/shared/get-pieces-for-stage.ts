export const getPiecesForStage = (stage: number) => {
    if (stage === 0) {
        return 1;
    }

    if (stage === 1) {
        return 3;
    }

    if (stage === 2) {
        return 9;
    }

    // shouldnt occur
    return 0;
};
