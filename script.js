// Smooth scrolling para navegación
document.querySelectorAll('nav a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});
var sectionIds = Array.from(document.querySelectorAll('section')).map(function(s){ return s.id; });
var navLinks = Array.from(document.querySelectorAll('nav a'));
var sectionObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting) {
      var id = entry.target.id;
      navLinks.forEach(function(link){ link.classList.toggle('active', link.getAttribute('href') === '#' + id); });
      entry.target.classList.add('visible');
    }
  });
}, { rootMargin: '-20% 0px -20% 0px', threshold: 0.1 });
document.querySelectorAll('section').forEach(function(sec){ sectionObserver.observe(sec); });

// Animaciones de habilidades con delay escalonado
var skillObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry, index){
    if (entry.isIntersecting) {
      setTimeout(function(){
        entry.target.classList.add('visible');
      }, index * 100);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill').forEach(function(s){ skillObserver.observe(s); });

// Animaciones de proyectos con delay escalonado
var projectObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry, index){
    if (entry.isIntersecting) {
      setTimeout(function(){
        entry.target.classList.add('visible');
      }, index * 150);
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.project').forEach(function(p){ projectObserver.observe(p); });

// Botón de volver arriba
var backToTopBtn = document.getElementById('backToTop');
function toggleBackToTop(){
  if (!backToTopBtn) return;
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove('hidden');
  } else {
    backToTopBtn.classList.add('hidden');
  }
}
toggleBackToTop();
window.addEventListener('scroll', toggleBackToTop, { passive: true });
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function(){ 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  });
}

// Toggle de tema oscuro/claro
var themeToggle = document.getElementById('themeToggle');
var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
var savedTheme = localStorage.getItem('theme');

function applyTheme(theme){
  var isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.style.transform = 'rotate(0deg)';
    setTimeout(function(){
      themeToggle.style.transform = 'rotate(360deg)';
    }, 10);
  }
}

applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', function(){
    var next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

// Accesibilidad y efectos adicionales
document.querySelectorAll('section').forEach(function(sec){
  sec.setAttribute('tabindex', '-1');
});

// Efecto de parallax suave en el header
window.addEventListener('scroll', function(){
  var scrolled = window.pageYOffset;
  var header = document.querySelector('header');
  if (header) {
    header.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
  }
}, { passive: true });

// Efecto de typing en el título principal
function typeWriter(element, text, speed = 100) {
  var i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Aplicar efecto de typing al cargar la página
document.addEventListener('DOMContentLoaded', function(){
  var title = document.querySelector('header h1');
  if (title) {
    var originalText = title.textContent;
    typeWriter(title, originalText, 150);
  }
});

// Efecto de hover en las cards de proyectos
document.querySelectorAll('.project').forEach(function(project){
  project.addEventListener('mouseenter', function(){
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  project.addEventListener('mouseleave', function(){
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Animación de entrada para el header
document.addEventListener('DOMContentLoaded', function(){
  var header = document.querySelector('header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(-50px)';
    setTimeout(function(){
      header.style.transition = 'all 1s ease-out';
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    }, 100);
  }
});


