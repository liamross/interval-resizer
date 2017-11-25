import * as React from 'react';
import IntervalResizer from './IntervalResizer';

export interface IIntervalResizerProps extends React.HTMLAttributes<IntervalResizer | HTMLDivElement> {
    /**
     * Defines the pixel interval to adjust height by when resizing.
     *
     * @type {number}
     * @memberOf {IIntervalResizerProps}
     */
    intervalUnit: number;

    /**
     * The internal content wrapped by the IntervalResizer.
     *
     * @type {React.ReactNode}
     * @memberOf {IIntervalResizerProps}
     */
    children: React.ReactNode;

    /**
     * Set a re-render timeout to wait for all prop changes and resizing. This
     * does not apply to props if instantOnReceiveProps is true.
     *
     * @type {number}
     * @default 0
     * @memberOf {IIntervalResizerProps}
     */
    timeoutDelay?: number;

    /**
     * Causes any timeoutDelay to be ignored for cases where the props are
     * updated. timeoutDelay will still fire on window resize events.
     *
     * @type {boolean}
     * @default true
     * @memberOf {IIntervalResizerProps}
     */
    instantOnReceiveProps?: boolean;

    /**
     * The minimum height in pixels of the interval-resizer.
     *
     * @type {number}
     * @default null
     * @memberOf {IIntervalResizerProps}
     */
    minHeight?: number;

    /**
     * The maximum height in pixels of the interval-resizer.
     *
     * @type {number}
     * @default null
     * @memberOf {IIntervalResizerProps}
     */
    maxHeight?: number;

    /**
     * A value for the class attribute on the component.
     *
     * @type {string}
     * @default null
     * @memberOf {IIntervalResizerProps}
     */
    className?: string;

    /**
     * Defined the minimum width in pixels for interval resizing. At any window
     * width below this, interval-resizer height adjusts normally with content.
     *
     * @type {number}
     * @default 0
     * @memberOf {IIntervalResizerProps}
     */
    screenWidthCutoff?: number;
}