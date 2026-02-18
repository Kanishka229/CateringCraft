
// import { db, auth } from "/js/firebase.js";
// import {
//   collection,
//   getDocs,
//   doc,
//   setDoc,
//    getDoc 
// } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// const menuGrid = document.querySelector(".menu-grid");
// let allDishes = [];

// async function loadMenu() {
//   const snapshot = await getDocs(collection(db, "menu"));
//   allDishes = [];

//   snapshot.forEach((docSnap) => {
//     allDishes.push({ id: docSnap.id, ...docSnap.data() });
//   });

//   showDishes("appetizer");
// }

// loadMenu();

// function showDishes(category) {
//   menuGrid.innerHTML = "";

//   const filtered = allDishes.filter(d => d.category === category);

//   filtered.forEach(dish => {
//     menuGrid.innerHTML += `
//       <div class="menu-card">
//         <img src="${dish.image}">
//         <h3>${dish.name}</h3>
//         <p>${dish.description}</p>
//         <h4>₹${dish.price}</h4>
//         <button onclick="addToCart('${dish.id}')">Add to Cart</button>
//       </div>
//     `;
//   });
// }

// window.filterMenu = function(category, el) {
//   document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
//   el.classList.add("active");
//   showDishes(category);
// };

// window.addToCart = async (dishId) => {
//   if (!currentUser) {
//     showToast("Please login first");
//     return;
//   }

//   const dish = allDishes.find(d => d.id === dishId);

//   await addDoc(
//     collection(db, "users", currentUser.uid, "cart"),
//     {
//       name: dish.name,
//       price: dish.price,
//       image: dish.image,
//       quantity: 1,
//       createdAt: serverTimestamp()
//     }
//   );

//   showToast("Added to cart!");
// };

// function showToast(message) {
//   const toast = document.getElementById("toast");
//   toast.innerText = message;
//   toast.classList.add("show");

//   setTimeout(() => {
//     toast.classList.remove("show");
//   }, 3000);
// }

// loadMenu();

import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const container = document.getElementById("menuContainer");
let allDishes = [];

// Fetch Menu From Firestore
async function loadMenu() {
  container.innerHTML = "";
  const snapshot = await getDocs(collection(db, "menu"));
  
  snapshot.forEach(docSnap => {
    allDishes.push({ id: docSnap.id, ...docSnap.data() });
  });

  renderDishes(allDishes);
}

function renderDishes(dishes) {
  container.innerHTML = "";

  dishes.forEach(dish => {
    const card = document.createElement("div");
    card.className = "dish-card";

    card.innerHTML = `
      <img src="${dish.image}">
      <div class="dish-info">
        <h3>${dish.name}</h3>
        <p>₹${dish.price}</p>
        <button onclick="addToCart('${dish.id}')">Add to Cart</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Filter
window.filterCategory = (category) => {
  document.querySelectorAll(".category button")
    .forEach(btn => btn.classList.remove("active"));

  event.target.classList.add("active");

  if (category === "all") {
    renderDishes(allDishes);
  } else {
    const filtered = allDishes.filter(d => d.category === category);
    renderDishes(filtered);
  }
};

// Add To Cart
window.addToCart = async (dishId) => {
  const user = auth.currentUser;

  if (!user) {
    showToast("Please login first");
 setTimeout(
      ()=>{
        window.location.href ="login.html";
      },1500);
      return;
  }

  const dish = allDishes.find(d => d.id === dishId);

  await setDoc(
    doc(db, "users", user.uid, "cart", dishId),
    { ...dish, quantity: 1 }
  );

  showToast("Added to cart ✅");
};


// Toast
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

loadMenu();



// anoteht













