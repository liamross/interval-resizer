import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import App from '../App';

const stories = storiesOf('3.1.1', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Demo of single component with variable props.
stories.add('Component Demo', () => {
  return (
    <App
      componentMounted={boolean('Component mounted', true)}
      bodyWords={number('Body words', 172, {
        range: true,
        min: 0,
        max: 2000,
        step: 5,
      })}
      intervalUnit={number('intervalUnit (px)', 100) || null}
      minHeight={number('minHeight (px)', null) || null}
      maxHeight={number('maxHeight (px)', null) || null}
      screenWidthCutoff={
        number('screenWidthCutoff (px)', null) || null
      }
    />
  );
});