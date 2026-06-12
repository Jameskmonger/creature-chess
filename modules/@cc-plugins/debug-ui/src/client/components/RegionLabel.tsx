import * as React from "react";

/**
 * Outlines a Region with a corner tag - but renders zero in-flow boxes
 * around the host's children. Two `display:none` sentinels bracket the
 * children in the DOM; an effect walks their sibling chain to compute
 * the children's actual bounding box, then renders a `position:fixed`
 * overlay against the viewport with the outline + tag. ResizeObserver
 * + scroll/resize listeners keep it pinned as the page reflows.
 *
 * Why not just wrap in a styled div: any wrapper participates in
 * flexbox / grid / size-container layout and collapses regions like
 * `lobby-player-slot` (CSS container queries break) and `board-surface`
 * (the board's `height:100%` collapses against the wrapper's auto
 * height). `display:contents` would solve layout but breaks position
 * anchoring; the fixed overlay sidesteps both.
 */

const overlayStyle: React.CSSProperties = {
	position: "fixed",
	outline: "1px dashed rgba(255, 196, 0, 0.85)",
	outlineOffset: "-1px",
	boxSizing: "border-box",
	pointerEvents: "none",
	zIndex: 9_999,
};

const tagStyle: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	background: "rgba(255, 196, 0, 0.95)",
	color: "#1a1c2c",
	font: "10px/1 ui-monospace, SFMono-Regular, Menlo, monospace",
	padding: "2px 4px",
	borderRadius: "0 0 3px 0",
	whiteSpace: "nowrap",
	pointerEvents: "auto",
};

const hiddenStyle: React.CSSProperties = { display: "none" };

type Rect = { top: number; left: number; width: number; height: number };

/** Walk the DOM siblings between two sentinels and union their boxes. */
const measureChildren = (
	start: HTMLSpanElement,
	end: HTMLSpanElement
): Rect | null => {
	let top = Infinity;
	let left = Infinity;
	let right = -Infinity;
	let bottom = -Infinity;
	let cur: Node | null = start.nextSibling;
	while (cur && cur !== end) {
		if (cur instanceof Element) {
			const r = cur.getBoundingClientRect();
			if (r.width > 0 || r.height > 0) {
				if (r.top < top) {
					top = r.top;
				}
				if (r.left < left) {
					left = r.left;
				}
				if (r.right > right) {
					right = r.right;
				}
				if (r.bottom > bottom) {
					bottom = r.bottom;
				}
			}
		}
		cur = cur.nextSibling;
	}
	if (top === Infinity) {
		const parent = start.parentElement;
		if (!parent) {
			return null;
		}
		const r = parent.getBoundingClientRect();
		return { top: r.top, left: r.left, width: 90, height: 18 };
	}
	return { top, left, width: right - left, height: bottom - top };
};

const rectsEqual = (a: Rect | null, b: Rect | null): boolean => {
	if (a === b) {
		return true;
	}
	if (!a || !b) {
		return false;
	}
	return (
		a.top === b.top &&
		a.left === b.left &&
		a.width === b.width &&
		a.height === b.height
	);
};

export function RegionLabel({
	cls,
	ctx,
	children,
}: {
	cls: string;
	ctx: unknown;
	children?: React.ReactNode;
}) {
	const startRef = React.useRef<HTMLSpanElement>(null);
	const endRef = React.useRef<HTMLSpanElement>(null);
	const [rect, setRect] = React.useState<Rect | null>(null);
	// Hold last rect by ref so the `update` closure can compare without
	// re-creating itself on every render - which would otherwise rebind
	// the ResizeObserver and infinite-loop.
	const lastRectRef = React.useRef<Rect | null>(null);

	React.useEffect(() => {
		const start = startRef.current;
		const end = endRef.current;
		if (!start || !end) {
			return;
		}

		const update = () => {
			const next = measureChildren(start, end);
			if (rectsEqual(lastRectRef.current, next)) {
				return;
			}
			lastRectRef.current = next;
			setRect(next);
		};
		update();

		const ro = new ResizeObserver(update);
		const parent = start.parentElement;
		if (parent) {
			ro.observe(parent);
			let cur: Node | null = start.nextSibling;
			while (cur && cur !== end) {
				if (cur instanceof Element) {
					ro.observe(cur);
				}
				cur = cur.nextSibling;
			}
		}
		window.addEventListener("scroll", update, true);
		window.addEventListener("resize", update);

		return () => {
			ro.disconnect();
			window.removeEventListener("scroll", update, true);
			window.removeEventListener("resize", update);
		};
	}, []);

	return (
		<>
			<span ref={startRef} style={hiddenStyle} />
			{children}
			<span ref={endRef} style={hiddenStyle} />
			{rect && (
				<div style={{ ...overlayStyle, ...rect }}>
					<span style={tagStyle} title={JSON.stringify(ctx, null, 2)}>
						{cls}
					</span>
				</div>
			)}
		</>
	);
}
