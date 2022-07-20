import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {routes} from "../../utils/routes";
import {useAppDispatch} from "../../hooks/useDispatch";
import {closeAuthModal, login, logout, openAuthModal, setAuthModalVariant} from "../../store/slices/auth/authSlice";
import {selectAuthModalState, selectAuthStatus, userSelector} from "../../store/slices/auth/authSelectors";
import {useSelector} from "react-redux";
import {PageHeader, Button, Typography, Modal, Form, Input} from "antd";
import { io } from "socket.io-client";
import {isIOS, isMobile} from 'react-device-detect';
import {AudioPlayer} from "../AudioPlayer/AudioPlayer";

const { Text } = Typography;

function App() {
  const dispatch = useAppDispatch();
  const { email } = useSelector(userSelector);
  const { isLogged } = useSelector(selectAuthStatus);
  const { isOpen, variant } = useSelector(selectAuthModalState);

  const [audio, setAudio] = useState<any>(new Audio());

  function handleLoginClick() {
    dispatch(openAuthModal())
  }

  function  handleCloseModal() {
    dispatch(closeAuthModal());
  }

  function handleLogoutClick() {
    dispatch(logout())
  }

  function toggleLoginRegister() {
    dispatch(setAuthModalVariant())
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="app">
      <PageHeader
        title="Moscow planetarium tech"
        extra={[
          isLogged ?
            [
              <Text code key={1}>{email}</Text>,
              <Button key={2} onClick={handleLogoutClick} type="primary" ghost>выход</Button>
            ]
            :
            <Button key={3} onClick={handleLoginClick} type="primary" ghost>Вход</Button>,

        ]}
        ghost={true}
      />
      <main className="main">
        <Modal title={'Регистрация'} visible={isOpen && variant === 'register'} footer={false} centered={true} onCancel={handleCloseModal}>
          <Form
            name="basic"
            size={"small"}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email - обязательное поле' }, { type: 'email', message: 'Введите email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Имя"
              name="first_name"
              rules={[{ required: true, message: 'Имя - обязательное поле' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Фамилия"
              name="last_name"
              rules={[{ required: true, message: 'Фамилия - обязательное поле' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Должность"
              name="position"
              rules={[{ required: true, message: 'Должность - обязательное поле' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Телефон"
              name="phone_number"
              rules={[{ required: true, message: 'Телефон - обязательное поле' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Telegram"
              name="tg_username"
              rules={[{ required: true, message: 'Телефон - обязательное поле' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Пароль - обязательное поле' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Повторите пароль"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Повторите пароль!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Регистрация
              </Button>
            </Form.Item>
          </Form>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Text type="secondary">Уже есть аккаунт?</Text>
            <Button  onClick={toggleLoginRegister} type="link">войти</Button>
          </Form.Item>
        </Modal>

        <Modal title="Вход" visible={isOpen && variant === 'login'} footer={false} onCancel={handleCloseModal}>
          <Form
            name="basic"
            size={"small"}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email - обязательное поле' }, { type: 'email', message: 'Введите email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Пароль - обязательное поле' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Text type="secondary">Еще нет аккаунта?</Text>
              <Button  onClick={toggleLoginRegister} type="link">Регистрация</Button>
            </Form.Item>
          </Form>
        </Modal>

        <Switch>
          <Route path={routes.main} exact>
            <h2>Main page</h2>
          </Route>
          <Route path={routes.translation} exact>
            <AudioPlayer/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
