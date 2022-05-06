import axios from 'axios'
import api from './services/api';
import { useState, useEffect} from 'react';


const App = () => {
  const [email, setEmail] = useState();
  const [sigla, setSigla] = useState();

  const getEmail = (email: Event) => {
    axios.post('https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1',{
        tokenapi: "28DF209D-07C8-47FD-964A-2322D66A9EF1",
        servico: "1125",
        email: email
        }
    )
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getSigla = (sigla:Event) => {
    axios.post('https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1',{
      "tokenapi": "28DF209D-07C8-47FD-964A-2322D66A9EF1",
      "servico": "1122",
      "siglarestaurante": sigla
        }
    )
    .then((res) => {
      setEmail(res.data)
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // useEffect(() => {
  //   getEmail(email)
  //   getSigla(sigla)
  // },[])

  const getData = (email:Event, sigla:Event) => {
    getEmail(email)
    getSigla(sigla)
  }

  return (
    <div>
      <p>Olá</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <form>
          <label>Digite o email abaixo</label>
          <br />
          <input type="email" placeholder="joao@gmail.com" onChange={event => setEmail(event.target.value)} required></input>
          <br />
          <label>Digite a sigla do restaurante</label>
          <br />
          <input type="text" placeholder="mcd" onChange={event => setSigla(event.target.value)} required></input>
          <div style={{ marginTop: "2px" }}>
            <button onClick={() => getData(email, sigla)} placeholder="Logar">
              Logar
            </button>
          </div>
        </form>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <footer>Powered by Sonda</footer>
      </div>
    </div>
  );
};

export default App;
