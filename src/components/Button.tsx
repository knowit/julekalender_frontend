import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';


interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  underline?: boolean;
};

const Button: FC<ButtonProps> = ({ underline = true, className, children, ...restProps}) => (
  <button className={`${underline && 'hover:underline'} uppercase tracking-wider ${className}`} {...restProps}>{children}</button>
);

export default Button;
