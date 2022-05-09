import axios from "axios";
import api from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState<any>();
  const [sigla, setSigla] = useState<any>();

  const [emailAuth, setEmailAuth] = useState<any>();
  const [siglaAuth, setSiglaAuth] = useState<number>(2);

  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const [teste, setTeste] = useState<number>(0);

  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const getEmail = () => {
    axios
      .post(
        "https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1",
        {
          tokenapi: "28DF209D-07C8-47FD-964A-2322D66A9EF1",
          servico: "1125",
          email: email,
        }
      )
      .then((res) => {
        setEmailAuth(res.data);
        if (emailAuth > 0) {
          setCount(count + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSigla = () => {
    axios
      .post(
        "https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1",
        {
          tokenapi: "28DF209D-07C8-47FD-964A-2322D66A9EF1",
          servico: "1122",
          siglarestaurante: sigla,
        }
      )
      .then((res) => {
        setSiglaAuth(res.data);
        setTeste(res.data);
        console.log(res);
        console.log(typeof res.data);
        console.log(typeof teste);
        console.log(res.data);
        console.log(teste);
        if (siglaAuth > 0) {
          setCount(count + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, [count, isFilled, teste]);

  const getData = () => {
    getEmail();
    getSigla();

    if (emailAuth !== -1 && siglaAuth !== -1) {
      //   navigate("/Blip");
    }
  };

  return (
    <div>
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
          type="email"
          placeholder="joao@gmail.com"
          required
          onChange={getInputEmail}
        />
        <br />
        <label>Digite a sigla do restaurante</label>
        <br />
        <input
          type="text"
          placeholder="mcd"
          required
          onChange={getInputSigla}
        ></input>

        <div
          style={{
            margin: "auto",
            width: "50%",
            padding: "10px",
          }}
        >
          <button disabled={isFilled} onClick={() => getData()}>
            Logar
          </button>
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
