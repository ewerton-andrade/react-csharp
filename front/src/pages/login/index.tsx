import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";

import { Button, Divider, Spin } from "antd";

import ModalCreate from "../../shared/components/modal/index.tsx";
import FormLogin from "./components/login.tsx";
import FormAccount from "./components/account.tsx";
import FormRecovery from "./components/recovery.tsx";
import FormConfirm from "./components/confirm.tsx";
import FromReset from "./components/reset.tsx";

import {
  LoginContainer,
  ImageContainer,
  Image,
  LoginRightContainer,
  ButtonAntAccount,
  ContentRight,
  ContentButton,
} from "./styled.ts";

import Logo from "../../Assets/Images/indtLogo.jpg";

import { FormData, FormReset } from "./types.ts";

import { useAppDispatch } from "../../shared/hooks/index.ts";
import { OpenModalActions } from "../../redux/features/openModal/index.ts";

import {
  loginUser,
  createAccount,
  recoveryPass,
  registration,
  checkCredential,
  resetAccess,
} from "../../shared/services/auth.ts";

const Login = () => {
  const [typeModal, setTypeModal] = useState("new-account");
  const [status, setStatus] = useState({
    created: false,
    sent: false,
    activated: false,
    reset: false,
  });
  const [loading, setLoading] = useState(false);

  const { setOpenModal } = OpenModalActions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const saveProgress = (progress: object): void => {
    setStatus((prev) => ({ ...prev, ...progress }));
  };

  const onSubmitLogin = async (values: FormData): Promise<void> => {
    try {
      const response = await loginUser(values.username, values.password);
      if (response.success) {
        navigate("/home");
      } else {
        alert(`Error: ${response.message}`);
        // Handle other response statuses or show an error message
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onSubmitCreate = async (values: FormData): Promise<void> => {
    try {
      setLoading(true);
      const response = await createAccount(values.username, values.password);
      if (response.success) {
        saveProgress({ created: true });
      } else {
        alert(`Error: ${response.message}`);
        // Handle other response statuses or show an error message
      }
    } catch (error) {
      console.error("Error during creation:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitRecovery = async (values: FormData): Promise<void> => {
    try {
      setLoading(true);
      const response = await recoveryPass(values.username);
      if (response.success) {
        saveProgress({ sent: true });
      } else {
        alert(`Error: ${response.message}`);
        // Handle other response statuses or show an error message
      }
    } catch (error) {
      console.error("Error during recovery:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitConfirm = async (values: FormData): Promise<void> => {
    try {
      setLoading(true);
      const response = await registration(
        values.username,
        decryptCredential(storeCredential("get"))
      );
      if (response.success) {
        saveProgress({ activated: true });
      } else {
        alert(`Error: ${response.message}`);
        // Handle other response statuses or show an error message
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitReset = async (values: FormReset): Promise<void> => {
    try {
      setLoading(true);
      const response = await resetAccess(
        values.newPassword,
        decryptCredential(storeCredential("get"))
      );
      if (response.success) {
        saveProgress({ reset: true });
      }
    } catch (error) {
      console.error("Error during reset:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type: string): void => {
    setTypeModal(type);
    dispatch(setOpenModal(true));
  };

  const validCredential = (credential: string): boolean => {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(credential);
  };

  const checkToken = async (token: string): Promise<boolean> => {
    let valid = await checkCredential(token);
    return valid;
  };

  const decryptCredential = (credential: string): string => {
    let token = "";
    try {
      token = Base64.decode(credential);
    } catch (error) {
      token = "";
    }
    return token;
  };

  const parserPath = (link: string): string => {
    return link.replace(link.includes("confirm") ? "/confirm/" : "/reset/", "");
  };

  const storeCredential = (action: string, value: any = undefined): any => {
    let key = "@credential";
    if (action === "save") {
      sessionStorage.setItem(key, value);
      return;
    }
    if (action === "delete") {
      sessionStorage.removeItem(key);
      return;
    }
    if (action === "get") {
      return sessionStorage.getItem(key);
    }
  };

  const extractPathSegments = (
    path: string
  ): { confirm: boolean; reset: boolean } => {
    return {
      confirm: path.includes("/confirm/"),
      reset: path.includes("/reset/"),
    };
  };

  const parseAndValidateCredential = (path: string): boolean => {
    const credential = parserPath(path);
    return credential.length > 0 && validCredential(credential);
  };

  const validateAndStoreCredential = async (
    credential: string
  ): Promise<boolean> => {
    const validToken = await checkToken(decryptCredential(credential));
    if (validToken) {
      storeCredential("save", credential);
      return true;
    }
    return false;
  };

  const openAppropriateModal = (confirm: boolean): void => {
    openModal(confirm ? "confirm-account" : "reset-pass");
  };

  const checkPath = async (path: string): Promise<void> => {
    const { confirm, reset } = extractPathSegments(path);
    if (confirm || reset) {
      if (parseAndValidateCredential(path)) {
        if (await validateAndStoreCredential(parserPath(path))) {
          openAppropriateModal(confirm);
        }
      }
    }
  };

  useEffect(() => {
    setTypeModal("new-account");
    storeCredential("delete");
    checkPath(window.location.pathname);
  }, []);

  return (
    <LoginContainer>
      <ImageContainer>
        <Image src={Logo} style={{}} alt="Login Image" />
      </ImageContainer>
      <LoginRightContainer>
        <ContentRight>
          <FormLogin
            initialValues={{ remember: true }}
            onFinish={onSubmitLogin}
          />
          <Button
            type="link"
            style={{ width: "100%", fontSize: "1rem" }}
            onClick={() => openModal("recovery-pass")}
          >
            Esqueceu a senha?
          </Button>
          <Divider />
          <ContentButton>
            <ButtonAntAccount onClick={() => openModal("new-account")}>
              Criar nova conta
            </ButtonAntAccount>
          </ContentButton>
        </ContentRight>
      </LoginRightContainer>

      <ModalCreate>
        <Spin spinning={loading}>
          {typeModal === "new-account" && (
            <FormAccount created={status.created} onFinish={onSubmitCreate} />
          )}
          {typeModal === "recovery-pass" && (
            <FormRecovery sent={status.sent} onFinish={onSubmitRecovery} />
          )}
          {typeModal === "confirm-account" && (
            <FormConfirm
              activated={status.activated}
              onFinish={onSubmitConfirm}
            />
          )}
          {typeModal === "reset-pass" && (
            <FromReset reset={status.reset} onFinish={onSubmitReset} />
          )}
        </Spin>
      </ModalCreate>
    </LoginContainer>
  );
};

export default Login;
