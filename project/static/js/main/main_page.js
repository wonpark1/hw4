document.addEventListener("DOMContentLoaded", () => {
  const totalEl = document.getElementById("total-count");
  const tagBox = document.getElementById("selected-filter-tags-container");
  const resetBtn = document.querySelector(".filter .reset");

  // 선택된 카테고리들을 저장할 배열
  const selectedCategories = [];

  // 총 합계 업데이트 함수
  function updateTotal() {
    let sum = 0;
    selectedCategories.forEach((category) => {
      const cb = document.querySelector(
        `.filter-wrap input[data-category="${category}"]`
      );
      sum += Number(cb?.getAttribute("data-count")) || 0;
    });
    totalEl.textContent = sum;
  }

  // 선택된 태그 표시 업데이트 함수
  function updateTags() {
    tagBox.innerHTML = "";

    selectedCategories.forEach((category) => {
      const tag = document.createElement("div");
      tag.className = "selected-category-tag";
      tag.textContent = category;

      const x = document.createElement("span");
      x.className = "remove-tag";
      x.textContent = "×";

      x.onclick = () => {
        const cb = document.querySelector(
          `.filter-wrap input[data-category="${category}"]`
        );
        cb.checked = false;
        // 배열에서 제거
        const index = selectedCategories.indexOf(category);
        if (index > -1) selectedCategories.splice(index, 1);

        updateTags();
        updateTotal();
      };

      tag.appendChild(x);
      tagBox.appendChild(tag);
    });

    tagBox.classList.toggle(
      "selected-filter-tags-visible",
      selectedCategories.length > 0
    );
  }

  // 체크박스 이벤트 연결
  document.querySelectorAll(".filter-wrap input[type=checkbox]").forEach((cb) =>
    cb.addEventListener("change", () => {
      const category = cb.dataset.category;

      if (cb.checked) {
        // 중복 추가 방지 후 배열에 추가
        if (!selectedCategories.includes(category)) {
          selectedCategories.push(category);
        }
      } else {
        // 배열에서 제거
        const index = selectedCategories.indexOf(category);
        if (index > -1) selectedCategories.splice(index, 1);
      }

      updateTags();
      updateTotal();
    })
  );

  // 초기화 버튼 이벤트
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // 체크 해제 및 배열 초기화
      document
        .querySelectorAll(".filter-wrap input[type=checkbox]")
        .forEach((cb) => (cb.checked = false));
      selectedCategories.length = 0;

      updateTags();
      updateTotal();
    });
  }

  // 초기 실행 시 배열 세팅 (새로고침 시에도 적용되도록)
  document
    .querySelectorAll(".filter-wrap input[type=checkbox]:checked")
    .forEach((cb) => {
      const category = cb.dataset.category;
      if (!selectedCategories.includes(category)) {
        selectedCategories.push(category);
      }
    });

  updateTags();
  updateTotal();
});
