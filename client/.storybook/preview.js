import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { theme } from './style';

export const decorators = [
  (Story) => (
    <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
    </React.StrictMode>
  ),
];