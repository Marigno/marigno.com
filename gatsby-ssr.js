// gatsby-ssr.js
import React from 'react';
import { ThemeContextProvider } from './src/theming/ThemeContext';

export function wrapRootElement({ element }) {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
}