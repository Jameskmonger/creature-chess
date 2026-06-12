import * as React from "react";

import { RegionContexts, RegionDescriptor } from "@cc-plugins/api";

import { pluginRegistry } from "./registry";
import { composeRegion, regionRouter } from "./regionRouter";

const RegionPathContext = React.createContext<string>("");

class RegionBoundary extends React.Component<
	{
		regionId: string;
		resetKey: unknown;
		fallback: React.ReactNode;
		children: React.ReactNode;
	},
	{ failed: boolean; resetKey: unknown }
> {
	public state = { failed: false, resetKey: this.props.resetKey };

	public static getDerivedStateFromError() {
		return { failed: true };
	}

	public static getDerivedStateFromProps(
		props: { resetKey: unknown },
		state: { failed: boolean; resetKey: unknown }
	) {
		if (props.resetKey !== state.resetKey) {
			return { failed: false, resetKey: props.resetKey };
		}
		return null;
	}

	public componentDidCatch(error: unknown) {
		// eslint-disable-next-line no-console
		console.error(
			`[plugin-ui] an op on region "${this.props.regionId}" threw; using core default`,
			error
		);
	}

	public render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
}

const subscribeRegistry = (fn: () => void) => pluginRegistry.onChange(fn);
const getRegistryVersion = () => pluginRegistry.version();

/** A plugin-extensible UI region. */
export function Region<C extends keyof RegionContexts>({
	cls,
	id,
	ctx,
	children,
}: {
	cls: C;
	id?: string;
	ctx: RegionContexts[C];
	children?: React.ReactNode;
}) {
	const parentPath = React.useContext(RegionPathContext);
	const registryVersion = React.useSyncExternalStore(
		subscribeRegistry,
		getRegistryVersion,
		getRegistryVersion
	);

	const localId = id ?? (cls as string);
	const fullId = parentPath ? `${parentPath}/${localId}` : localId;

	// Regions re-render per board piece per battle turn, so we memoize the descriptor and ops to avoid unnecessary re-renders of ops consumers.
	const descriptor = React.useMemo<RegionDescriptor>(
		() => ({ id: fullId, classes: [cls as string] }),
		[fullId, cls]
	);
	const ops = React.useMemo(
		() => regionRouter.resolveRegion(descriptor),
		// resolveRegion's output changes when plugins (re)register, which also bumps the version.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[descriptor, registryVersion]
	);

	if (!regionRouter.hasUiOps) {
		return <>{children}</>;
	}

	const hasOps =
		!!ops.remove ||
		!!ops.replace ||
		ops.wraps.length > 0 ||
		ops.augmentBefore.length > 0 ||
		ops.augmentAfter.length > 0 ||
		ops.transforms.length > 0;

	if (!hasOps) {
		return (
			<RegionPathContext.Provider value={fullId}>
				{children}
			</RegionPathContext.Provider>
		);
	}

	const composed = composeRegion(ops, children, ctx, descriptor);

	return (
		<RegionPathContext.Provider value={fullId}>
			<RegionBoundary
				regionId={fullId}
				resetKey={`${fullId}|${registryVersion}`}
				fallback={children}
			>
				{composed}
			</RegionBoundary>
		</RegionPathContext.Provider>
	);
}
