import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Loadingbutton from '../index';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

interface Props {
    form: any;
    children: React.ReactElement<any, any>;
}
class HorizontalLoginForm extends React.Component<Props> {
    formRef = React.createRef<FormInstance>();
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.formRef.form.validateFields();
    }

    handleSubmit = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.formRef.form.validateFields((err: any, values: any) => {
                if (err) {
                    console.log('Received values of form: ', err, values);
                    reject(err);
                }
                //模拟数据提交
                setTimeout(resolve, 2000);
            });
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        const userNameStatus: any = userNameError ? 'error' : '';
        const passwordStatus: any = passwordError ? 'error' : '';
        return (
            <Form layout="inline" >
                <FormItem validateStatus={userNameStatus} help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem validateStatus={passwordStatus} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Loadingbutton onClick={() => this.handleSubmit()} text="login in" disabled={hasErrors(getFieldsError())} />
                </FormItem>
            </Form >
        );
    }
}

const WrappedHorizontalLoginForm: any = HorizontalLoginForm;

ReactDOM.render(<WrappedHorizontalLoginForm />, document.getElementById('root'));