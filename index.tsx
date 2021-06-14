import * as React from 'react';
import { Button } from 'antd';
import LoadingContainer from './LoadingButtonContainer';

import { LoadingButtonProp } from './type';

/**
 * 该组件主要用于防止用户频繁点击一个按钮，从而导致发送多个ajax请求
 *
 */
const LoadingBtn: React.FunctionComponent<LoadingButtonProp> = ({ type = 'primary', size = 'default', text = '按钮', children, ...rest }) => {
  return <LoadingContainer {...rest}>
    <Button type={type} size={size}> {text} </Button>
  </LoadingContainer>
}
export default LoadingBtn