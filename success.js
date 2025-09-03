// 퀴즈 페이지에서 저장한 맞춘 개수 가져오기
const correctCount = localStorage.getItem("correctCount") || 0;

// 결과 글자 표시
document.getElementById("result").textContent = `10개 중 ${correctCount}개를 맞췄어요!`;

// 처음으로 버튼 클릭 시 퀴즈 시작 페이지로 이동
document.querySelector(".first").onclick = () => {
    window.location.href = "game.html";
};
