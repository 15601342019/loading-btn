# LoadingButton

    该组件主要用于防止用户频繁点击一个按钮，从而导致发送多个ajax请求

    组件要求必须传入一个click事件，该事件执行返回一个Promise对象，事件执行组件进入loading状态，
    
    当Promise的状态变为 fulfilled 或者 rejected，此时组件loading消失恢复原来状态。

## demo

```jsx

import React, { PureComponent } from 'react';
import LoadingButton from 'loading-btn';
import { post } from 'src/services';
import { Form, Icon, Input } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TestLoadingButtion extends PureComponent {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        return new Promise((resolve, reject) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    reject()
                }
                post('/user/add', values).then(resolve, reject)
            });
        })
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline">
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <LoadingButton onClick={this.handleSubmit} disabled={hasErrors(getFieldsError())} > Log in </LoadingButton>
                </FormItem>
            </Form>
        );
    }
}

const WrappedTestLoadingButtion = Form.create()(TestLoadingButtion);

ReactDOM.render(<WrappedTestLoadingButtion />, mountNode);
```