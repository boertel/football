import React from 'react';

const Flag = ({ size, viewBox, cut, children, ...rest }) => {
  let defs = null;
  let clipPath = null;
  const hypotenuse = parseInt(Math.sqrt((size ** 2 + size ** 2)), 10);
  if (cut === 'bottom') {
    defs = (
      <defs>
        <clipPath id={cut}>
          <rect x="0" y="0" width={hypotenuse} height={hypotenuse} transform={`translate(-${size}, 0) rotate(-45)`} />
        </clipPath>
      </defs>
    );
    clipPath = `url(#${cut})`;
  }
  if (cut === 'top') {
    defs = (
      <defs>
        <clipPath id={cut}>
          <rect x="0" y="0" width={hypotenuse} height={hypotenuse} transform={`translate(0, ${size}) rotate(-45)`} />
        </clipPath>
      </defs>
    )
    clipPath = `url(#${cut})`;
  }

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox={viewBox}
      {...rest}
    >{defs}<g clipPath={clipPath}>{children}</g></svg>
  );
};

Flag.defaultProps = {
  size: 48,
  viewBox: '0 0 48 48',
};

export default Flag;
