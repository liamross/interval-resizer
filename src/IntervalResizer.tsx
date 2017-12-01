/* IntervalResizer.(t|j)sx -- Interval Resizer is a React package for resizing
 * components along pre-defined intervals.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
import * as React from 'react';
import {IIntervalResizerProps} from "./IntervalResizer.Props";

export class IntervalResizer extends React.Component<IIntervalResizerProps, {}> {
  public static defaultProps = {
    minHeight: 0,
    maxHeight: -1,
    className: '',
    screenWidthCutoff: 0,
  };

  private _uid: string;

  constructor(props: IIntervalResizerProps) {
    super(props);
    this._uid = new Date().valueOf() + '-' + Math.ceil(Math.random() * 10e10);
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
    this._setWrapperHeight();
    window.addEventListener('resize', this._setWrapperHeight);
  };

  public componentWillReceiveProps() {
    this._setWrapperHeight();
  };

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this._setWrapperHeight);
  };

  public render(): React.ReactNode {
    return (
      <div
        id={this._uid}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  };

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   * If the window is smaller than the screenWidthCutoff, then the component
   * will match the height of the internals with no intervals.
   */
  private _setWrapperHeight = (): void => {
    const {screenWidthCutoff} = this.props;
    const resizeWrapper = window.document.getElementById(this._uid);
    if (resizeWrapper) {
      const internalWrapper: HTMLElement = resizeWrapper.firstChild as HTMLElement;
      if (!screenWidthCutoff
        || window.document.documentElement.clientWidth > screenWidthCutoff) {
        internalWrapper.style.height = 'auto';
        const contentHeight: number = internalWrapper.offsetHeight;
        const newHeight: number = this._getIntervalHeight(contentHeight);
        resizeWrapper.style.height = `${String(newHeight)}px`;
        internalWrapper.style.height = '100%';
      } else {
        resizeWrapper.style.height = 'auto';
        internalWrapper.style.height = 'auto';
      }
    } else {
      console.error(
        'Error: unable to find interval resizer in DOM.\n'
        + 'ID of resizer: ' + this._uid + '\n'
        + 'Component may have been unmounted without detection by React.',
      );
    }
  };

  /**
   * Sets the height to a multiple of the intervalUnit unit, while accounting
   * for the minHeight and maxHeight. Will override minHeight with maxHeight if
   * maxHeight is smaller than minHeight.
   * @param {number} contentHeight - The 'auto' height of the content.
   * @returns {number} - Returns a multiple of your intervalUnit.
   */
  private _getIntervalHeight = (contentHeight: number): number => {
    const {intervalUnit, minHeight, maxHeight} = this.props;
    let newHeight: number = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
    if (minHeight && minHeight > 0) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / intervalUnit) * intervalUnit,
      );
    }
    if (maxHeight && maxHeight > -1) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / intervalUnit) * intervalUnit,
      );
    }
    return newHeight;
  };
}