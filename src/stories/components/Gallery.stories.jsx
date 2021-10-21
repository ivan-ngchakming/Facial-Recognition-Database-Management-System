import React from 'react';
import images from '../images';
import Gallery from '../../components/images/Gallery';

export default {
  component: Gallery,
  title: 'Components/Gallery',
  argTypes: {
    value: {},
  },
};

const Template = (args) => <Gallery {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  images: images,
};
