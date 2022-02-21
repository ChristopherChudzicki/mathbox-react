import { MouseEventHandler } from 'react';
declare type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    text?: string;
};
declare const Button: (props: Props) => JSX.Element;
export default Button;
