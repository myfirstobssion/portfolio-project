/**
 * Personal Portfolio Website - Core Scripts
 * Features: Dark/Light Mode, Typing Effect, Project Filtering, Modal Preview,
 * Scroll Reveal, Metric Counters, Form Validation & Toast System.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Theme Management (Dark / Light)
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Initialize theme from storage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  htmlRoot.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  // =========================================================================
  // 2. Sticky Header & Active Nav Scroll Spy
  // =========================================================================
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky header shadow
    if (scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.2s ease';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Navigation link highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => navObserver.observe(section));

  // =========================================================================
  // 3. Mobile Navigation Drawer
  // =========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 4. Hero Section Typing Effect
  // =========================================================================
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Full-Stack Web Applications',
    'Scalable Cloud Architecture',
    'High-Performance APIs',
    'Intuitive User Interfaces'
  ];

  if (typingElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 600);
  }

  // =========================================================================
  // 5. Scroll Reveal & Metric Counter Animation
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it contains metric counters, animate them
        if (entry.target.classList.contains('metrics-grid')) {
          animateCounters(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  function animateCounters(container) {
    const counters = container.querySelectorAll('.metric-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const duration = 1800;
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // =========================================================================
  // 6. Project Filtering
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 7. Project Modal Dialog & Data
  // =========================================================================
  const projectDetails = {
    'project-1': {
      title: 'CloudScale Analytics Platform',
      category: 'Full Stack SaaS Solution',
      description: 'CloudScale is an enterprise-grade cloud metrics and analytics engine designed to capture telemetry across hybrid distributed microservices. It features automated anomaly detection, custom visual query builders, and sub-second querying across millions of historical log records.',
      features: [
        'Real-time streaming telemetry with WebSockets & Kafka integration',
        'Multi-tenant role-based access control (RBAC) with JWT auth',
        'Custom interactive Chart.js & D3 visual dashboard designer',
        'Containerized with Docker & deployed with automated CI/CD pipelines'
      ],
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
      github: 'https://github.com',
      demo: '#'
    },
    'project-2': {
      title: 'PromptForge AI Studio',
      category: 'Frontend & Generative AI Tooling',
      description: 'An advanced browser-based studio for prompt engineers and software architects. Allows testing, chaining, evaluating, and stress-testing multi-model LLM workflows with side-by-side prompt diffing and cost/token estimation.',
      features: [
        'Visual node-based prompt chaining workflow editor',
        'Real-time token streaming with live markdown rendering',
        'Prompt versioning and test snapshot management',
        'Export chains directly to Python & Node.js SDK code snippets'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Canvas API'],
      github: 'https://github.com',
      demo: '#'
    },
    'project-3': {
      title: 'Synapse High-Speed Gateway',
      category: 'Backend Architecture & Microservices',
      description: 'High-throughput reverse proxy and API Gateway built with FastAPI and Redis. Designed to sit at the edge of distributed architectures to enforce rate limits, authenticate requests, and minimize backend service load.',
      features: [
        'Token-bucket rate limiter with sub-millisecond overhead',
        'Automatic JWT token signature caching and edge validation',
        'Circuit breaker pattern to protect downstream services during degradation',
        'Prometheus metrics endpoint ready for Grafana integration'
      ],
      techStack: ['Python', 'FastAPI', 'Redis', 'OAuth2', 'Docker', 'Prometheus'],
      github: 'https://github.com',
      demo: '#'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalContent = document.getElementById('modal-content');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];

      if (data && projectModal && modalContent) {
        modalContent.innerHTML = `
          <span class="modal-category">${data.category}</span>
          <h3 id="modal-title">${data.title}</h3>
          <p class="modal-body-text">${data.description}</p>
          
          <h4 class="modal-section-title">Key Engineering Highlights</h4>
          <ul class="modal-feature-list">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <h4 class="modal-section-title">Technologies Used</h4>
          <div class="project-tags" style="margin-bottom: 1.5rem;">
            ${data.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>

          <div class="modal-actions">
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              <span>View Source Code</span>
            </a>
            <button class="btn btn-sm btn-primary live-demo-modal-trigger">
              <span>Launch Live Demo</span>
            </button>
          </div>
        `;

        projectModal.showModal();

        // Attach live demo handler inside modal
        const demoBtn = modalContent.querySelector('.live-demo-modal-trigger');
        demoBtn?.addEventListener('click', () => {
          showToast('Live demo preview is currently in staging mode.', 'info');
        });
      }
    });
  });

  if (closeModalBtn && projectModal) {
    closeModalBtn.addEventListener('click', () => projectModal.close());
    // Close on backdrop click
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.close();
      }
    });
  }

  // Live preview click trigger
  document.querySelectorAll('.live-demo-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Live demo preview is currently in staging mode.', 'info');
    });
  });

  // =========================================================================
  // 8. Contact Form Validation & Submission
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameInput.focus();
        isValid = false;
      } else {
        nameError.textContent = '';
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please provide an email address.';
        if (isValid) emailInput.focus();
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        if (isValid) emailInput.focus();
        isValid = false;
      } else {
        emailError.textContent = '';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please write a message.';
        if (isValid) messageInput.focus();
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters.';
        if (isValid) messageInput.focus();
        isValid = false;
      } else {
        messageError.textContent = '';
      }

      if (isValid) {
        // UI sending state
        const btnContent = submitBtn.querySelector('.btn-text-content');
        const origText = btnContent ? btnContent.textContent : 'Send Message';
        if (btnContent) btnContent.textContent = 'Sending Message...';
        submitBtn.disabled = true;

        setTimeout(() => {
          if (btnContent) btnContent.textContent = origText;
          submitBtn.disabled = false;
          contactForm.reset();

          showToast('Message sent successfully! Thanks for reaching out, Tushar will respond shortly.', 'success');
        }, 1200);
      }
    });
  }

  // =========================================================================
  // 9. Resume Download Trigger
  // =========================================================================
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('Resume download started! (Simulated PDF download)', 'success');
    });
  }

  // =========================================================================
  // 10. Toast Notification System
  // =========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `
      <span style="font-weight: 700; font-size: 1.1rem;">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3800);
  }

  // =========================================================================
  // 11. Footer Dynamic Year
  // =========================================================================
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
