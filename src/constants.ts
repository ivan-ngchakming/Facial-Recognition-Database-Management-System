import { Page } from './types';

export const SITEMAP = [
  {
    category: 'Home',
    text: 'Home',
    url: '/',
  },
  {
    category: 'Core',
    text: 'Facial Recognition',
    url: '/facial-recognition',
    description:
      'Upload image, detect and match face against profiles saved in database.',
  },
  {
    category: 'Data',
    text: 'Images',
    url: '/images',
    description: 'View, edit or delete all uploaded images.',
  },
  {
    category: 'Data',
    text: 'Profiles',
    url: '/profiles',
    description: 'View, edit or delete all saved profiles.',
  },
  {
    category: 'Tasks',
    text: 'Tasks',
    url: '/tasks',
    description:
      'Batch upload image, detect and match face against profiles saved in database.',
  },
] as Page[];
