import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scx.sondait.com.br/webrun/WSSolicitacaoReceber.rule?sys=GB1',
});

export default api;
