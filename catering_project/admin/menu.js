// import { db } from "../js/firebase.js";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

 const menuList = document.getElementById("menuList");
 const formBox = document.getElementById("formBox");
 document.getElementById("openForm").onclick = () => {
   formBox.classList.toggle("hidden");
 };

// async function loadMenu() {
//   menuList.innerHTML = "";
//   const snapshot = await getDocs(collection(db, "menu"));
//   snapshot.forEach((d) => {
//     const item = d.data();
//     menuList.innerHTML += `
//      <div style="
//          background:#fff;
//          padding:15px;
//         margin-bottom:10px;
//         border-radius:8px;
//         display:flex 1fr;
//         gap:15px;
//          align-items:center;
//       ">
//          <img src="${item.image}" width="70" height="70" style="border-radius:6px;object-fit:cover;">
//          <div>
//            <h4>${item.name}</h4>
//           <p>${item.category}</p>
//          <p>₹${item.price}</p>
//        </div>
//       </div>
    
//     `;
//   });
// }

// window.addDish = async function () {
//   const name = document.getElementById("name").value;
//   const price = document.getElementById("price").value;
//   const category = document.getElementById("category").value;
//   const image = document.getElementById("image").value;
//   const description = document.getElementById("description").value;

//   if (!name || !price || !category || !image) {
//     alert("Fill all fields");
//     return;
//   }

//   await addDoc(collection(db, "menu"), {
//     name,
//     price: Number(price),
//     category,
//     image,
//     description
//   });

//   formBox.classList.add("hidden");
//   loadMenu();
// };



// window.deleteDish = async function (id) {
//   if (confirm("Delete this dish?")) {
//     await deleteDoc(doc(db, "menu", id));
//     loadMenu();
//   }
// };








// window.deleteDish = async (dishId) => {
//   const confirmDelete = confirm("Delete this dish?");

//   if (!confirmDelete) return;

//   await deleteDoc(doc(db, "menu", dishId));
// };

// loadMenu();





// import { db } from "../js/firebase.js";
// import {
//   collection,
//   getDocs
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// const menuList = document.getElementById("menuList");

// async function loadMenu() {
//   menuList.innerHTML = "";

//   const snapshot = await getDocs(collection(db, "menu"));

//   if (snapshot.empty) {
//     menuList.innerHTML = "<p>No menu items found</p>";
//     return;
//   }

//   snapshot.forEach((doc) => {
//     const item = doc.data();

//     menuList.innerHTML += `
//       <div style="
//         background:#fff;
//         padding:15px;
//         margin-bottom:10px;
//         border-radius:8px;
//         display:flex;
//         gap:15px;
//         align-items:center;
//       ">
//         <img src="${item.image}" width="70" height="70" style="border-radius:6px;object-fit:cover;">
//         <div>
//           <h4>${item.name}</h4>
//           <p>${item.category}</p>
//           <p>₹${item.price}</p>
//         </div>
//       </div>
//     `;
//   });
// }

// loadMenu();

// import { db } from "../js/firebase.js";
// import {
//   collection,
//   onSnapshot,
//   deleteDoc,
//   doc
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// const menuList = document.getElementById("menuList");

// onSnapshot(collection(db, "menu"), (snapshot) => {
//   menuList.innerHTML = "";

//   if (snapshot.empty) {
//     menuList.innerHTML = "<p>No menu items</p>";
//     return;
//   }

//   snapshot.forEach((docSnap) => {
//     const item = docSnap.data();
//     const id = docSnap.id;

//     const div = document.createElement("div");
//     div.className = "admin-menu-item";

//     div.innerHTML = `
//       <img src="${item.image}" />
//       <div class="info">
//         <h4>${item.name}</h4>
//         <p>${item.category}</p>
//         <p>₹${item.price}</p>
//       </div>
//       <button class="delete">Delete</button>
//     `;

//     div.querySelector(".delete").onclick = async () => {
//       await deleteDoc(doc(db, "menu", id));
//     };

//     menuList.appendChild(div);
//   });
// });



// import { db } from "../js/firebase.js";
// import {
//   collection, addDoc, getDocs, deleteDoc, doc
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// const list = document.getElementById("menuList");
// const form = document.getElementById("menuForm");

// form.onsubmit = async e => {
//   e.preventDefault();

//   await addDoc(collection(db,"menu"),{
//     name: name.value,
//     price: +price.value,
//     category: category.value,
//     image: image.value,
//     description: desc.value,
//     active: true
//   });

//   form.reset();
//   loadMenu();
// };

// async function loadMenu(){
//   list.innerHTML="";
//   const snap = await getDocs(collection(db,"menu"));

//   snap.forEach(d=>{
//     const m=d.data();
//     const card=document.createElement("div");
//     card.className="menu-card";

//     card.innerHTML=`
//       <img src="${m.image}">
//       <h4>${m.name}</h4>
//       <p>₹${m.price}</p>
//       <button>Delete</button>
//     `;

//     card.querySelector("button").onclick=async()=>{
//       await deleteDoc(doc(db,"menu",d.id));
//       loadMenu();
//     };

//     list.appendChild(card);
//   });
// }

// loadMenu();

















 import { db } from "../js/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const menuGrid = document.querySelector(".menu-grid");

async function loadMenu() {
  menuGrid.innerHTML = "";
  const snapshot = await getDocs(collection(db, "menu"));

  snapshot.forEach((docSnap) => {
    const dish = docSnap.data();

    menuGrid.innerHTML += `
      <div class="menu-card">
       <img src="${dish.image}">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <h4>₹${dish.price}</h4>
        <p>${dish.category}</p>
        <button onclick="deleteDish('${docSnap.id}')">Delete</button>
      </div>
    `;
  });
}

loadMenu();

window.addDish = async function() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;

  await addDoc(collection(db, "menu"), {
    name,
    price: Number(price),
    description,
    image,
    category
  });

  alert("Dish added!");
  loadMenu();
};

window.deleteDish = async function(id) {
  await deleteDoc(doc(db, "menu", id));
  loadMenu();
};