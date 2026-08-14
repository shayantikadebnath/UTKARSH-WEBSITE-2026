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

// ========== Form Handling (works with Formspree later) ==========
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // If you add a Formspree endpoint later, uncomment the fetch block
    //------------------------------------------------------------
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        btn.textContent = 'Submitted ✓';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2500);
      } else {
        throw new Error('Network error');
      }
    } catch (err) {
      btn.textContent = 'Error – try again';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2500);
    }
//---------------------------------------------------------------

    // Temporary local success (remove after connecting Formspree)
    setTimeout(() => {
      btn.textContent = 'Submitted ✓';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2200);
    }, 900);
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

// ========== Active Nav Link Highlight (extra safety) ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});