import { PieceModel } from "@creature-chess/models";
import { BoardSelectors, BoardState } from "@creature-chess/board";

const groupBy = <TItem, TKey>(list: TItem[], keyGetter: (item: TItem) => TKey) => {
    const map = new Map<TKey, TItem[]>();

    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });

    return Array.from(map);
};

export const getTotalHealthByTeam = (board: BoardState<PieceModel>) => {
    const piecesList = BoardSelectors.getAllPieces(board);
    const grouped = groupBy(piecesList, p => p.ownerId);

    return grouped.map(([ key, values ]) => {
        return {
            ownerId: key,
            totalHealth: values.reduce((acc, cur) => acc + cur.currentHealth, 0)
        };
    });
};
