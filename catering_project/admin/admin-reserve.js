
import { db } from "/js/firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const container = document.getElementById("reservations");

const loadReservations = async () => {
  container.innerHTML = "";

  const snap = await getDocs(collection(db, "reservations"));

  snap.forEach(docSnap => {
    const r = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.className = "res-card";

   card.innerHTML = `
  <h3>${r.name || "No Name"}</h3>

  <div class="res-meta">
    ${r.email || "-"} | ${r.phone || "-"}<br>
    ${r.date || "-"} ${r.time || "-"}<br>
    Guests: ${r.guests || "-"}<br>
    ${r.address || "N/A"}
  </div>

  <span class="status ${r.status || "pending"}">
    ${(r.status || "pending").toUpperCase()}
  </span>

  <div class="actions">
    <button class="confirm">Confirm</button>
    <button class="reject">Reject</button>
    <button class="complete">Complete</button>
  </div>
`;

    card.querySelector(".confirm").onclick = () => updateStatus(id, "confirmed");
    card.querySelector(".reject").onclick = () => updateStatus(id, "rejected");
    card.querySelector(".complete").onclick = () => updateStatus(id, "completed");

    container.appendChild(card);
  });
};

const updateStatus = async (id, status) => {
  await updateDoc(doc(db, "reservations", id), { status });
  loadReservations();
};

loadReservations();

// import {
//   getFirestore,
//   collection,
//   getDocs
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// const db = getFirestore();

// async function loadReservations() {
//   const snapshot = await getDocs(collection(db, "reservations"));

//   const table = document.getElementById("reservationTable");
//   table.innerHTML = "";

//   snapshot.forEach((doc) => {
//     const data = doc.data();

//     table.innerHTML += `
//       <tr>
//         <td>${data.name}</td>
//         <td>${data.phone}</td>
//         <td>${data.date}</td>
//         <td>${data.guests}</td>
//         <td>${data.status}</td>
//       </tr>
//     `;
//   });
// }

// window.onload = loadReservations;