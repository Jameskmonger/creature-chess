export type BoardItemRenderFn = (id: string, x: number, y: number) => ({
	item: React.ReactNode,
	draggable?: boolean
});
