import React from 'react';
import CroppedImage from '../../components/images/CroppedImage';

export default {
  component: CroppedImage,
  title: 'Components/CroppedImage',
};

const Template = (args) => <CroppedImage {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  img: `http://localhost:5000/api/image/1`,
  faceLocation: [237, 173, 460, 466, 683, 1024],
};
