import * as React from 'react'

export interface LoadingContainerProp {
  onClickEd?: () => any
  onClick: (p?: any) => Promise<any>
  children?: any,
  render?: (p?: any) => React.ReactNode,
  [propName: string]: any
}

export interface stateProp {
  loading: boolean
}

declare type emptyFn = () => any

export default class LoadingContainer extends React.Component<LoadingContainerProp, stateProp> { }