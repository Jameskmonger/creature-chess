import { HasId } from "@shoki/board";

export type BoardItemRenderFn = (item: HasId, x: number, y: number) => ({
	item: React.ReactNode,
	draggable?: boolean
});
