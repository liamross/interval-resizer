import * as React from 'react';
import { IIntervalResizerProps } from "./IntervalResizer.Props";
export declare class IntervalResizer extends React.Component<IIntervalResizerProps, {}> {
    static defaultProps: {
        timeoutDelay: number;
        instantOnReceiveProps: boolean;
        minHeight: any;
        maxHeight: any;
        className: any;
        screenWidthCutoff: number;
    };
    private _waitToRender;
    private _uid;
    constructor(props: IIntervalResizerProps);
    componentDidMount(): void;
    componentWillReceiveProps(newProps: IIntervalResizerProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
    /**
     * Necessary to discard arguments passed from event listener binding and
     * pass false instead as _resizeTimeout's 'instant' parameter.
     */
    private _windowResizeListener();
    /**
     * Starts a timeout based off of timeoutDelay prop. If function is called
     * while timeout is in progress, it clears the timeout and begins again. Takes
     * a boolean to determine whether it will call instantly.
     * @param {boolean} instant - True to call _setWrapperHeight instantly, false
     * to wait for timeoutDelay.
     */
    private _resizeTimeout(instant);
    /**
     * Detects the internal wrapper height and sets the resize wrapper to the next
     * larger intervalUnit multiple, then adjusts the content to fit that height.
     * If the window is smaller than the screenWidthCutoff, then the component
     * will match the height of the internals with no intervals.
     */
    private _setWrapperHeight();
    /**
     * Sets the height to a multiple of the intervalUnit unit, while accounting
     * for the minHeight and maxHeight. Will override minHeight with maxHeight if
     * maxHeight is smaller than minHeight.
     * @param {number} contentHeight - The 'auto' height of the content.
     * @returns {number} - Returns a multiple of your intervalUnit.
     */
    private _getIntervalHeight(contentHeight);
}
