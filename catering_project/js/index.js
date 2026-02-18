function addToCart(name, price, image) {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  db.collection("cart").add({
    userId: user.uid,
    name,
    price,
    quantity: 1,
    image,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => alert("Item added to cart"))
  .catch(err => alert(err.message));
}