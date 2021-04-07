import { Constants } from "@creature-chess/models";
import { BoardState } from "../state";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

describe("rotatePiecesAboutCenter", () => {
    test("should rotate grid correctly", () => {
        const input: BoardState = {
            pieces: {
                '0e1341ec-b1ab-4e7e-8473-09852e79c2c1': {
                    id: '0e1341ec-b1ab-4e7e-8473-09852e79c2c1',
                    ownerId: '279314623324226053',
                    definitionId: 12,
                    definition: null,
                    facingAway: false,
                    maxHealth: 16,
                    currentHealth: 16,
                    stage: 0
                },
                'e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48': {
                    id: 'e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48',
                    ownerId: '279314623324226053',
                    definitionId: 1,
                    definition: null,
                    facingAway: false,
                    maxHealth: 22,
                    currentHealth: 22,
                    stage: 0
                },
                'd6572bec-8397-4310-a50f-be2a897ab6a5': {
                    id: 'd6572bec-8397-4310-a50f-be2a897ab6a5',
                    ownerId: '276389458988761607',
                    definitionId: 3,
                    definition: null,
                    facingAway: true,
                    maxHealth: 22,
                    currentHealth: 22,
                    stage: 0
                },
                '8e9d8f8c-8777-452e-a0ec-a06f0e51d592': {
                    id: '8e9d8f8c-8777-452e-a0ec-a06f0e51d592',
                    ownerId: '276389458988761607',
                    definitionId: 5,
                    definition: null,
                    facingAway: true,
                    maxHealth: 22,
                    currentHealth: 22,
                    stage: 0
                }
            },
            piecePositions: {
                '3,4': '0e1341ec-b1ab-4e7e-8473-09852e79c2c1',
                '3,3': 'e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48',
                '3,2': 'd6572bec-8397-4310-a50f-be2a897ab6a5',
                '4,2': '8e9d8f8c-8777-452e-a0ec-a06f0e51d592'
            },
            locked: false,
            pieceLimit: null
        };

        const expected: BoardState = {
            pieces: {
                '0e1341ec-b1ab-4e7e-8473-09852e79c2c1': {
                    id: '0e1341ec-b1ab-4e7e-8473-09852e79c2c1',
                    ownerId: '279314623324226053',
                    definitionId: 12,
                    definition: null,
                    facingAway: true,
                    maxHealth: 16,
                    currentHealth: 16,
                    stage: 0
                },
                'e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48': {
                    id: 'e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48',
                    ownerId: '279314623324226053',
                    definitionId: 1,
                    definition: null,
                    facingAway: true,
                    maxHealth: 22,
                    currentHealth: 22,
                    stage: 0
                },
                'd6572bec-8397-4310-a50f-be2a897ab6a5': {
                    id: 'd6572bec-8397-4310-a50f-be2a897ab6a5',
                    ownerId: '276389458988761607',
                    definitionId: 3,
                    definition: null,
                    facingAway: false,
                    maxHealth: 22,
                    currentHealth: 22,
                    stage: 0
                },
                '8e9d8f8c-8777-452e-a0ec-a06f0e51d592': {
                    id: '8e9d8f8c-8777-452e-a0ec-a06f0e51d592',
                    ownerId: '276389458988761607',
                    definitionId: 5,
                    definition: null,
                    facingAway: false,
                    maxHealth: 22,
                    currentHealth: 22,
                    stage: 0
                }
            },
            piecePositions: {
                '3,1': '0e1341ec-b1ab-4e7e-8473-09852e79c2c1',
                '3,2': 'e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48',
                '3,3': 'd6572bec-8397-4310-a50f-be2a897ab6a5',
                '2,3': '8e9d8f8c-8777-452e-a0ec-a06f0e51d592'
            },
            locked: false,
            pieceLimit: null
        };

        const result = rotatePiecesAboutCenter(Constants.GRID_SIZE, input);

        expect(result).toEqual(expected);
    })
})
