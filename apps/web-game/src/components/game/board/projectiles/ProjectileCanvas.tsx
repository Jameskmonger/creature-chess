import React from "react";

import { SubscribableBoard } from "@creature-chess/board";

import { ProjectileEvent } from "../piece/match/animationEventStore";
import { useGameSession } from "~/game/sessionContext";

const PROJECTILE_DURATION_MS = 200;
const FILL_COLOR = "#F5E687";
const STROKE_COLOR = "#FAD17D";
const STROKE_WIDTH = 2;

type ActiveProjectile = {
	startX: number;
	startY: number;
	startTime: number;
} & (
	| {
			type: "piece";
			targetPieceId: string;
			lastTargetX: number;
			lastTargetY: number;
	  }
	| { type: "location"; targetX: number; targetY: number }
);

function resolveTargetPosition(
	projectile: ActiveProjectile,
	matchBoard: SubscribableBoard
): [number, number] {
	if (projectile.type === "location") {
		return [projectile.targetX, projectile.targetY];
	}

	const pos = matchBoard.getPiecePosition(projectile.targetPieceId);
	if (pos) {
		projectile.lastTargetX = pos[0];
		projectile.lastTargetY = pos[1];
		return pos;
	}

	return [projectile.lastTargetX, projectile.lastTargetY];
}

function createActiveProjectile(
	event: ProjectileEvent,
	matchBoard: SubscribableBoard,
	now: number
): ActiveProjectile | null {
	const sourcePos = matchBoard.getPiecePosition(event.sourceId);
	if (!sourcePos) {
		return null;
	}

	if (event.type === "piece") {
		const targetPos = matchBoard.getPiecePosition(event.targetPieceId);
		return {
			type: "piece",
			startX: sourcePos[0],
			startY: sourcePos[1],
			targetPieceId: event.targetPieceId,
			lastTargetX: targetPos ? targetPos[0] : sourcePos[0],
			lastTargetY: targetPos ? targetPos[1] : sourcePos[1],
			startTime: now,
		};
	}

	return {
		type: "location",
		startX: sourcePos[0],
		startY: sourcePos[1],
		targetX: event.x,
		targetY: event.y,
		startTime: now,
	};
}

function renderProjectiles(
	ctx: CanvasRenderingContext2D,
	clientWidth: number,
	clientHeight: number,
	projectiles: ActiveProjectile[],
	matchBoard: SubscribableBoard,
	now: number
): ActiveProjectile[] {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	const remaining: ActiveProjectile[] = [];
	const tileWidth = clientWidth / matchBoard.width;
	const radius = Math.max(3, tileWidth * 0.08);

	for (const p of projectiles) {
		const elapsed = now - p.startTime;
		if (elapsed >= PROJECTILE_DURATION_MS) {
			continue;
		}

		const progress = elapsed / PROJECTILE_DURATION_MS;
		const [targetX, targetY] = resolveTargetPosition(p, matchBoard);

		const cx =
			((p.startX + 0.5 + (targetX - p.startX) * progress) / matchBoard.width) *
			clientWidth;
		const cy =
			((p.startY + 0.5 + (targetY - p.startY) * progress) / matchBoard.height) *
			clientHeight;

		ctx.beginPath();
		ctx.arc(cx, cy, radius, 0, Math.PI * 2);
		ctx.fillStyle = FILL_COLOR;
		ctx.fill();
		ctx.strokeStyle = STROKE_COLOR;
		ctx.lineWidth = STROKE_WIDTH;
		ctx.stroke();

		remaining.push(p);
	}

	return remaining;
}

export function ProjectileCanvas() {
	const { battle } = useGameSession();
	const { board: matchBoard, animationEventStore } = battle;
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const projectilesRef = React.useRef<ActiveProjectile[]>([]);
	const rafRef = React.useRef<number | null>(null);

	const startLoop = React.useCallback(() => {
		if (rafRef.current !== null) {
			return;
		}

		const loop = () => {
			const canvas = canvasRef.current;
			if (!canvas) {
				rafRef.current = null;
				return;
			}

			const ctx = canvas.getContext("2d");
			if (!ctx) {
				rafRef.current = null;
				return;
			}

			const dpr = window.devicePixelRatio || 1;
			const clientWidth = canvas.clientWidth;
			const clientHeight = canvas.clientHeight;

			if (
				canvas.width !== clientWidth * dpr ||
				canvas.height !== clientHeight * dpr
			) {
				canvas.width = clientWidth * dpr;
				canvas.height = clientHeight * dpr;
				ctx.scale(dpr, dpr);
			}

			projectilesRef.current = renderProjectiles(
				ctx,
				clientWidth,
				clientHeight,
				projectilesRef.current,
				matchBoard,
				performance.now()
			);

			if (projectilesRef.current.length > 0) {
				rafRef.current = requestAnimationFrame(loop);
			} else {
				rafRef.current = null;
			}
		};

		rafRef.current = requestAnimationFrame(loop);
	}, [matchBoard]);

	React.useEffect(() => {
		const unsubscribe = animationEventStore.subscribe(() => {
			const events = animationEventStore.consumeProjectileEvents();
			if (events.length === 0) {
				return;
			}

			const now = performance.now();
			for (const event of events) {
				const active = createActiveProjectile(event, matchBoard, now);
				if (active) {
					projectilesRef.current.push(active);
				}
			}

			startLoop();
		});

		return () => {
			unsubscribe();
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			projectilesRef.current = [];
		};
	}, [animationEventStore, matchBoard, startLoop]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
				zIndex: 100,
			}}
		/>
	);
}
