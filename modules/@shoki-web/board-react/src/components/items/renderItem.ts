export type BoardItemRenderFn = (
	itemId: string,
	x: number,
	y: number
) => {
	item: React.ReactNode;
	draggable?: boolean;
};
