(function () {
  const faqQuestions = document.querySelectorAll('.about-us__faq-question');

  function toggleFaq(event) {
    const faqElement = event.target.closest('.about-us__faq-item');
    const faqAnswer = faqElement.querySelector('.about-us__answer-panel');
    const faqArrow = faqElement.querySelector('.about-us__faq-question-button');
    faqArrow.classList.toggle('active');
    faqAnswer.classList.toggle('active');
  }

  faqQuestions.forEach((question) =>
    question.addEventListener('click', (event) => toggleFaq(event)),
  );
})();
