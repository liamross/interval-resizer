import * as React from 'react';
import {IIntervalResizerProps} from "./IntervalResizer.Props";

export class IntervalResizer extends React.Component<IIntervalResizerProps, {}> {
  public static defaultProps = {
    timeoutDelay: 0,
    instantOnReceiveProps: true,
    minHeight: null,
    maxHeight: null,
    className: null,
    screenWidthCutoff: 0,
  };

  private _waitToRender: number;
  private _uid: string;

  constructor(props: IIntervalResizerProps) {
    super(props);
    this._waitToRender = null;
    this._uid = new Date().valueOf() + '-' + Math.ceil(Math.random() * 10000000);
    this._windowResizeListener = this._windowResizeListener.bind(this);
    props.uniqueId && console.warn('uniqueId is depreciated as of 2.1.0,'
      + ' and is no longer used, you can remove the prop from your code.');
    props.documentRef && console.warn('documentRef is depreciated as of 2.2.0,'
      + ' and is no longer used, you can remove the prop from your code.');
  }

  public componentDidMount(): void {
    this._resizeTimeout(true);
    window.addEventListener('resize', this._windowResizeListener);
  }

  public componentWillReceiveProps(newProps: IIntervalResizerProps) {
    this._resizeTimeout(newProps.instantOnReceiveProps);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this._windowResizeListener);
  }

  public render(): React.ReactNode {
    return (
      <div
        id={this._uid}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  }

  /**
   * Necessary to discard arguments passed from event listener binding and
   * pass false instead as _resizeTimeout's 'instant' parameter.
   */
  private _windowResizeListener(): void {
    this._resizeTimeout(false);
  }

  /**
   * Starts a timeout based off of timeoutDelay prop. If function is called
   * while timeout is in progress, it clears the timeout and begins again. Takes
   * a boolean to determine whether it will call instantly.
   * @param {boolean} instant - True to call _setWrapperHeight instantly, false
   * to wait for timeoutDelay.
   */
  private _resizeTimeout(instant: boolean): void {
    clearTimeout(this._waitToRender);
    this._waitToRender = setTimeout(() => {
      this._setWrapperHeight();
    }, instant ? 0 : this.props.timeoutDelay);
  }

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   * If the window is smaller than the screenWidthCutoff, then the component
   * will match the height of the internals with no intervals.
   */
  private _setWrapperHeight(): void {
    const {screenWidthCutoff} = this.props;
    const resizeWrapper: HTMLElement = window.document.getElementById(this._uid);
    const internalWrapper: HTMLElement = resizeWrapper.firstChild as HTMLElement;
    if (window.document.documentElement.clientWidth > screenWidthCutoff) {
      internalWrapper.style.height = 'auto';
      const contentHeight: number = internalWrapper.offsetHeight;
      const newHeight: number = this._getIntervalHeight(contentHeight);
      resizeWrapper.style.height = `${String(newHeight)}px`;
      internalWrapper.style.height = '100%';
    } else {
      resizeWrapper.style.height = 'auto';
      internalWrapper.style.height = 'auto';
    }
  }

  /**
   * Sets the height to a multiple of the intervalUnit unit, while accounting
   * for the minHeight and maxHeight. Will override minHeight with maxHeight if
   * maxHeight is smaller than minHeight.
   * @param {number} contentHeight - The 'auto' height of the content.
   * @returns {number} - Returns a multiple of your intervalUnit.
   */
  private _getIntervalHeight(contentHeight: number): number {
    const {intervalUnit, minHeight, maxHeight} = this.props;
    let newHeight: number = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
    if (minHeight !== null) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / intervalUnit) * intervalUnit,
      );
    }
    if (maxHeight !== null) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / intervalUnit) * intervalUnit,
      );
    }
    return newHeight;
  }
}