/* IntervalResizer.(tsx|js) -- Interval Resizer is a React package for resizing
 * components along pre-defined intervals.
 *
 * Copyright (C) 2018 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
import * as React from 'react';
import {IIntervalResizerProps} from './IntervalResizer.Props';

export class IntervalResizer extends React.Component<IIntervalResizerProps, {}> {
  public static defaultProps = {
    minHeight: 0,
    maxHeight: -1,
    className: '',
    screenWidthCutoff: 0,
  };

  private _resizerRef: HTMLDivElement | null;

  constructor(props: IIntervalResizerProps) {
    super(props);
    props.uniqueId && console.error('uniqueId is depreciated as of 2.1.0,'
      + ' and is no longer used.');
    props.documentRef && console.error('documentRef is depreciated as of 2.2.0,'
      + ' and is no longer used.');
    props.timeoutDelay && console.error('timeoutDelay is depreciated as of'
      + ' 3.1.0, and is no longer used.');
    props.instantOnReceiveProps && console.error('instantOnReceiveProps is'
      + ' depreciated as of 3.1.0, and is no longer used.');
  };

  public componentDidMount(): void {
    this._setWrapperHeight(this.props);
    window.addEventListener('resize', this._resizeListener);
  };

  public componentDidUpdate(): void {
    this._setWrapperHeight(this.props);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this._resizeListener);
  };

  public render(): React.ReactNode {
    return (
      <div
        className={this.props.className}
        ref={ref => this._resizerRef = ref}>
        {this.props.children}
      </div>
    );
  };

  /**
   * A pass-through to _setWrapperHeight, allows passing props instead of
   * event from the listener, since sometimes we would like to call
   * _setWrapperHeight directly with nextProps or from componentDidMount.
   * @private
   */
  private _resizeListener = (): void => {
    this._setWrapperHeight(this.props);
  };

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   * If the window is smaller than the screenWidthCutoff, then the component
   * will match the height of the internals with no intervals.
   * @param {IIntervalResizerProps} props - The current props.
   * @private
   */
  private _setWrapperHeight = (props: IIntervalResizerProps): void => {
    const {screenWidthCutoff} = props;
    if (this._resizerRef) {
      const internalWrapper = this._resizerRef.firstChild as HTMLElement;
      if (!screenWidthCutoff || window.document.documentElement.clientWidth > screenWidthCutoff) {
        internalWrapper.style.height = 'auto';
        const contentHeight: number = internalWrapper.offsetHeight;
        const newHeight: number = this._getIntervalHeight(contentHeight, props);
        this._resizerRef.style.height = `${String(newHeight)}px`;
        internalWrapper.style.height = '100%';
      } else {
        this._resizerRef.style.height = 'auto';
        internalWrapper.style.height = 'auto';
      }
    } else {
      console.error('Error: unable to find interval resizer in DOM.');
    }
  };

  /**
   * Sets the height to a multiple of the intervalUnit unit, while accounting
   * for the minHeight and maxHeight. Will override minHeight with maxHeight if
   * maxHeight is smaller than minHeight.
   * @param {number} contentHeight - The 'auto' height of the content.
   * @param {IIntervalResizerProps} props - The current props.
   * @returns {number} - Returns a multiple of your intervalUnit.
   * @private
   */
  private _getIntervalHeight = (contentHeight: number, props: IIntervalResizerProps): number => {
    const {intervalUnit, minHeight, maxHeight} = props;
    let newHeight: number = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
    if (typeof minHeight === 'number' && minHeight > 0) {
      newHeight = Math.max(newHeight, Math.ceil(minHeight / intervalUnit) * intervalUnit);
    }
    if (typeof maxHeight === 'number' && maxHeight >= 0) {
      newHeight = Math.min(newHeight, Math.floor(maxHeight / intervalUnit) * intervalUnit);
    }
    return newHeight;
  };
}