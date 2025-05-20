document.addEventListener("DOMContentLoaded", () => {
  const totalEl = document.getElementById("total-count");
  const tagBox = document.getElementById("selected-filter-tags-container");
  const resetBtn = document.querySelector(".filter .reset");

  /* 합계 계산 */
  function updateTotal() {
    let sum = 0;
    document
      .querySelectorAll(".filter-wrap input[type=checkbox]:checked")
      .forEach((cb) => {
        sum += Number(cb.getAttribute("data-count")) || 0;
      });
    totalEl.textContent = sum;
  }

  /* 태그 표시 */
  function updateTags() {
    tagBox.innerHTML = "";
    document
      .querySelectorAll(".filter-wrap input[type=checkbox]:checked")
      .forEach((cb) => {
        const tag = document.createElement("div");
        tag.className = "selected-category-tag";
        tag.textContent = cb.dataset.category;

        const x = document.createElement("span");
        x.className = "remove-tag";
        x.textContent = "×";
        x.onclick = () => {
          cb.checked = false;
          cb.dispatchEvent(new Event("change", { bubbles: true }));
        };

        tag.appendChild(x);
        tagBox.appendChild(tag);
      });

    tagBox.classList.toggle(
      "selected-filter-tags-visible",
      tagBox.childElementCount > 0
    );
  }

  /* 이벤트 */
  document.querySelectorAll(".filter-wrap input[type=checkbox]").forEach((cb) =>
    cb.addEventListener("change", () => {
      updateTags();
      updateTotal();
    })
  );

  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".filter-wrap input[type=checkbox]")
        .forEach((cb) => (cb.checked = false));
      updateTags();
      updateTotal();
    });
  }

  /* 초기 실행 */
  updateTags();
  updateTotal();
});
