let cart = [];

function addItem() {
  let code = document.getElementById("codeInput").value.trim();
  let price = parseFloat(document.getElementById("priceInput").value);
  let qty = parseInt(document.getElementById("qtyInput").value);

  if (!code || !price || !qty) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  let priceFinal = price * 1.23; // application du taux

  cart.push({
    code: code,
    qty: qty,
    priceFinal: priceFinal
  });

  renderCart();

  // Réinitialiser les champs
  document.getElementById("codeInput").value = "";
  document.getElementById("priceInput").value = "";
  document.getElementById("qtyInput").value = 1;
}

function renderCart() {
  let table = document.getElementById("cart");
  table.innerHTML = `
    <tr>
      <th>Code</th>
      <th>Qté</th>
      <th>Prix final (QR)</th>
    </tr>
  `;

  let total = 0;
  cart.forEach(item => {
    total += item.priceFinal * item.qty;
    table.innerHTML += `
      <tr>
        <td>${item.code}</td>
        <td>${item.qty}</td>
        <td>${(item.priceFinal * item.qty).toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  let y = 10;
  doc.text("Facture - Commande", 10, y);
  y += 10;

  cart.forEach(item => {
    doc.text(
      `Code: ${item.code} | Qté: ${item.qty} | Prix final: ${(item.priceFinal * item.qty).toFixed(2)} QR`,
      10,
      y
    );
    y += 8;
  });

  let total = document.getElementById("total").innerText;
  y += 10;
  doc.text(`Total à payer : ${total} QR`, 10, y);

  doc.save("facture.pdf");
}