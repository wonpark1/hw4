/* product detail page - JS */

document.addEventListener("DOMContentLoaded", function () {
  const quantityDecreaseButton = document.querySelector(".quantity-decrease");
  const quantityIncreaseButton = document.querySelector(".quantity-increase");
  const quantityInput = document.getElementById("quantity");
  const totalPriceSpan = document.getElementById("total-amount");
  const productPriceElement =
    document.querySelector(".sale-price") || document.querySelector(".price");

  if (!productPriceElement) {
    console.error("Product price element not found.");
    return;
  }

  let productPrice = parseFloat(
    productPriceElement.textContent.replace(/[^0-9.]/g, "")
  );

  function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value, 10);
    const total = productPrice * quantity;
    totalPriceSpan.textContent = total.toLocaleString();
  }

  if (quantityDecreaseButton) {
    quantityDecreaseButton.addEventListener("click", function () {
      let currentQuantity = parseInt(quantityInput.value, 10);
      if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
        updateTotalPrice();
      }
    });
  }

  if (quantityIncreaseButton) {
    quantityIncreaseButton.addEventListener("click", function () {
      let currentQuantity = parseInt(quantityInput.value, 10);
      quantityInput.value = currentQuantity + 1;
      updateTotalPrice();
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener("change", function () {
      const value = parseInt(quantityInput.value, 10);
      if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
      }
      updateTotalPrice();
    });
  }

  // Initial total price calculation
  updateTotalPrice();
});
