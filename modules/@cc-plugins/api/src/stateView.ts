/**
 * Selector helper bound to a plugin id.
 *
 * Removes boilerplate of reading `state.game.plugins[<id>][<slice>]`.
 *
 * @example
 * ```ts
 * const view = createPluginStateView<{ chat: ChatState }>("@me/quick-chat");
 * const selectChat = view.select((own) => own?.chat);
 * ```
 */
export interface PluginStateView<PluginState> {
	/**
	 * Builds a selector that runs `getter` against this plugin's own
	 * sub-tree.
	 *
	 * @param getter Receives the plugin's sub-tree (or `undefined` if no reducers have run yet).
	 * @returns A selector function `(rootState) => T`.
	 */
	select<T>(
		getter: (own: PluginState | undefined) => T
	): (rootState: PluginRootShape<PluginState>) => T;
}

/** Structural shape of "any host state with a plugins tree." */
export type PluginRootShape<PluginState> = {
	game: { plugins: { [id: string]: PluginState | undefined } };
};

/**
 * Builds a `PluginStateView` for the plugin's own sub-tree under
 * `state.game.plugins[<pluginId>]`.
 *
 * @param pluginId The id of the calling plugin.
 * @returns A view exposing typed `select(getter)`.
 */
export const createPluginStateView = <PluginState>(
	pluginId: string
): PluginStateView<PluginState> => ({
	select:
		<T>(getter: (own: PluginState | undefined) => T) =>
		(rootState: PluginRootShape<PluginState>) =>
			getter(rootState.game.plugins[pluginId]),
});
