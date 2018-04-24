/* IntervalResizer.(tsx|js) -- Interval Resizer is a React package for resizing
 * components along pre-defined intervals.
 *
 * Copyright (C) 2018 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
import * as React from 'react';
import { IIntervalResizerProps } from './IntervalResizer.Props';

export class IntervalResizer extends React.Component<
  IIntervalResizerProps,
  {}
> {
  private _resizerRef: HTMLDivElement | null;

  public static defaultProps = {
    minHeight: 0,
    maxHeight: -1,
    className: undefined,
    screenWidthCutoff: 0,
  };

  public componentDidMount(): void {
    this._setWrapperHeight();
    window.addEventListener('resize', this._setWrapperHeight);
  }

  public componentDidUpdate(): void {
    this._setWrapperHeight();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this._setWrapperHeight);
  }

  public render(): React.ReactNode {
    return (
      <div
        className={this.props.className}
        ref={ref => (this._resizerRef = ref)}
      >
        {this.props.children}
      </div>
    );
  }

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   * If the window is smaller than the screenWidthCutoff, then the component
   * will match the height of the internals with no intervals.
   * @private
   */
  private _setWrapperHeight = (): void => {
    const { screenWidthCutoff } = this.props;
    if (this._resizerRef) {
      const internalWrapper = this._resizerRef.firstChild as HTMLElement;
      if (
        !screenWidthCutoff ||
        window.document.documentElement.clientWidth > screenWidthCutoff
      ) {
        internalWrapper.style.height = 'auto';
        const contentHeight: number = internalWrapper.offsetHeight;
        const newHeight: number = this._getIntervalHeight(contentHeight);
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
   * @returns {number} - Returns a multiple of your intervalUnit.
   * @private
   */
  private _getIntervalHeight = (contentHeight: number): number => {
    const { intervalUnit, minHeight, maxHeight } = this.props;
    let newHeight: number =
      Math.ceil(contentHeight / intervalUnit) * intervalUnit;
    if (typeof minHeight === 'number' && minHeight > 0) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / intervalUnit) * intervalUnit,
      );
    }
    if (typeof maxHeight === 'number' && maxHeight >= 0) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / intervalUnit) * intervalUnit,
      );
    }
    return newHeight;
  };
}
