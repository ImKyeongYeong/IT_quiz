// DOM이 완전히 로드된 후 실행되도록
window.addEventListener("DOMContentLoaded", () => {
    // 퀴즈 페이지에서 저장한 맞춘 개수 가져오기
    const correctCount = localStorage.getItem("correctCount") || 0;

    // 결과 글자 표시
    const resultEl = document.getElementById("result");
    resultEl.textContent = `10개 중 ${correctCount}개를 맞췄어요!`;

    // 처음으로 버튼 클릭 시 퀴즈 시작 페이지로 이동
    const firstBtn = document.querySelector(".first");
    firstBtn.addEventListener("click", () => {
        window.location.href = "game.html";
    });
});
