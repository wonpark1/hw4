document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.querySelector(".filter .reset");
  const checkboxes = document.querySelectorAll(
    '.filter-wrap input[type="checkbox"]'
  );
  const selectedCategoriesContainer = document.getElementById(
    "selected-filter-tags-container"
  );

  function updateSelectedCategoriesUI() {
    selectedCategoriesContainer.innerHTML = ""; // 기존 태그들을 초기화
    let hasSelectedCategory = false; // 선택된 카테고리가 있는지 여부를 추적하는 변수

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        hasSelectedCategory = true; // 체크된 카테고리가 있다면 true로 설정
        const categoryName = checkbox.dataset.category;

        if (categoryName) {
          const tagElement = document.createElement("div");
          tagElement.classList.add("selected-category-tag");
          const textNode = document.createTextNode(categoryName + " ");
          tagElement.appendChild(textNode);

          const removeButton = document.createElement("span");
          removeButton.classList.add("remove-tag");
          removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99992 11.1668L5.91659 15.2502C5.76381 15.4029 5.56936 15.4793 5.33325 15.4793C5.09714 15.4793 4.9027 15.4029 4.74992 15.2502C4.59714 15.0974 4.52075 14.9029 4.52075 14.6668C4.52075 14.4307 4.59714 14.2363 4.74992 14.0835L8.83325 10.0002L4.74992 5.91683C4.59714 5.76405 4.52075 5.56961 4.52075 5.3335C4.52075 5.09738 4.59714 4.90294 4.74992 4.75016C4.9027 4.59738 5.09714 4.521 5.33325 4.521C5.56936 4.521 5.76381 4.59738 5.91659 4.75016L9.99992 8.8335L14.0833 4.75016C14.236 4.59738 14.4305 4.521 14.6666 4.521C14.9027 4.521 15.0971 4.59738 15.2499 4.75016C15.4027 4.90294 15.4791 5.09738 15.4791 5.3335C15.4791 5.56961 15.4027 5.76405 15.2499 5.91683L11.1666 10.0002L15.2499 14.0835C15.4027 14.2363 15.4791 14.4307 15.4791 14.6668C15.4791 14.9029 15.4027 15.0974 15.2499 15.2502C15.0971 15.4029 14.9027 15.4793 14.6666 15.4793C14.4305 15.4793 14.236 15.4029 14.0833 15.2502L9.99992 11.1668Z" fill="#DDDDDD"/>
          </svg>`; // remove 버튼에 SVG 아이콘 추가
          removeButton.onclick = function () {
            checkbox.checked = false;
            const event = new Event("change", { bubbles: true });
            checkbox.dispatchEvent(event);
          };
          tagElement.appendChild(removeButton);
          selectedCategoriesContainer.appendChild(tagElement);
        }
      }
    });

    // 선택된 카테고리 유무에 따라 컨테이너 visibility 조절
    if (hasSelectedCategory) {
      selectedCategoriesContainer.classList.add("selected-filter-tags-visible"); // 선택된 카테고리가 있으면 보이도록 클래스 추가
    } else {
      selectedCategoriesContainer.classList.remove(
        "selected-filter-tags-visible"
      ); // 없으면 숨기도록 클래스 제거
    }
  }

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      updateSelectedCategoriesUI();
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function (e) {
      e.preventDefault();
      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          checkbox.checked = false;
          const event = new Event("change", { bubbles: true });
          checkbox.dispatchEvent(event);
        }
      });
    });
  }

  updateSelectedCategoriesUI(); // 페이지 로드 시 초기 UI 업데이트
});
