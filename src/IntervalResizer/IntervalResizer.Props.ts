import * as React from 'react';
import IntervalResizer from './IntervalResizer';

export interface IIntervalResizerProps extends React.HTMLAttributes<IntervalResizer> {
  /**
   * Defines the pixel interval to adjust height by when resizing.
   */
  intervalUnit: number;

  /**
   * The internal content wrapped by the IntervalResizer.
   */
  children: React.ReactNode;

  /**
   * Set a re-render timeout to wait for all prop changes and resizing. This
   * does not apply to props if instantOnReceiveProps is true.
   * @defaultvalue 0
   */
  timeoutDelay?: number;

  /**
   * Causes any timeoutDelay to be ignored for cases where the props are
   * updated. timeoutDelay will still fire on window resize events.
   * @defaultvalue true
   */
  instantOnReceiveProps?: boolean;

  /**
   * The minimum height in pixels of the interval-resizer.
   * @defaultvalue null
   */
  minHeight?: number;

  /**
   * The maximum height in pixels of the interval-resizer.
   * @defaultvalue null
   */
  maxHeight?: number;

  /**
   * A value for the class attribute on the component.
   * @defaultvalue null
   */
  className?: string;

  /**
   * Defined the minimum width in pixels for interval resizing. At any window
   * width below this, interval-resizer height adjusts normally with content.
   * @defaultvalue 0
   */
  screenWidthCutoff?: number;

  /**
   * This property has been removed at 2.1.0, and will be removed from code
   * at 3.0.0.
   * @deprecated
   */
  uniqueId?: string;

  /**
   * This property has been removed at 2.2.0, and will be removed from code
   * at 3.0.0.
   * @deprecated
   */
  documentRef?: Document;
}