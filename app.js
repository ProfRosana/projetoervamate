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
const storage = firebase.storage();

document.getElementById('formProduto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const tipo = document.getElementById('tipo').value;
  const preco = document.getElementById('preco').value;
  const obs = document.getElementById('obs').value;
  const fotoFile = document.getElementById('foto').files[0];

  let fotoURL = "";
  if (fotoFile) {
    const storageRef = storage.ref('fotos/' + Date.now() + '-' + fotoFile.name);
    await storageRef.put(fotoFile);
    fotoURL = await storageRef.getDownloadURL();
  }

  db.ref('produtos').push({ nome, tipo, preco, obs, fotoURL });
  e.target.reset();
});

db.ref('produtos').on('value', (snapshot) => {
  const lista = document.getElementById('listaProdutos');
  lista.innerHTML = '';
  snapshot.forEach((item) => {
    const p = item.val();
    lista.innerHTML += `
      <li>
        <strong>${p.nome}</strong> [${p.tipo}] - R$${p.preco}<br>
        ${p.obs}<br>
        ${p.fotoURL ? `<img src="${p.fotoURL}" width="150"><br>` : ""}
      </li>
    `;
  });
});