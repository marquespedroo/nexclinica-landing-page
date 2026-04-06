import React from 'react';
import { renderToString } from 'react-dom/server';
import RootApp from './RootApp';

export const render = () => {
  return renderToString(<RootApp />);
};
