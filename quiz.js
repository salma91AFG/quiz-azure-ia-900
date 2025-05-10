let questions = [];
let current = 0;
let correctCount = 0;
let selected = null;

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];
  selected = null;

  document.getElementById('question').textContent = q.question;
  const choicesList = document.getElementById('choices');
  choicesList.innerHTML = '';
  document.getElementById('feedback').textContent = '';
  
  const nextBtn = document.getElementById('next');
  nextBtn.disabled = true;
  nextBtn.style.display = 'inline-block';

  q.choices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.onclick = () => selectAnswer(li, choice, q.answer);
    choicesList.appendChild(li);
  });
}

function selectAnswer(element, choice, correct) {
  // Empêche de recliquer
  document.querySelectorAll('#choices li').forEach(li => {
    li.style.pointerEvents = 'none';
    li.style.backgroundColor = (li.textContent === correct) ? '#b2f2bb' : '#f8d7da';
  });

  const feedback = document.getElementById('feedback');

  if (choice === correct) {
    feedback.textContent = 'Bonne réponse !';
    feedback.className = 'correct';
    correctCount++;
  } else {
    feedback.textContent = `Faux. Réponse correcte : ${correct}`;
    feedback.className = 'incorrect';
  }

  document.getElementById('next').disabled = false;
}

document.getElementById('next').onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    const score = Math.round((correctCount / questions.length) * 100);
    document.getElementById('quiz').innerHTML = `
      <h2>Quiz terminé !</h2>
      <p>Tu as eu ${correctCount} bonne(s) réponse(s) sur ${questions.length}.</p>
      <p>Score : ${score}%</p>
    `;
  }
};
