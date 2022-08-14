import React, { FC, useEffect, useRef } from 'react';
import {
	Viz, ErrorCode, TableauEventName, VizCreateOptions,
	ApiToolbarPosition, FilterEvent, ParameterEvent, CustomMarkContextMenu,
	CustomViewEvent, StoryPointSwitchEvent, TabSwitchEvent, ToolbarStateEvent,
	UrlActionEvent, VizResizeEvent
} from 'tableau-js';

const events : [string, TableauEventName][] = [
	['onMarkSelected', TableauEventName.MARKS_SELECTION],
	['onFilterChanged', TableauEventName.FILTER_CHANGE],
	['onParamValueChanged', TableauEventName.PARAMETER_VALUE_CHANGE],
	['onContextMenuSelected', TableauEventName.CUSTOM_MARK_CONTEXT_MENU],
	['onCustomViewLoaded', TableauEventName.CUSTOM_VIEW_LOAD],
	['onCustomViewRemoved', TableauEventName.CUSTOM_VIEW_REMOVE],
	['onCustomViewSaved', TableauEventName.CUSTOM_VIEW_SAVE],
	['onCustomViewSetDefault', TableauEventName.CUSTOM_VIEW_SET_DEFAULT],
	['onStoryPointSwitch', TableauEventName.STORY_POINT_SWITCH],
	['onTabSwitch', TableauEventName.TAB_SWITCH],
	['onToolbarStateChanged', TableauEventName.TOOLBAR_STATE_CHANGE],
	['onUrlAction', TableauEventName.URL_ACTION],
	['onVizResized', TableauEventName.VIZ_RESIZE]
];

export interface TableauProps extends VizCreateOptions {
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

const Tableau: FC<TableauProps> = (props) => {
	const div = useRef<HTMLDivElement>(null);
	const { url, height, width, autoResize, onFirstVizSizeKnown, ...rest } = props;
	Viz
	useEffect(() => {
		const option: VizCreateOptions = {
			onFirstInteractive: (e) => {
				const viz = e.getViz();
				for (const [handlerName, eventName] of events) {
					if (props[handlerName] instanceof Function) {
						viz.addEventListener(eventName, props[handlerName]);
					}
				}
			},
			onFirstVizSizeKnown,
			...rest
		};
		const viz = new Viz(div.current, url, option);
		return () => {
			for (const [handlerName, eventName] of events) {
				if (props[handlerName] instanceof Function) {
					viz.removeEventListener(eventName, props[handlerName]);
				}
			}
			viz.dispose();
		};
	}, [props])
	return <div ref={div} />;
}

export default Tableau;
