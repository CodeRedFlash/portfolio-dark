// ===== MOBILE NAV TOGGLE =====
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    burger?.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.setAttribute('aria-hidden', String(expanded));
    });

    // Close mobile menu on link click
    mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
    }));

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e){
        const id = this.getAttribute('href');
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      })
    });

    // ===== INTERSECTION OBSERVER (reveal on scroll) =====
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      })
    }, {threshold: .15});
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // ===== TESTIMONIALS CAROUSEL =====
    const track = document.getElementById('track');
    const dots = Array.from(document.querySelectorAll('.dot'));
    let index = 0; let interval;

    function go(i){
      index = (i + dots.length) % dots.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d,di)=>{
        d.setAttribute('aria-selected', String(di===index));
        d.toggleAttribute('aria-current', di===index);
      });
    }
    function start(){ interval = setInterval(()=>go(index+1), 4500); }
    function stop(){ clearInterval(interval); }

    dots.forEach((d,di)=>{
      d.addEventListener('click', ()=>{ stop(); go(di); start(); });
      d.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ stop(); go(di); start(); } });
    });

    start();

    // Pause on hover/focus for accessibility
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    // ===== CONTACT FORM (client-side demo) =====
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.toString().trim();
      const email = data.get('email')?.toString().trim();
      const msg = data.get('message')?.toString().trim();
      // simple validation
      const emailOk = /.+@.+\..+/.test(email||'');
      if(!name || !emailOk || !msg){
        note.textContent = 'Please fill all fields with a valid email.';
        note.classList.add('err');
        note.style.display = 'inline-flex';
        return;
      }
      // demo success (no backend). Replace with real endpoint/mail service.
      note.textContent = 'Thanks! Your message has been queued.';
      note.classList.remove('err');
      note.style.display = 'inline-flex';
      form.reset();
    });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();
