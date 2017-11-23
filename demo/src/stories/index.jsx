import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import App from '../App';

const stories = storiesOf('2.2.1', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Demo of single component with variable props.
stories.add('Component Demo', () => {
  return (
    <App
      componentMounted={boolean('Component mounted', true)}
      blueWords={number('Blue words', 40, {
        range: true,
        min: 0,
        max: 1000,
        step: 5,
      })}
      redWords={number('Red words', 52, {
        range: true,
        min: 0,
        max: 1000,
        step: 5,
      })}
      greenWords={number('Green words', 32, {
        range: true,
        min: 0,
        max: 1000,
        step: 5,
      })}
      intervalUnit={number('intervalUnit (px)', 50) || null}
      timeoutDelay={number('timeoutDelay (ms)', 0) || null}
      minHeight={number('minHeight (px)', null) || null}
      maxHeight={number('maxHeight (px)', null) || null}
      instantOnReceiveProps={
        boolean('instantOnReceiveProps', true) || null
      }
      screenWidthCutoff={
        number('screenWidthCutoff (px)', null) || null
      }
    />
  );
});