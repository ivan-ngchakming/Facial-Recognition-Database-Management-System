import React from 'react';
import Images from '../../pages/Images';

export default {
  component: Images,
  title: 'Pages/Images',
  argTypes: {
    value: {
      // control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

const Template = (args) => <Images {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

const images = [1, 2, 3, 4, 5].map((value) => ({
  source: `http://localhost:5000/api/image/${value}`,
}));

Primary.args = {
  images: images,
};
