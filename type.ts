import * as React from 'react';
import { ButtonProps, ButtonSize, ButtonType } from 'antd/es/button';
import LoadingBtn from './index';
export interface ILoadingButtonProp {
    onclicked?: () => any,
    onClick: (p?: any) => Promise<any>,
    text?: string,
    type?: ButtonType,
    size?: ButtonSize,
}

export declare type LoadingButtonProp = ILoadingButtonProp & ButtonProps;

export default class LoadingBtn extends React.Component<LoadingButtonProp, any>{ }
