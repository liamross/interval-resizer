import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import IntervalResizer from '../../node_modules/interval-resizer/package.json';
import App, { demoTextLength } from '../App';

storiesOf(IntervalResizer.version)
  .addDecorator(withKnobs)
  .add('Component Demo', () => {
    return (
      <App
        componentMounted={boolean('Component mounted', true)}
        bodyWords={number('Body words', demoTextLength, {
          range: true,
          min: 0,
          max: 2000,
          step: 5,
        })}
        intervalUnit={number('intervalUnit (px)', 75, {
          range: true,
          min: 0,
          max: 1000,
          step: 5,
        })}
        minHeight={number('minHeight (px)', 0)}
        maxHeight={number('maxHeight (px)', -1)}
        screenWidthCutoff={number('screenWidthCutoff (px)', 0)}
      />
    );
  });