const form = document.getElementById("product-form"); // nodo del form
// vado a cercare l'appointment id dalla barra degli indirizzi del browser per ogni avvio della pagina backoffice
const params = new URLSearchParams(window.location.search);
const productId = params.get("userId"); // questo dato può essere la stringa dell'id trovato oppure null
// appointmentId viene usato in diversi punti del codice sottostante per determinare le operazioni da svolgere in base alla sua esistenza o meno
// la sua esistenza implica la gestione della pagina per gestire la modifica di un appuntamento
// se appointmentId NON E' null in URL si salverà la stringa di indirizzo + id, altrimenti solo l'indirizzo base
const URL = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";
window.addEventListener("DOMContentLoaded", () => {
  // prendiamo i riferimenti degli elementi che vogliamo manipolare
  const submitBtn = document.getElementById("submit-btn");
  const delBtn = document.getElementById("delete-btn");

  // da qui in poi abbiamo un bivio
  // il codice si autodeterminerà sulle cose da fare al caricamento della pagina
  if (productId) {
    // se siamo qui è perché nella URL c'era un appId (siamo in fase di modifica)
    // gestione della UI in caso di modifica
    submitBtn.innerText = "Modifica prodotto";
    submitBtn.classList.add("btn-success");
    subtitle.innerText = "— Modifica prodotto";
    delBtn.classList.remove("d-none");
    delBtn.onclick = handleDelete; // la funzione è definita sotto, viene solo usata come REFERENCE
    // (così da far sapere al bottone quale funzione avviare al momento del suo click)
    // gestione del reperimento del dato in caso di modifica che pre-popolerà i campi
    // chiederò al server di darmi i dati corrispondenti all'id che abbiamo trovato arrivando su questa pagina
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((product) => {
        console.log(product); // il server mi ritorna l'oggetto dell'appuntamento corrispondente all'appointmentId
        // sto modificando i valori dei campi input, con i DATI PRECEDENTI contenuti nell'oggetto appena ricavato dal server tramite appointmentId
        form.elements.name.value = product.name;
        form.elements.description.value = product.description;
        form.elements.price.value = product.price;
        form.elements.imgUrl.value = product.imgUrl;
        form.elements.brand.value = product.brand;
      });
  } else {
    // se siamo qui è perché sulla barra degli indirizzi non c'era un appId e quindi siamo sul backoffice normale per la fase di creazione di una
    // nuova risorsa (appuntamento)
    // gestione della UI in caso di creazione
    submitBtn.innerText = "Aggiungi prodotto";
    submitBtn.classList.add("btn-primary");
  }
});
// questa funzione gestisce l'evento submit del form (quindi si attiva alla pressione del tasto principale e solo in quel caso, non all'avvio della pagina)
form.onsubmit = function (event) {
  // evito il refresh del browser
  event.preventDefault();
  // costruisco il dato a partire dai campi del form
  const newProduct = {
    name: form.elements.name.value.trim(),
    description: form.elements.description.value.trim(),
    imageUrl: form.elements.imgUrl.value.trim(),
    price: parseFloat(form.elements.price.value), // Assicurati che price sia un numero valido
    brand: form.elements.brand.value.trim(),
  };
  // controllo la corretta creazione del dato
  console.log(newProduct);
  // invio il dato al server (così da farli salvare per sempre)
  fetch(URL, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      // questo è importante e fondamentale quando stiamo inviando il payload
      // solo col content-type il server può capire che c'è un json da convertire
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjQwYmI3NDcwMTAwMTU4YjJiNDQiLCJpYXQiOjE3Mzc3MTI2NTEsImV4cCI6MTczODkyMjI1MX0.r30tbElp25E8u4BdgkPN-PvMKXxX3taGEgYNnAdLuPY",
      // Authorization: "Bearer [YOUR_API_KEY]" // esempio di applicazione di API KEY alla HTTP REQUEST
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    })
    .then((createdApp) => {
      if (!productId) {
        // avviso l'utente dell'avvenuta creazione
        alert("prodotto con id " + createdApp._id + " creato correttamente!");
        // contestualmente resetto i campi del form, per prepararlo ad un altro inserimento
        form.reset();
      } else {
        // saremo qui dopo una modifica del dato
        alert("prodotto con id " + createdApp._id + " modificato correttamente!");
      }
    });
};
// questa funzione è associata al bottone rosso di cancellazione (visibile solo in fase di modifica)
// è stata associata al click del bottone delete a linea 30 (vedi sopra)
const handleDelete = () => {
  // chiediamo conferma all'utente, visto che la cancellazione sarà irreversibile una volta effettuata
  const hasConfirmed = confirm("sei sicuro di voler eliminare l'appuntamento?");
  // se l'utente aveva confermato si procede
  if (hasConfirmed) {
    // la URL contiene già SICURAMENTE l'id alla fine dell'indirizzo (vedi sopra)
    fetch(URL, { method: "DELETE" })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedApp) => {
        // feedback all'utente ad avvenuta eliminazione
        alert("Abbiamo eliminato " + deletedApp.name + " con id " + deletedApp._id);
        // l'alert è bloccante, quindi il codice attenderà la sua chiusura per procedere oltre questo punto
        // questa operazione sposta l'utente di nuovo in homepage, perché non c'è più nulla da fare qui dopo che l'elemento si è eliminato
        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
