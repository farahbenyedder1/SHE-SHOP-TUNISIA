let cart = [];

function getRate() {
  return parseFloat(localStorage.getItem("rate") || 3.25);
}

function getDeliveryFee() {
  let type = document.getElementById("deliveryType").value;
  return type === "delivery"
    ? parseFloat(localStorage.getItem("deliveryFee") || 8)
    : 0;
}

function addItem() {
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  let qty = parseInt(document.getElementById("qty").value);

  if (!name || !price || !qty) return;

  cart.push({ name, price, qty });
  renderCart();
}

function renderCart() {
  let table = document.getElementById("cart");
  let rate = getRate();
  let total = 0;

  table.innerHTML = `
    <tr><th>Article</th><th>Qté</th><th>Prix (TND)</th></tr>
  `;

  cart.forEach(i => {
    let tnd = i.price * rate * i.qty;
    total += tnd;
    table.innerHTML += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${tnd.toFixed(2)}</td>
      </tr>
    `;
  });

  total += getDeliveryFee();
  document.getElementById("total").innerText = total.toFixed(2);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.text("Facture - Commande SHEIN", 10, 10);
  let y = 20;

  cart.forEach(i => {
    doc.text(`${i.name} | Qté: ${i.qty}`, 10, y);
    y += 8;
  });

  doc.text("Total: " + document.getElementById("total").innerText + " TND", 10, y + 10);
  doc.save("facture_shein.pdf");
}