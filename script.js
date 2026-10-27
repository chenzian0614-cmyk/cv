const languageButtons = document.querySelectorAll('.lang-button');
const translatableElements = document.querySelectorAll('[data-en][data-zh]');

function setLanguage(language) {
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = language === 'zh' ? '陈子涵个人简历' : 'Chen Zihan CV';

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  localStorage.setItem('chen-zihan-cv-language', language);
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem('chen-zihan-cv-language');
const browserLanguage = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
setLanguage(savedLanguage || browserLanguage);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
