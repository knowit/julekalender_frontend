import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';


interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

};

const Button: FC<ButtonProps> = ({ className, children, ...restProps}) => (
  <button className={`hover:underline uppercase tracking-wider ${className}`} {...restProps}>{children}</button>
);

export default Button;
