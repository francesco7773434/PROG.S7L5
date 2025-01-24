const form = document.getElementById("product-form");
const params = new URLSearchParams(window.location.search);
const productId = params.get("userId");
const URL = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";
window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-btn");
  const delBtn = document.getElementById("delete-btn");

  if (productId) {
    submitBtn.innerText = "Modifica prodotto";
    submitBtn.classList.add("btn-success");
    subtitle.innerText = "— Modifica prodotto";

    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((product) => {
        console.log(product);
        form.elements.name.value = product.name;
        form.elements.description.value = product.description;
        form.elements.price.value = product.price;
        form.elements.imgUrl.value = product.imgUrl;
        form.elements.brand.value = product.brand;
      });
  } else {
    submitBtn.innerText = "Aggiungi prodotto";
    submitBtn.classList.add("btn-primary");
  }
});

form.onsubmit = function (event) {
  event.preventDefault();

  const newProduct = {
    name: form.elements.name.value.trim(),
    description: form.elements.description.value.trim(),
    imageUrl: form.elements.imgUrl.value.trim(),
    price: parseFloat(form.elements.price.value),
    brand: form.elements.brand.value.trim(),
  };

  console.log(newProduct);

  fetch(URL, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjQwYmI3NDcwMTAwMTU4YjJiNDQiLCJpYXQiOjE3Mzc3MTI2NTEsImV4cCI6MTczODkyMjI1MX0.r30tbElp25E8u4BdgkPN-PvMKXxX3taGEgYNnAdLuPY",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    })
    .then((createdProd) => {
      if (!productId) {
        alert("prodotto con id " + createdProd._id + " creato correttamente!");

        form.reset();
      } else {
        alert("prodotto con id " + createdProd._id + " modificato correttamente!");
      }
    });
};
