let currentIndex = 0;
let selected = "";
let correctCount = 0;
let timerInterval;
let remaining = 10;
let timerTimeoutId;
const timeLimit = 10;

let problems = [
  { q: "정보를 저장하고 계산하는 기계", a: "컴퓨터" },
  { q: "컴퓨터에서 실행되는 프로그램과 관련 데이터", a: "소프트웨어" },
  { q: "컴퓨터의 두뇌 역할을 하는 핵심 부품, 중앙처리장치", a: "CPU" },
  { q: "네트워크 접근을 제어해 외부 침입을 막는 보안 시스템", a: "방화벽" },
  { q: "컴퓨터에 침입한 바이러스를 찾아 없애는 프로그램", a: "백신" },
  { q: "컴퓨터를 켜면 가장 먼저 작동해 전체를 관리하는 시스템", a: "운영체제" },
  { q: "화면에 표시되는 그림,영상,3D 그래픽을 처리하는 컴퓨터 부품", a: "그래픽카드" },
  { q: "저장장치를 완전히 깨끗하게 비우는 작업", a: "포맷" },
  { q: "컴퓨터의 정상 작동을 방해하거나 피해를 주는 악성 프로그램", a: "악성코드" },
  { q: "인터넷을 안전하게 사용할 수 있도록 연결을 암호화하는 가상 통로", a: "VPN" }
];

const questionEl = document.getElementById("bubble");
const slotsEl = document.getElementById("slots");
const lettersEl = document.getElementById("letters");
const gaonEl = document.querySelector(".gaon");
const ahssiyouEl = document.querySelector(".Gaon");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.querySelector(".timer");
const remainingTextEl = document.getElementById("remaining-text");

window.onload = () => {
  gaonEl.style.display = "none";
  ahssiyouEl.style.display = "none";
  showProblem();
  startTimer(); // 페이지가 로드되자마자 타이머를 시작
  updateRemaining();
}

function updateRemaining() {
  const remaining = problems.length - currentIndex;
  remainingTextEl.textContent = `${remaining}문제 남았어!`
}

function showProblem() {
  const problem = problems[currentIndex];
  questionEl.textContent = problem.q;

  // 슬롯 초기화
  slotsEl.innerHTML = "";
  for (let i = 0; i < problem.a.length; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slotsEl.appendChild(slot);
  }

  // 글자 버튼 생성
  lettersEl.innerHTML = "";
  let letters = problem.a.split("");
  const extra = ["가", "나", "다", "라", "마", "바", "사","아","자","하"];
  while (letters.length < problem.a.length + 3) {
    const randomExtra = extra[Math.floor(Math.random() * extra.length)];
    if (!letters.includes(randomExtra)) {
      letters.push(randomExtra);
    }
  }
  letters.sort(() => Math.random() - 0.5);

  letters.forEach(ch => {
    const btn = document.createElement("div");
    btn.classList.add("letter");
    btn.textContent = ch;
    btn.style.backgroundColor = "#FECD2F";
    btn.disabled = false;
    btn.onclick = () => selectLetter(ch, btn);
    lettersEl.appendChild(btn);
  });

  selected = "";
  gaonEl.style.display = "none";
  ahssiyouEl.style.display = "none";
}

function selectLetter(ch, btn) {
  const emptySlot = Array.from(slotsEl.children).find(s => s.textContent === "");
  if (!emptySlot) return;

  emptySlot.textContent = ch;
  emptySlot.style.backgroundColor = btn.style.backgroundColor;
  selected += ch;
  btn.classList.add("disabled");
  btn.disabled = true;
  btn.style.backgroundColor = "#A7A5A0";
  btn.style.color = "#fff";
  btn.style.border = "3px solid #707070";

  if (selected.length === problems[currentIndex].a.length) {
    clearInterval(timerInterval);
    checkAnswer();
    answered = true; //문제를 풀었음을 표시
  }
}


function checkAnswer() {
  clearTimeout(timerTimeoutId);
  const timerEl = document.querySelector(".timer");
  const computedStyle = window.getComputedStyle(timerEl)
  const currentTransform = computedStyle.getPropertyValue('transform');

  timerEl.style.transition = 'none';
  timerEl.style.transform = currentTransform;
  
  const answer = problems[currentIndex].a;
  if (selected === "시간초과") {
    gaonEl.style.display = "none";
    ahssiyouEl.style.display = "block";
    return;
  }
  if (selected === answer) {
    gaonEl.style.display = "block";
    ahssiyouEl.style.display = "none";
    correctCount++;

    Array.from(slotsEl.children).forEach(slot => {
      slot.style.backgroundColor = "#76FF76";
      slot.style.color = "#fff";
      slot.style.border = "2px solid #37CF00";
    })
  } else {
    gaonEl.style.display = "none";
    ahssiyouEl.style.display = "block";

    Array.from(slotsEl.children).forEach(slot => {
      slot.style.backgroundColor = "#FF8383";
      slot.style.color = "#fff";
      slot.style.border = "2px solid #FF0000";
    })
  }
}

slotsEl.addEventListener("click", (e) => {
  const slot = e.target;
  if (!slot.classList.contains("slot") || slot.textContent === "") return;

  const ch = slot.textContent;
  const letterBtn = Array.from(lettersEl.children).find(btn => btn.textContent === ch && btn.disabled);
  if (letterBtn) {
    letterBtn.classList.remove("disabled");
    letterBtn.disabled = false;
     letterBtn.style.backgroundColor = "#FECD2F"; // 원래 버튼 배경색
     letterBtn.style.color = "#ffffffff";             // 원래 글자색
     letterBtn.style.border = "3px solid #9C610E"; // 원래 테두리
  }

  slot.textContent = "";
  slot.style.backgroundColor = ""; // 슬롯 배경 초기화
  slot.style.color = "";
  slot.style.border = ""; // 슬롯 테두리 초기화
  selected = selected.split(ch).join("");
});

nextBtn.onclick = () => {
  if (!answered) {
    alert("문제를 풀고 나서 다음 문제로 넘어가세요!");
    return;
  }

  gaonEl.style.display = "none";
  ahssiyouEl.style.display = "none";
  selected = "";
  currentIndex++;
  answered = false; //다음 문제에서는 아직 풀이 안 한 상태로 초기화

  if (currentIndex < problems.length) {
    showProblem();
    startTimer(); // 다음 문제로 넘어갈 때마다 타이머를 다시 시작
    updateRemaining();
  } else {
    localStorage.setItem("correctCount", correctCount);
    if (correctCount >= 5) {
      window.location.href = "success.html";
    } else {
      window.location.href = "failed.html";
    }
  }
}

function startTimer() {
  const timerEl = document.querySelector(".timer");
  timerEl.style.transition = 'none';

  // 새 문제 시작될 때 타이머 바 원래 위치 재설정
  timerEl.style.transform = "scaleX(1)";
  timerEl.offsetWidth;
  // 0.1초 후에 타이머 애니메이션 시작
  setTimeout(() => {
    timerEl.style.transition = 'transform 10s linear';
    timerEl.style.transform = "scaleX(0)";
  }, 100);

  // 10초 후 '시간 초과' 로직 실행
  timerTimeoutId = setTimeout(() => {
    if (!answered) {
      selected = "시간초과"; 
      checkAnswer();
      Array.from(lettersEl.children).forEach(btn => btn.disabled = true);
      answered = true;
    }
  }, 10000);
}