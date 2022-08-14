export interface TableauHook {

}

export interface TableauOptions extends VizCreateOptions {
	url: string;
	autoResize?: boolean;
	onMarkSelected?: (event: MarksEvent) => void;
	onFilterChanged?: (event: FilterEvent) => void;
	onParamValueChanged?: (event: ParameterEvent) => void;
	onContextMenuSelected?: (event: CustomMarkContextMenu) => void;
	onCustomViewLoaded?: (event: CustomViewEvent) => void;
	onCustomViewRemoved?: (event: CustomViewEvent) => void;
	onCustomViewSaved?: (event: CustomViewEvent) => void;
	onCustomViewSetDefault?: (event: CustomViewEvent) => void;
	onStoryPointSwitch?: (event: StoryPointSwitchEvent) => void;
	onTabSwitch?: (event: TabSwitchEvent) => void;
	onToolbarStateChanged?: (event: ToolbarStateEvent) => void;
	onUrlAction?: (event: UrlActionEvent) => void;
	onVizResized?: (event: VizResizeEvent) => void;
}

const useTableau:  = (options) => {
	const option: VizCreateOptions = {
		onFirstInteractive: (e) => {
			const viz = e.getViz();
			for (const [handlerName, eventName] of events) {
				if (props[handlerName] instanceof Function) {
					viz.addEventListener(eventName, props[handlerName]);
				}
			}
		},
		onFirstVizSizeKnown: (e) => {
			if ((!height || !width || autoResize)&&div.current) {
				const { width: w, height: h } = e.getViz();
				div.current.style.width = w + 'px';
				div.current.style.height = h + 'px';
			}
		},
	};
	// const viz = new Viz(div.current, url, option);
}