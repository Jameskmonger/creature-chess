import * as React from "react";

type DropSurface = {
	el: HTMLElement;
	width: number;
	height: number;
	onDrop: (id: string, x: number, y: number) => void;
	canDrop: (id: string, x: number, y: number) => boolean;
};

type PieceDragContextValue = {
	register: (surface: DropSurface) => () => void;
	drop: (id: string, clientX: number, clientY: number) => boolean;
};

const PieceDragContext = React.createContext<PieceDragContextValue | null>(
	null
);

export function PieceDragContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const surfaces = React.useRef<Set<DropSurface>>(new Set());

	const value = React.useMemo<PieceDragContextValue>(
		() => ({
			register: (surface) => {
				surfaces.current.add(surface);
				return () => {
					surfaces.current.delete(surface);
				};
			},
			drop: (id, clientX, clientY) => {
				for (const surface of surfaces.current) {
					const rect = surface.el.getBoundingClientRect();
					if (
						clientX < rect.left ||
						clientX >= rect.right ||
						clientY < rect.top ||
						clientY >= rect.bottom
					) {
						continue;
					}

					const x = Math.floor(
						((clientX - rect.left) / rect.width) * surface.width
					);
					const y = Math.floor(
						((clientY - rect.top) / rect.height) * surface.height
					);

					if (!surface.canDrop(id, x, y)) {
						return false;
					}

					surface.onDrop(id, x, y);
					return true;
				}
				return false;
			},
		}),
		[]
	);

	return (
		<PieceDragContext.Provider value={value}>
			{children}
		</PieceDragContext.Provider>
	);
}

const NOOP_CONTEXT: PieceDragContextValue = {
	register: () => () => undefined,
	drop: () => false,
};

function usePieceDragContext(): PieceDragContextValue {
	return React.useContext(PieceDragContext) ?? NOOP_CONTEXT;
}

const DRAG_THRESHOLD_PX = 4;

/**
 * Attach the returned handlers to a draggable piece element.
 * Uses pointer capture so move/up events always fire on the source element.
 * A "drag" only begins after the pointer has moved past a small threshold,
 * so small movements still fire the element's native click.
 */
export function useDragPiece(id: string) {
	const { drop } = usePieceDragContext();

	const state = React.useRef<{
		pointerId: number;
		startX: number;
		startY: number;
		dragging: boolean;
	} | null>(null);

	const onPointerDown = React.useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			if (e.pointerType === "mouse" && e.button !== 0) {
				return;
			}
			state.current = {
				pointerId: e.pointerId,
				startX: e.clientX,
				startY: e.clientY,
				dragging: false,
			};
			// NOTE: do not capture here — capture redirects the synthetic
			// `click` event to this element, which breaks click-to-select on
			// child elements. Capture is acquired once a drag actually starts.
		},
		[]
	);

	const onPointerMove = React.useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			if (!state.current || state.current.dragging) {
				return;
			}
			const dx = e.clientX - state.current.startX;
			const dy = e.clientY - state.current.startY;
			if (dx * dx + dy * dy > DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) {
				state.current.dragging = true;
				// capture now so pointermove/up keep firing on this element
				// even when the pointer leaves the piece
				try {
					e.currentTarget.setPointerCapture(state.current.pointerId);
				} catch {
					// ignore
				}
			}
		},
		[]
	);

	const onPointerUp = React.useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			const s = state.current;
			state.current = null;

			try {
				e.currentTarget.releasePointerCapture(e.pointerId);
			} catch {
				// ignore
			}

			if (!s || !s.dragging) {
				return;
			}

			drop(id, e.clientX, e.clientY);
			// suppress the synthetic click that would otherwise fire after pointerup
			suppressNextClick();
		},
		[id, drop]
	);

	const onPointerCancel = React.useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			state.current = null;
			try {
				e.currentTarget.releasePointerCapture(e.pointerId);
			} catch {
				// ignore
			}
		},
		[]
	);

	return React.useMemo(
		() => ({ onPointerDown, onPointerMove, onPointerUp, onPointerCancel }),
		[
			onPointerDown,
			onPointerMove,
			onPointerUp,
			onPointerCancel,
		]
	);
}

function suppressNextClick() {
	const handler = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		cleanup();
	};
	const cleanup = () => {
		window.removeEventListener("click", handler, true);
		window.clearTimeout(timeout);
	};
	const timeout = window.setTimeout(cleanup, 100);
	window.addEventListener("click", handler, true);
}

/**
 * Register an element as a drop surface. The surface is treated as a
 * `width * height` grid; the target tile is computed from the pointer
 * position relative to the element's bounding rect.
 */
export function useDropSurface(
	ref: React.RefObject<HTMLElement>,
	width: number,
	height: number,
	onDrop: (id: string, x: number, y: number) => void,
	canDrop: (id: string, x: number, y: number) => boolean
) {
	const { register } = usePieceDragContext();

	// keep latest callbacks without re-registering
	const latest = React.useRef({ onDrop, canDrop, width, height });
	latest.current = { onDrop, canDrop, width, height };

	React.useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		return register({
			el,
			get width() {
				return latest.current.width;
			},
			get height() {
				return latest.current.height;
			},
			onDrop: (id, x, y) => latest.current.onDrop(id, x, y),
			canDrop: (id, x, y) => latest.current.canDrop(id, x, y),
		});
	}, [ref, register]);
}
