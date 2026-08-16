// ========== Mobile Menu ==========
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });
}

// ========== Form Handling (Register + Contact) ==========
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const popup = document.getElementById('successPopup');
    const okBtn = document.getElementById('successOkBtn');

    btn.textContent = 'Submitting...';
    btn.disabled = true;

    try {
      await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
      });

      // Success
      form.reset();
      popup.classList.add('show');

      // When user clicks OK
      okBtn.onclick = () => {
        popup.classList.remove('show');
        btn.textContent = originalText;
        btn.disabled = false;
      };

    } catch (err) {
      console.error(err);
      btn.textContent = 'Error – try again';
      alert('Something went wrong. Please try again.');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2500);
    }
  });
});

// ========== Simple Scroll Fade-in Animation ==========
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// ========== Active Nav Link Highlight ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');

  if (
    href === currentPage ||
    (currentPage === '' && href === 'index.html')
  ) {
    link.classList.add('active');
  }
});
