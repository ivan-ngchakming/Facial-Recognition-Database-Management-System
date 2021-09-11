import React from 'react';
import Gallery from '../../components/images/Gallery';

export default {
  component: Gallery,
  title: 'Components/Gallery',
  argTypes: {
    value: {
      // control: { type: 'range', min: 0, max: 100, step: 1 },
    }
  }
}


const Template = (args) => <Gallery {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

const images = [1, 2, 3, 4, 5].map(value => (
  { source: `http://localhost:5000/api/image/${value}` }
));


Primary.args = {
  images: images,
};
