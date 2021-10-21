import React from 'react';
import Anya from '../assets/Anya Taylor Joy/18.jpg';
import CroppedImage from '../../components/images/CroppedImage';

export default {
  component: CroppedImage,
  title: 'Components/CroppedImage',
};

const Template = (args) => <CroppedImage {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  img: Anya,
  faceLocation: [237, 173, 460, 466, 683, 1024],
};
