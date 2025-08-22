document.addEventListener('DOMContentLoaded', () => {
  // Motion dos botões
  const btns = document.querySelectorAll('.btn-motion');
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.08)';
      btn.style.boxShadow = '0 0 25px #1793D1';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = 'none';
    });
  });

  // Partículas
  const animatedBg = document.querySelector('.animated-bg');
  for(let i=0;i<50;i++){
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = (5 + Math.random() * 10) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
    animatedBg.appendChild(particle);
  }

  // Modal Login/Register
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');

  loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
  closeModal.addEventListener('click', () => loginModal.classList.remove('active'));
  window.addEventListener('click', e => { if(e.target === loginModal) loginModal.classList.remove('active'); });

  // Tabs Login/Register
  const loginTabBtn = document.getElementById('loginTab');
  const registerTabBtn = document.getElementById('registerTab');
  const modalTitle = document.getElementById('modalTitle');
  const submitBtn = document.getElementById('submitBtn');

  let mode = 'login';
  loginTabBtn.addEventListener('click', () => {
    mode = 'login';
    loginTabBtn.classList.add('active'); loginTabBtn.classList.remove('inactive');
    registerTabBtn.classList.remove('active'); registerTabBtn.classList.add('inactive');
    modalTitle.textContent = 'Login';
    submitBtn.textContent = 'Entrar';
  });
  registerTabBtn.addEventListener('click', () => {
    mode = 'register';
    registerTabBtn.classList.add('active'); registerTabBtn.classList.remove('inactive');
    loginTabBtn.classList.remove('active'); loginTabBtn.classList.add('inactive');
    modalTitle.textContent = 'Registrar';
    submitBtn.textContent = 'Registrar';
  });

  // Banco fake
  const usersDB = [];

  const authForm = document.getElementById('authForm');
  authForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!username || !email || !password) { alert('Preencha todos os campos!'); return; }

    if(mode === 'login') {
      const user = usersDB.find(u => u.email === email && u.password === password);
      if(user) {
        alert(`Bem-vindo de volta, ${user.username}!`);
      } else {
        const newUser = { username, email, password };
        usersDB.push(newUser);
        alert(`Usuário não encontrado. Registrado automaticamente como ${username}!`);
      }
    } else if(mode === 'register') {
      const exists = usersDB.find(u => u.email === email);
      if(exists) {
        alert('Este email já está cadastrado!');
      } else {
        usersDB.push({ username, email, password });
        alert(`Registrado com sucesso! Bem-vindo, ${username}!`);
      }
    }

    loginModal.classList.remove('active');
    authForm.reset();
  });
});



