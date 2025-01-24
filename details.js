const params = new URLSearchParams(window.location.search);
const productId = params.get("prodId");
console.log("RESOURCE ID", productId);

fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjQwYmI3NDcwMTAwMTU4YjJiNDQiLCJpYXQiOjE3Mzc3MTI2NTEsImV4cCI6MTczODkyMjI1MX0.r30tbElp25E8u4BdgkPN-PvMKXxX3taGEgYNnAdLuPY", // Sostituisci <YOUR_TOKEN> con il token corretto
  },
})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((obj) => {
    const container = document.getElementById("details-container");
    container.innerHTML = `
                    <div class="card m-4 borderNone trasparent">
          <img src=${obj.imageUrl} class="card-img-top" alt="${obj.name}">
          <div class="card-body">
            <h5 class="card-title">${obj.name}</h5>
            <p class="card-text">${obj.description}</p>
            <p class="card-text">${obj.price}</p>
            <p class="card-text">${obj.brand}</p>
            
          </div>
        </div>`;
  })
  .catch((err) => console.log(err));
