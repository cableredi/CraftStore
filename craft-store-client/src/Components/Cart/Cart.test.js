import React from 'react';
import ReactDOM from 'react-dom';
import CartList from './CartList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <CartList />, div );
  ReactDOM.unmountComponentAtNode(div);
});