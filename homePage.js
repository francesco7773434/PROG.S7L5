let products = [
  {
    name: "iphone 16",
    description: "Indistructible phone, classic design.",
    brand: "Apple",
    imageUrl: "https://www.rstore.it/media/catalog/product/cache/bb5991ed8856d22ce5c275e41c5f78f9/F/0/F039595_1.jpg",
    price: 99,
    /* userId: "654654as4d4cd464",
    createdAt: "2019-07-19",
    updatedAt: "2019-07-19",*/
  },
  {
    name: "iPhone 12",
    description: "Latest Apple smartphone with 5G.",
    brand: "Apple",
    imageUrl: "https://www.phone-lab.com/wp-content/uploads/2021/08/51.jpg",
    price: 799,
    /* userId: "654654as4d4cd464",
    createdAt: "2020-10-23",
    updatedAt: "2020-10-23",*/
  },
  {
    name: "Samsung Galaxy S21",
    description: "Flagship smartphone with powerful camera.",
    brand: "Samsung",
    imageUrl: "https://img.pccomponentes.com/articles/34/348294/1130-samsung-galaxy-s21-5g-128gb-rosa-libre-especificaciones.jpg",
    price: 999,
    /* userId: "654654as4d4cd464",
    createdAt: "2021-01-14",
    updatedAt: "2021-01-14",*/
  },
  {
    name: "MacBook Pro 16-inch",
    description: "Apple laptop with Retina display and M1 chip.",
    brand: "Apple",
    imageUrl: "https://d2e6ccujb3mkqf.cloudfront.net/18615bbe-c07f-42cf-b679-23a9c69221af-2_a6fdc088-6578-442b-a621-8dd902c284e6.jpg",
    price: 2399,
    /* userId: "654654as4d4cd464",
    createdAt: "2021-11-10",
    updatedAt: "2021-11-10",*/
  },
  {
    name: "Sony PlayStation 5",
    description: "Next-gen gaming console with stunning graphics.",
    brand: "Sony",
    imageUrl: "https://www.trexsi.com/1679-large_default/sony-playstation-5-pro-digital-2tb-console-ps5-pro-white.jpg",
    price: 499,
    /* userId: "654654as4d4cd464",
    createdAt: "2020-11-12",
    updatedAt: "2020-11-12",*/
  },
  {
    name: "Dell XPS 13",
    description: "Premium ultrabook with 11th Gen Intel Core.",
    brand: "Dell",
    imageUrl: "https://files.refurbed.io/pi/dell-xps-13-plus-9320-1240p-1702992071.jpg?t=fitdesign&h=600&w=800",
    price: 1499,
    /* userId: "654654as4d4cd464",
    createdAt: "2020-09-10",
    updatedAt: "2020-09-10",*/
  },
  {
    name: "Fitbit Charge 4",
    description: "Fitness tracker with heart rate and GPS.",
    brand: "Fitbit",
    imageUrl: "https://www.gocamera.it/bmz_cache/6/6918c10202274c5eef5ddcde6e7b2f29.image.800x800.jpg",
    price: 129,
    /* userId: "654654as4d4cd464",
    createdAt: "2020-03-01",
    updatedAt: "2020-03-01",*/
  },
  {
    name: "Google Pixel 5",
    description: "Smartphone with excellent camera and clean Android.",
    brand: "Google",
    imageUrl: "https://dealy.com/it/2150060-large_default/google-pixel-5-protezione-dello-schermo-contorno-nero.jpg",
    price: 699,
    /* userId: "654654as4d4cd464",
    createdAt: "2020-10-01",
    updatedAt: "2020-10-01",*/
  },
  {
    name: "Apple AirPods Pro",
    description: "Wireless noise-cancelling earbuds.",
    brand: "Apple",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
    price: 249,
    /* userId: "654654as4d4cd464",
    createdAt: "2019-10-30",
    updatedAt: "2019-10-30",*/
  },
  {
    name: "Amazon Echo Dot 4th Gen",
    description: "Smart speaker with Alexa.",
    brand: "Amazon",
    imageUrl: "https://www.rejmak.com/wp-content/uploads/2021/07/6430063cv12d.jpg",
    price: 49,
    /* userId: "654654as4d4cd464",
    createdAt: "2020-10-22",
    updatedAt: "2020-10-22",*/
  },
];

const row = document.getElementById("myRow");

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjQwYmI3NDcwMTAwMTU4YjJiNDQiLCJpYXQiOjE3Mzc3MTI2NTEsImV4cCI6MTczODkyMjI1MX0.r30tbElp25E8u4BdgkPN-PvMKXxX3taGEgYNnAdLuPY",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nella chiamata API");
    }
  })
  .then((apiProducts) => {
    const allProducts = apiProducts.concat(products);
    row.innerHTML = "";

    allProducts.forEach((obj) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");
      col.innerHTML = ` 
        <div class="card m-4 borderNone trasparent">
          <img src=${obj.imageUrl} class="card-img-top" alt="${obj.name}">
          <div class="card-body">
            <h5 class="card-title">${obj.name}</h5>
            <p class="card-text">${obj.description}</p>
            <p class="card-text">${obj.price}</p>
            <p class="card-text">${obj.brand}</p>
            <a href="#" class="btn btn-dark btn-sm">Modifica</a>
            <a href="details.html?prodId=${obj._id}" class="btn btn-info btn-sm">Dettagli</a>
          </div>
        </div>`;
      row.appendChild(col);
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });
