<!DOCTYPE html>
<html>
<head>
  <title>Venda de Erva-Mate</title>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"></script>
</head>
<body>
  <h1>Cadastro de Erva-Mate</h1>
  <form id="form">
    <input type="text" id="nome" placeholder="Nome do produto" required><br>
    <input type="text" id="tipo" placeholder="Tipo (chimarrão, tererê)" required><br>
    <input type="number" id="preco" placeholder="Preço (R$)" required><br>
    <button type="submit">Cadastrar</button>
  </form>

  <h2>Ofertas disponíveis</h2>
  <ul id="lista"></ul>

  <script>
    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_DOMINIO.firebaseapp.com",
      databaseURL: "https://SEU_DOMINIO.firebaseio.com",
      projectId: "SEU_PROJETO_ID",
      storageBucket: "SEU_BUCKET.appspot.com",
      messagingSenderId: "SEU_ID",
      appId: "SUA_APP_ID"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // Enviar dados
    document.getElementById('form').addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const tipo = document.getElementById('tipo').value;
      const preco = document.getElementById('preco').value;
      db.ref('produtos').push({ nome, tipo, preco });
      e.target.reset();
    });

    // Listar dados
    db.ref('produtos').on('value', function (snapshot) {
      const lista = document.getElementById('lista');
      lista.innerHTML = '';
      snapshot.forEach(function (item) {
        const dados = item.val();
        lista.innerHTML += `<li>${dados.nome} - ${dados.tipo} - R$${dados.preco}</li>`;
      });
    });
  </script>
</body>
</html>
