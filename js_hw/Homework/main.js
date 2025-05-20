//main.js
const customTag = {
  tagName: "div", // value: 태그 이름
  textContent: "", // value: 태그에 들어갈 텍스트
  styles: {
    // value: 태그에 적용할 스타일
    color: "black", // 글자 색
    fontSize: "18px", // 글자 크기
  },
  id: "", // 태그의 id
  class: [], // 태그에 붙일 클래스 리스트

  // ─────────── 수정된 메서드들 ───────────
  changeTagName(newTag) {
    this.tagName = newTag;
    this.render("container");
  },

  changeTextContent(newText) {
    this.textContent = newText;
    this.render("container");
  },

  changeStyles(property, value) {
    this.styles[property] = value;
    this.render("container");
  },

  setId(newId) {
    this.id = newId;
    this.render("container");
  },

  addClassName(className) {
    if (!this.class.includes(className)) {
      this.class.push(className);
      this.render("container");
    }
  },

  removeClassName(className) {
    this.class = this.class.filter((c) => c !== className);
    this.render("container");
  },
  // 여기 아래 부분은 수정하지 마시오.
  toHTML() {
    // 클래스 문자열 생성
    const classString =
      this.class.length > 0 ? ` class="${this.class.join(" ")}"` : "";

    // ID 문자열 생성
    const idString = this.id ? ` id="${this.id}"` : "";

    // 스타일 문자열 생성
    let styleString = "";
    for (const property in this.styles) {
      styleString += `${property == "fontSize" ? "font-size" : property}: ${
        this.styles[property]
      }; `;
    }
    styleString = styleString ? ` style="${styleString.trim()}"` : "";

    // 완성된 HTML 태그 반환
    return `<${this.tagName}${idString}${classString}${styleString}>${this.textContent}</${this.tagName}>`;
  },
  // DOM에 렌더링
  render(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      // 기존 내용을 지우고 새로 렌더링
      container.innerHTML = "";
      // 새 HTML 태그 추가
      container.innerHTML += this.toHTML();
    } else {
      console.error(`Container with ID "${containerId}" not found.`);
    }
  },
};
window.addEventListener("DOMContentLoaded", () => {
  customTag.render("container");
});
