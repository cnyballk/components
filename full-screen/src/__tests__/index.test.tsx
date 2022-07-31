import React from 'react';
import { cleanup, render } from '@testing-library/react';
import fullScreen from '..';

const ComA = () => <div className="coma">123</div>;

it('缩放后内容一致', () => {
  const Com = fullScreen({ style: { width: 500, height: 800 } })(ComA);
  const { container } = render(
    <div style={{ width: 250, height: 400 }}>
      <Com />
    </div>,
  );
  expect(container.textContent).toEqual('123');
});
