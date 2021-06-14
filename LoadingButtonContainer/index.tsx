import * as React from 'react'
import { LoadingContainerProp, stateProp } from './index.d'
const emptyFn = () => { }

/**
 * 拦截click事件，进行重新包装，但外部click事件调用执行的时候，LoadingContainer先改变内部state 的loading值为true，然后执行之拦截到的外部click事件，当外部click事件返回的Promise对象的状态变为 fulfilled 或者 rejected，就重置内部state的loading值为false
 *
 * @class LoadingContainer
 * @extends {React.PureComponent<LoadingContainerProp, any>}
 */
class LoadingContainer extends React.PureComponent<LoadingContainerProp, any> {
  public static defaultProps: LoadingContainerProp = {
    onClickEd: emptyFn,
    onClick: () => Promise.resolve()
  }
  state: stateProp = {
    loading: false
  }
  render() {
    const { children, onClickEd, render, ...childProps } = this.props

    //删除child 和 onClickEd
    // delete childProps.onClickEd
    // delete childProps.children

    const onClick = this.props.onClick
    let wrapClick = () => { }
    //延时设置 减少误点率（特别是一些弹窗里面的按钮，处理完成就关闭弹窗）
    const setSuccess = () => setTimeout(() => this.setState({ loading: false }))
    if (this.state.loading) {
      onClickEd && onClickEd()
    } else {
      wrapClick = () => {
        const ret = onClick()
        if (ret && ret.then) {
          this.setState({ loading: true })
          return ret.then(setSuccess, setSuccess)
        }
      }
    }
    if (typeof render === 'function') {
      return render({
        ...childProps,
        loading: this.state.loading,
        onClick: wrapClick
      })
    }
    return React.cloneElement(children, {
      ...childProps,
      loading: this.state.loading,
      onClick: wrapClick
    })
  }
}

export default LoadingContainer