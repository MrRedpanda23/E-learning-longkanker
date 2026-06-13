function renderQuiz(containerId, quizKey){
  const container = document.getElementById(containerId);
  const data = QUIZ_DATA[quizKey];
  if(!data || !data.length){
    container.innerHTML = '<p>Geen vragen gevonden voor deze quiz.</p>';
    return;
  }
  data.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    const h = document.createElement('h4');
    h.textContent = /^\d+\./.test(q.question) ? q.question : (qi+1) + '. ' + q.question;
    qDiv.appendChild(h);

    q.choices.forEach((c, ci) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.textContent = c.text;
      btn.addEventListener('click', () => {
        const allBtns = qDiv.querySelectorAll('.opt');
        allBtns.forEach(b => b.disabled = true);
        if(c.correct){
          btn.classList.add('correct');
        } else {
          btn.classList.add('incorrect');
          q.choices.forEach((c2, ci2) => {
            if(c2.correct){
              allBtns[ci2].classList.add('correct');
            }
          });
        }
      });
      qDiv.appendChild(btn);
    });
    container.appendChild(qDiv);
  });
}
