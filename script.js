document.querySelectorAll('nav a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
  });
});

var sectionIds = Array.from(document.querySelectorAll('section')).map(function(s){ return s.id; });
var navLinks = Array.from(document.querySelectorAll('nav a'));
var observer = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting) {
      var id = entry.target.id;
      navLinks.forEach(function(link){ link.classList.toggle('active', link.getAttribute('href') === '#' + id); });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
document.querySelectorAll('section').forEach(function(sec){ observer.observe(sec); });

var skillObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill').forEach(function(s){ skillObserver.observe(s); });

var backToTopBtn = document.getElementById('backToTop');
function toggleBackToTop(){
  if (!backToTopBtn) return;
  if (window.scrollY > 300) backToTopBtn.classList.remove('hidden');
  else backToTopBtn.classList.add('hidden');
}
toggleBackToTop();
window.addEventListener('scroll', toggleBackToTop, { passive: true });
if (backToTopBtn) backToTopBtn.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });

var themeToggle = document.getElementById('themeToggle');
var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
var savedTheme = localStorage.getItem('theme');
function applyTheme(theme){
  var isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  if (themeToggle) themeToggle.textContent = isDark ? '☀️' : '🌙';
}
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
if (themeToggle) themeToggle.addEventListener('click', function(){
  var next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

document.querySelectorAll('section').forEach(function(sec){
  sec.setAttribute('tabindex', '-1');
});


