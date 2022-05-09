import axios from "axios";
import api from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, AlertTitle, Input } from "@mui/material";

const Auth = () => {
  const [email, setEmail] = useState<any>();
  const [sigla, setSigla] = useState<any>();

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [alertOn, setAlertOn] = useState(true);

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
    const entrada = event.currentTarget.value;

    if (entrada.includes("@")) {
      setEmail(event.currentTarget.value);
      setCount(count + 1);
    }
  };

  const getInputSigla = (event: React.FormEvent<HTMLInputElement>) => {
    const entrada = event.currentTarget.value;

    if (entrada.length === 3) {
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
  }, [count, isFilled]);

  const getData = async () => {
    const emailResp = await getEmail();
    const siglaResp = await getSigla();

    if (emailResp !== -1 && siglaResp !== -1) {
      navigate("/Blip");
    } else {
      setAlertOn(false);
    }
  };

  return (
    <div>
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
          margin: "auto",
          width: "50%",
          border: "3px solid green",
          marginTop: "5%",
          padding: "10px",
        }}
      >
        <label>Digite o email abaixo</label>
        <br />
        <input
          className="form-control"
          type="email"
          placeholder="joao@gmail.com"
          required
          onChange={getInputEmail}
          style={{ textAlign: "center" }}
        />
        <br />
        <label>Digite a sigla do restaurante</label>
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="mcd"
          required
          onChange={getInputSigla}
          style={{ textAlign: "center" }}
        ></input>
        <div
          style={{
            margin: "auto",
            width: "50%",
            padding: "10px",
          }}
        >
          <Button
            className="primary"
            style={{ backgroundColor: "blue", color: "white" }}
            disabled={false}
            onClick={() => getData()}
          >
            Logar
          </Button>
        </div>
      </div>
      <div
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          margin: "20%",
          marginLeft: "60%",
        }}
      >
        <footer>Powered by Sonda</footer>
      </div>
    </div>
  );
};

export default Auth;
