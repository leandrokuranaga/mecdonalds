import axios from "axios";
import api from "../services/api";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, AlertTitle, Input } from "@mui/material";
import { UserContext } from "../state/UserStorage";

const Auth = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [sigla, setSigla] = useState<string>("");

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [alertOn, setAlertOn] = useState(true);

  const [timer, setTimer] = useState<any>();

  const navigate = useNavigate();

  const getEmail = async () => {
    return await axios
      .post(
        "https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1",
        {
          tokenapi: "28DF209D-07C8-47FD-964A-2322D66A9EF1",
          servico: "1125",
          email: email,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSigla = async () => {
    try {
      const response = await axios.post(
        "https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1",
        {
          tokenapi: "28DF209D-07C8-47FD-964A-2322D66A9EF1",
          servico: "1122",
          siglarestaurante: sigla,
        }
      );
      return await response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);

    if (email.includes("@")) {
      setEmail(event.currentTarget.value);
      setCount(count + 1);
    }
    return;
  };

  const getInputSigla = (event: React.FormEvent<HTMLInputElement>) => {
    setSigla(event.currentTarget.value);

    if (sigla.length === 3) {
      setSigla(event.currentTarget.value);
      setCount(count + 1);
    }
  };

  useEffect(() => {
    if (count === 2) {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  }, [count, isFilled, context?.email, context?.sigla, sigla, email]);

  const getData = async () => {
    const emailResp = await getEmail();
    const siglaResp = await getSigla();

    context?.setSigla(sigla);
    context?.setEmail(email);

    if (emailResp !== -1 || siglaResp !== -1) {
      navigate("/blip");
    } else if (
      emailResp === -1 ||
      siglaResp === -1 ||
      emailResp === undefined ||
      siglaResp === undefined
    ) {
      setAlertOn(false);
      const timerAlert: any = setTimeout(() => {
        setAlertOn(true);
      }, 5000);
      setTimer(timerAlert);
    }
  };

  return (
    <div
      className="text-center login-container"
      style={{
        width: "95vw",
        height: "95vh",
        paddingTop: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ color: "grey", fontSize: "2rem" }}>Vamos acessar?</p>
      {alertOn ? (
        <></>
      ) : (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Usuário e/ou sigla incorretos
        </Alert>
      )}
      <div
        style={{
          width: "50%",
          height: "40%",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "30vw",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20%",
          }}
        >
          <img
            src={require("../assets/Mac.png")}
            style={{ width: "100%", margin: "auto", paddingLeft: "60%" }}
          />
        </div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await getData();
          }}
        >
          <input
            className="form-control"
            type="text"
            placeholder="Digite a sigla do restaurante"
            required
            onChange={getInputSigla}
            style={{
              marginTop: "5px",
              borderRadius: "5px",
              borderColor: "grey",
              padding: "10px",
              margin: "auto",
              paddingTop: "5px",
              display: "flex",
              flexDirection: "column",
              width: "45%",
              fontSize: "100%",
            }}
          ></input>
          <input
            className="form-control"
            type="email"
            placeholder="Digite o email do restaurante"
            required
            onChange={getInputEmail}
            style={{
              borderRadius: "5px",
              borderColor: "grey",
              padding: "10px",
              margin: "auto",
              paddingTop: "5px",
              display: "flex",
              flexDirection: "column",
              width: "45%",
              fontSize: "100%",
            }}
          />

          <div
            style={{
              margin: "auto",
              paddingTop: "5px",
              display: "flex",
              flexDirection: "column",
              width: "48%",
            }}
          >
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              type="submit"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
      <div
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          margin: "20%",
          marginLeft: "60%",
        }}
      ></div>
    </div>
  );
};

export default Auth;
