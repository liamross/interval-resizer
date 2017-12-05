import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import App from '../App';

const stories = storiesOf('3.2.2', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Demo of single component with variable props.
stories.add('Component Demo', () => {
  return (
    <App
      componentMounted={boolean('Component mounted', true)}
      bodyWords={number('Body words', 125, {
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