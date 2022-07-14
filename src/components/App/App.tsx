import React, {useState} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {routes} from "../../utils/routes";
import {useAppDispatch} from "../../hooks/useDispatch";
import {closeAuthModal, login, logout, openAuthModal, setAuthModalVariant} from "../../store/slices/auth/authSlice";
import {selectAuthModalState, selectAuthStatus, userSelector} from "../../store/slices/auth/authSelectors";
import {useSelector} from "react-redux";
import {IUserData} from "../../types/globalTypes";

function App() {
  const dispatch = useAppDispatch();
  const { email } = useSelector(userSelector);
  const { isLogged } = useSelector(selectAuthStatus);
  const { isOpen, variant } = useSelector(selectAuthModalState);

  const [userData, setUserData] = useState<IUserData>({
    loginEmail: '',
    loginName: '',
    loginPassword: '',
    regEmail: '',
    regName: '',
    regPass: '',
    regRepeatPass: ''
  });


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

  function handleLoginSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log('submit login', userData);
  }

  function handleRegisterSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log('submit register', userData);
  }

  function handeInputChange(event: React.FormEvent<HTMLInputElement>) {
    setUserData({
      ...userData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className="app">
      <header className="header">
        <p>Moscow planetarium tech</p>
        {isLogged ?
          <div>{email}<button onClick={handleLogoutClick}>выход</button></div>
          :
          <button onClick={handleLoginClick}>вход</button>}
      </header>
      <main className="main">
        <Switch>
          <Route path={routes.main} exact>
            <h2>Main page</h2>
          </Route>
        </Switch>
        {isOpen &&
          (variant === 'login' ?
              <div className="popup">
                <form className="popup__form" onSubmit={handleLoginSubmit}>
                  <h3 className="popup__title">Вход</h3>
                  <button onClick={handleCloseModal} className="popup__close-btn" type="button">X</button>
                  <input
                    className="popup__input"
                    type="email" placeholder="email"
                    onChange={handeInputChange}
                    value={userData.loginEmail}
                    required
                    name="loginEmail"
                  />
                  <input
                    className="popup__input"
                    type="password"
                    placeholder="password"
                    onChange={handeInputChange}
                    value={userData.loginPassword}
                    required
                    name="loginPassword"
                  />
                  <button className="popup__submit-btn" type="submit">Войти</button>
                  <p>Еще нет аккаунта? <a onClick={toggleLoginRegister}>регистрация</a></p>
                </form>
              </div>
          :
              <div className="popup">
                <form className="popup__form" onSubmit={handleRegisterSubmit}>
                  <h3 className="popup__title">Регистрация</h3>
                  <button onClick={handleCloseModal} className="popup__close-btn" type="button">X</button>
                  <input
                    className="popup__input"
                    type="email"
                    placeholder="regEmail"
                    required
                    onChange={handeInputChange}
                    value={userData.regEmail}
                    name="regEmail"
                  />
                  <input
                    className="popup__input"
                    type="text"
                    placeholder="regName"
                    required
                    onChange={handeInputChange}
                    value={userData.regName}
                    name="regName"
                  />
                  <input
                    className="popup__input"
                    type="password"
                    placeholder="regPassword"
                    required
                    onChange={handeInputChange}
                    value={userData.regPass}
                    name="regPass"
                  />
                  <input
                    className="popup__input"
                    type="password"
                    placeholder="regRepeatPassword"
                    required
                    onChange={handeInputChange}
                    value={userData.regRepeatPass}
                    name="regRepeatPass"
                  />
                  <button className="popup__submit-btn" type="submit">Создать</button>
                  <p>Уже есть аккаунт? <a onClick={toggleLoginRegister}>войти</a></p>
                </form>
              </div>)
        }

      </main>
    </div>
  );
}

export default App;
