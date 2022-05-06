const App = () => {
  return (
    <div>
      <p>Olá</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <form>
          <label>Digite o email abaixo</label>
          <br />
          <input type="email" placeholder="joao@gmail.com" required></input>
          <br />
          <label>Digite a sigla do restaurante</label>
          <br />
          <input type="text" placeholder="mcd" required></input>
          <div style={{ marginTop: "2px" }}>
            <button type="submit" placeholder="Logar">
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
