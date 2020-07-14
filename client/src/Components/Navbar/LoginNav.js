import React from "react";
import LoginModalForm from "../Modals/LoginModalForm";
import RegistrationModalForm from "../Modals/RegistrationModalForm";
import TokenService from "../../Services/token-service";
import AuthApiService from "../../Services/auth-api-service";
import IdleService from "../../Services/idle-service";
import useToggle from "../Hooks/useToggle";
import Modal from "../Modals/Modal";
import { useHistory } from "react-router-dom";

export default function Welcome() {
  const [openLogin, setOpenLogin] = useToggle(false);
  const [openRegistration, setOpenRegistration] = useToggle(false);

  const history = useHistory();

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    history.push('/');
  };

  const renderLogoutLink = () => {
    return (
      <ul>
        <li>
          <button onClick={handleLogoutClick}>Logout</button>
        </li>
      </ul>
    );
  };

  const renderLoginLink = () => {
    return (
      <ul>
        <li>
          <button onClick={() => setOpenLogin()}>Login</button>
        </li>
        <li>
          <button onClick={() => setOpenRegistration()}>Register</button>
        </li>
      </ul>
    );
  };

  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.resetState({});
    this.forceUpdate();
  };

  const handleLoginSuccess = () => {
    IdleService.setIdleCallback(() => logoutFromIdle());
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      /* the timeout will call this callback just before the token expires */
      AuthApiService.postRefreshToken();
    });
    setOpenLogin(false);
  };

  const handleRegistrationSuccess = () => {
    setOpenRegistration(false);
    setOpenLogin(true);
  };

  const handleLoginClick = () => {
    setOpenRegistration(false);
    setOpenLogin(true);
  };

  const handleRegisterClick = () => {
    setOpenLogin(false);
    setOpenRegistration(true);
  };

  return (
    <>
      {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
      {openLogin && (
        <Modal open={openLogin} toggle={setOpenLogin}>
          <LoginModalForm
            onLoginSuccess={() => handleLoginSuccess()}
            onRegisterClick={() => handleRegisterClick()}
          />
        </Modal>
      )}
      {openRegistration && (
        <Modal open={openRegistration} toggle={setOpenRegistration}>
          <RegistrationModalForm
            onRegistrationSuccess={handleRegistrationSuccess}
            onLoginClick={() => handleLoginClick()}
          />
        </Modal>
      )}
    </>
  );
}
