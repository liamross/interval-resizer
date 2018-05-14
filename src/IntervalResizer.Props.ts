/* IntervalResizer.Props.ts -- Interval Resizer is a React package for
 * resizing components along pre-defined intervals.
 *
 * Copyright (C) 2017-present, Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
import * as React from 'react';
import { IntervalResizer } from './IntervalResizer';
export interface IIntervalResizerProps
  extends React.HTMLAttributes<IntervalResizer> {
  /**
   * Defines the pixel interval to adjust height by when resizing.
   */
  intervalUnit: number;
  /**
   * The internal content wrapped by the IntervalResizer.
   */
  children: React.ReactNode;
  /**
   * The minimum height in pixels of the interval-resizer.
   * @default 0
   */
  minHeight?: number;
  /**
   * The maximum height in pixels of the interval-resizer.
   * @default -1
   */
  maxHeight?: number;
  /**
   * A value for the class attribute on the component.
   * @default undefined
   */
  className?: string;
  /**
   * Defined the minimum width in pixels for interval resizing. At any window
   * width below this, interval-resizer height adjusts normally with content.
   * @default 0
   */
  screenWidthCutoff?: number;
  /**
   * This property has been removed at 3.1.0.
   * @deprecated
   */
  timeoutDelay?: number;
  /**
   * This property has been removed at 3.1.0.
   * @deprecated
   */
  instantOnReceiveProps?: boolean;
  /**
   * This property has been removed at 2.1.0.
   * @deprecated
   */
  uniqueId?: string;
  /**
   * This property has been removed at 2.2.0.
   * @deprecated
   */
  documentRef?: Document;
}
