import React from 'react';
import IcomoonReact from 'icomoon-react';
import iconSet from './selection.json';

interface IIcon {
    className: string;
    color: string;
    icon: string;
    size: string | number;
    height: string | number;
    width: string | number;
}

function Icon({
  color = '',
  size = '100%',
  icon,
  className = '',
  height,
  width,
}: IIcon) {
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size ?? '100%'}
      icon={icon}
      style={{ height: height ?? 'auto', width: width ?? 'auto' }}
    />
  );
}

export default Icon;
