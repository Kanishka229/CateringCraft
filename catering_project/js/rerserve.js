// import { db } from "./firebase.js";
// import {
//   collection,
//   addDoc,
//   serverTimestamp
// } from "https://www.gstatic.com/firebasejs/12.8./firebase-firestore.js";

// const form = document.getElementById("reservationForm");
// // const toast = document.getElementById("toast");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

  
//   const data = {
//     name: name.value,
//     email: email.value,
//     phone: phone.value,
//     guests: guests.value,
//     date: date.value,
//     time: time.value,
//     location: location.value,
//     status: "pending",
//     createdAt: serverTimestamp()
//   };

//   try{
//   await addDoc(collection(db, "reservations"), data);
// status:"pending",
// createdAt : serverTimestamp()}
// );
//   showToast("Reservation Request Sent!");
//   form.reset();

// catch{err}{
//     console.error(err);
//     showToast("error sending reservation")
// }

// // function showToast(msg) {
// //   toast.innerHTML = `<strong>${msg}</strong><br>
// //     We have received your request and will contact you shortly to confirm.`;
// //   toast.classList.add("show");

// //   setTimeout(() => toast.classList.remove("show"), 3000);


// // toast
// function showToast(message){
//     const toast= 
//     document.getElementById("toast");
//     if(!toast) return;
//     toast.innerText=message;
//     toast.classList.add("show");

//     setTimeout(() =>{
//         toast.classList.remove("show");
//     }, 2500
    
    
//     );
// }

// import { db } from "/js/firebase.js";
// import {
//   collection,
//   addDoc,
//   serverTimestamp
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// const form = document.getElementById("reservationForm");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   try {
//     await addDoc(collection(db, "reservations"), {
//       name: document.getElementById("name").value,
//       email: document.getElementById("email").value,
//       phone: document.getElementById("phone").value,
//       guests: document.getElementById("guests").value,
//       date: document.getElementById("date").value,
//       time: document.getElementById("time").value,
//       address: document.getElementById("location").value,
//       status: "pending",
//       createdAt: serverTimestamp()
//     });

//     showToast("Reservation Request Sent!");
//     form.reset();

//   } catch (err) {
//     console.error(err);
//     showToast("Error sending reservation");
//   }
// });

// /* TOAST */
// function showToast(msg) {
//   const t = document.getElementById("toast");
//   t.innerText = msg;
//   t.classList.add("show");
//   setTimeout(() => t.classList.remove("show"), 2500);
// }


import { auth, db } from "/js/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const form = document.getElementById("reservationForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
if (!auth.currentUser){
  alert("please login first");
  window.location.href ="login.html";
  return;
}
  try {
    await addDoc(collection(db, "reservations"), {
      userId: auth.currentUser.uid,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      guests: document.getElementById("guests").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      address: document.getElementById("location").value,
      status: "pending",
      createdAt: serverTimestamp()
    });

    showToast("Reservation Request Sent!");
    form.reset();

  } catch (err) {
    console.error(err);
    showToast("Error sending reservation");
  }
});

/* TOAST */
function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}