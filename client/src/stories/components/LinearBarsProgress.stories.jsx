import React from 'react';

import LinearBarsProgress from '../../components/LinearBarsProgress';

export default {
  component: LinearBarsProgress,
  title: 'Components/LinearBarsProgress',
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    }
  }
}


const Template = (args) => <LinearBarsProgress {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  value: 20,
};