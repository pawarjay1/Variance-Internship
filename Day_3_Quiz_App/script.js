// const quizData = [
//   {
//     question: "Which language runs in a web browser?",
//     a: "Java",
//     b: "C",
//     c: "Python",
//     d: "JavaScript",
//     correct: "d",
//   },
//   {
//     question: "What does CSS stand for?",
//     a: "Central Style Sheets",
//     b: "Cascading Style Sheets",
//     c: "Computer Style Sheets",
//     d: "Creative Style Sheets",
//     correct: "b",
//   },
//   {
//     question: "What year was JavaScript launched?",
//     a: "1996",
//     b: "1995",
//     c: "1994",
//     d: "None of the above",
//     correct: "b",
//   },
//   {
//     question: "What is React primarily used for?", 
//     a: "Back-end server development",
//     b: "Building user interfaces",
//     c: "Database management",
//     d: "Styling web pages",
//     correct: "b",
//   },
//   {
//     question: "Which of the following is used to manage state in a functional React component?",
//     a: "useEffect()",
//     b: "useState()",
//     c: "setState()",
//     d: "componentDidMount",
//     correct: "b"
//   }
// ];

// const quiz = document.querySelector(".quiz-container");
// const answerEls = document.querySelectorAll(".answer");
// const questionEl = document.getElementById("question");
// const a_text = document.getElementById("a_text");
// const b_text = document.getElementById("b_text");
// const c_text = document.getElementById("c_text");
// const d_text = document.getElementById("d_text");
// const submitBtn = document.getElementById("submit");

// let currentQuiz = 0;
// let score = 0;

// //intialquize loading 
// loadQuiz();

// function loadQuiz() {
//   deselectAnswers();   

//   const currentQuizData = quizData[currentQuiz];
//   questionEl.innerText = currentQuizData.question;
//   a_text.innerText = currentQuizData.a;
//   b_text.innerText = currentQuizData.b;
//   c_text.innerText = currentQuizData.c;
//   d_text.innerText = currentQuizData.d;

//   // console.log("----> ",typeof(currentQuizData)); 
// }

// function deselectAnswers() {
//   answerEls.forEach(answer => (answer.checked = false));  //deselect the radio button 
// }

// // store the value of answerEls into answer
// function getSelected() {
//   let answer;
//   answerEls.forEach(answerEl => {
//     if (answerEl.checked) {
//       answer = answerEl.id;
//     }
//   });
//   return answer;
// }

// submitBtn.addEventListener("click", () => {
//   const answer = getSelected();

//   console.log(answer); 

//   if (answer) {
//     if (answer === quizData[currentQuiz].correct) {
//       score++;
//     }

//     currentQuiz++;

//     if (currentQuiz < quizData.length) {
//       loadQuiz();
//     } else {
//       quiz.innerHTML = `
//         <h2>You scored ${score} out of ${quizData.length} and you'r ${score<3 ? "failed try again :(" : "passed :)"} </h2>
//         <button onclick="location.reload()" class="restart-btn">Restart Quiz</button>
//       `;
//     }
//   }
// });


// //localstorage implementation 

// // next and preview option 







// ================== QUIZ DATA ==================
const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Computer Style Sheets",
    d: "Creative Style Sheets",
    correct: "b",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "None of the above",
    correct: "b",
  },
  {
    question: "What is React primarily used for?",
    a: "Back-end server development",
    b: "Building user interfaces",
    c: "Database management",
    d: "Styling web pages",
    correct: "b",
  },
  {
    question: "Which hook is used to manage state in React?",
    a: "useEffect",
    b: "useState",
    c: "setState",
    d: "componentDidMount",
    correct: "b",
  }
];

// ================== DOM ELEMENTS ==================
const quiz = document.querySelector(".quiz-container");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// ================== STATE & STORAGE ==================
const STORAGE_KEY = "quizAppData";

let quizState = {
  currentQuiz: 0,
  score: 0,
  answers: Array(quizData.length).fill(null)
};

// Load saved state
const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedState) {
  quizState = savedState;
}

// ================== FUNCTIONS ==================
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizState));
}

function loadQuiz() {
  deselectAnswers();

  const currentData = quizData[quizState.currentQuiz];
  questionEl.innerText = currentData.question;
  a_text.innerText = currentData.a;
  b_text.innerText = currentData.b;
  c_text.innerText = currentData.c;
  d_text.innerText = currentData.d;

  // Restore previous answer
  const savedAnswer = quizState.answers[quizState.currentQuiz];
  if (savedAnswer) {
    document.getElementById(savedAnswer).checked = true;
  }

  prevBtn.disabled = quizState.currentQuiz === 0;
}

function deselectAnswers() {
  answerEls.forEach(el => el.checked = false);
}

function getSelected() {
  let answer = null;
  answerEls.forEach(el => {
    if (el.checked) answer = el.id;
  });
  return answer;
}

// ================== EVENT LISTENERS ==================
nextBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (!answer) return alert("Please select an answer");

  const correct = quizData[quizState.currentQuiz].correct;
  const prevAnswer = quizState.answers[quizState.currentQuiz];

  // Update score properly
  if (prevAnswer === correct) quizState.score--;
  if (answer === correct) quizState.score++;

  quizState.answers[quizState.currentQuiz] = answer;
  quizState.currentQuiz++;

  if (quizState.currentQuiz < quizData.length) {
    saveState();
    loadQuiz();
  } else {
    localStorage.removeItem(STORAGE_KEY);
    quiz.innerHTML = `
      <h2>You scored ${quizState.score} out of ${quizData.length}</h2>
      <button onclick="location.reload()">Restart Quiz</button>
    `;
  }
});

prevBtn.addEventListener("click", () => {
  if (quizState.currentQuiz > 0) {
    quizState.currentQuiz--;
    saveState();
    loadQuiz();
  }
});

// ================== INIT ==================
loadQuiz();




