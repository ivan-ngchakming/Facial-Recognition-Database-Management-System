import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../src/style';

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
