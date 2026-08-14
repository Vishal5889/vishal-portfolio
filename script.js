const header = document.getElementById('header');
    const topBtn = document.getElementById('top');
    const menu = document.getElementById('menu');
    const navlinks = document.getElementById('navlinks');
    const cursor = document.getElementById('cursor');

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', scrollY > 30);
      topBtn.classList.toggle('visible', scrollY > 500);
    });

    if (matchMedia('(pointer:fine)').matches) {
      window.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      document.querySelectorAll('a,button,.project').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.width='32px'; cursor.style.height='32px'; cursor.style.background='rgba(255,255,255,.08)'; });
        el.addEventListener('mouseleave', () => { cursor.style.width='18px'; cursor.style.height='18px'; cursor.style.background='transparent'; });
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          entry.target.querySelectorAll?.('.fill').forEach(bar => bar.style.width = bar.dataset.width);
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Subtle interactive card tilt on desktop.
    document.querySelectorAll('.project').forEach(card => {
      card.addEventListener('mousemove', e => {
        if (!matchMedia('(pointer:fine)').matches) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });


    // Reliable contact buttons: open Gmail compose in a new tab.
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const [addr, query] = href.substring(7).split('?');
        const params = new URLSearchParams(query || '');
        const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to='
          + encodeURIComponent(addr)
          + '&su=' + encodeURIComponent(params.get('subject') || 'Portfolio Contact')
          + '&body=' + encodeURIComponent(params.get('body') || 'Hello Vishal,');
        window.open(gmail, '_blank', 'noopener');
      });
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    // Lightweight particle field.
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
    function init(){
      particles = Array.from({length: Math.min(75, Math.floor(innerWidth/18))}, () => ({
        x:Math.random()*canvas.width, y:Math.random()*canvas.height,
        vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25, r:Math.random()*1.4+.3
      }));
    }
    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle='rgba(150,180,255,.45)';
      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width)p.vx*=-1;
        if(p.y<0||p.y>canvas.height)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    addEventListener('resize',()=>{resize();init()});
    resize();init();
    if (window.matchMedia('(min-width: 821px)').matches) animate();
/* FINAL MOBILE MENU - v4 */
document.addEventListener('DOMContentLoaded', function(){
  const menu = document.getElementById('menu');
  const nav = document.getElementById('navlinks');
  if(!menu || !nav) return;
  menu.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
    });
  });
});
