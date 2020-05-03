import { PieceModel } from "../models";

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

export const getTotalHealthByTeam = (pieces: PieceModel[]) => {
    const grouped = groupBy(pieces, p => p.ownerId);

    return grouped.map(([ key, values ]) => {
        return {
            ownerId: key,
            totalHealth: values.reduce((acc, cur) => acc + cur.currentHealth, 0)
        };
    });
};
