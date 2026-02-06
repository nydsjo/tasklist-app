// 🔥 FIREBASE CONFIG (REPLACE WITH YOUR OWN)
const firebaseConfig = {
  apiKey: "AIzaSyCtWaFw1vob8XyylMnki2qiv8hkvysfj7g",
  authDomain: "aos-pairings-matrix.firebaseapp.com",
  projectId: "aos-pairings-matrix",
  storageBucket: "aos-pairings-matrix.firebasestorage.app",
  messagingSenderId: "153253469237",
  appId: "1:153253469237:web:8e72311cdc65c89909a57c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const docRef = db.collection("matrix").doc("shared");

const matrixBody = document.getElementById("matrix-body");

// DEFAULT DATA (FOR FIRST LOAD)
const defaultData = {
  players: Array(6).fill(""),
  opponents: Array(6).fill(""),
  scores: Array.from({ length: 6 }, () => Array(6).fill(3))
};

let data = defaultData;

// 🔄 REALTIME LISTENER
docRef.onSnapshot((doc) => {
  if (doc.exists) {
    data = doc.data();
  } else {
    docRef.set(defaultData);
    data = defaultData;
  }
  renderMatrix();
});

function saveData() {
  docRef.set(data);
}

function applyScoreColor(select) {
  select.className = "";
  select.classList.add(`score-${select.value}`);
}

function renderMatrix() {
  matrixBody.innerHTML = "";

  // HEADER: Opponent names
  document.querySelectorAll("thead input").forEach((input, col) => {
    input.value = data.opponents[col] || "";
    input.oninput = () => {
      data.opponents[col] = input.value;
      saveData();
    };
  });

  // BODY: 6 PLAYER ROWS
  for (let row = 0; row < 6; row++) {
    const tr = document.createElement("tr");

    // Player name cell
    const playerTd = document.createElement("td");
    const playerInput = document.createElement("input");
    playerInput.className = "player-input";
    playerInput.placeholder = `Player ${row + 1}`;
    playerInput.value = data.players[row] || "";

    playerInput.oninput = () => {
      data.players[row] = playerInput.value;
      saveData();
    };

    playerTd.appendChild(playerInput);
    tr.appendChild(playerTd);

    // 6x score cells
    for (let col = 0; col < 6; col++) {
      const td = document.createElement("td");
      const select = document.createElement("select");

      for (let i = 1; i <= 5; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        select.appendChild(opt);
      }

      select.value = data.scores[row][col];
      applyScoreColor(select);

      select.onchange = () => {
        data.scores[row][col] = Number(select.value);
        applyScoreColor(select);
        saveData();
      };

      td.appendChild(select);
      tr.appendChild(td);
    }

    matrixBody.appendChild(tr);
  }
}
