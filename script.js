document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Ícones
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Elementos da Interface
  const welcomeScreen = document.getElementById('welcomeScreen');
  const loginScreen = document.getElementById('loginScreen');
  const dashboardApp = document.getElementById('dashboardApp');
  
  const stepBrand = document.getElementById('stepBrand');
  const stepWelcome = document.getElementById('stepWelcome');
  const stepProducer = document.getElementById('stepProducer');
  const interactionHint = document.getElementById('interactionHint');
  
  const loginForm = document.getElementById('loginForm');
  const loginName = document.getElementById('loginName');
  const loginFarm = document.getElementById('loginFarm');
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const togglePassword = document.getElementById('togglePassword');
  const submitBtn = document.getElementById('submitBtn');
  const toggleModeBtn = document.getElementById('toggleModeBtn');
  const demoLoginBtn = document.getElementById('demoLoginBtn');
  
  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');
  const fieldNameContainer = document.getElementById('fieldNameContainer');
  const fieldFarmContainer = document.getElementById('fieldFarmContainer');

  const userNameDisplay = document.getElementById('userNameDisplay');
  const userFarmDisplay = document.getElementById('userFarmDisplay');
  const userInitialsDisplay = document.getElementById('userInitialsDisplay');
  const welcomeGreeting = document.getElementById('welcomeGreeting');
  const logoutBtn = document.getElementById('logoutBtn');

  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');

  let canTransitionToLogin = false;
  let hasTransitioned = false;
  let isSignUpMode = true;

  // 1. Animações e Apresentação Inicial
  setTimeout(() => {
    stepBrand.classList.add('opacity-0', '-translate-y-4');
    setTimeout(() => {
      stepBrand.classList.add('hidden');
      stepWelcome.classList.remove('hidden');
      stepWelcome.classList.add('opacity-100', 'translate-y-0');
    }, 500);
  }, 2000);

  setTimeout(() => {
    stepWelcome.classList.add('opacity-0', '-translate-y-4');
    setTimeout(() => {
      stepWelcome.classList.add('hidden');
      stepProducer.classList.remove('hidden');
      stepProducer.classList.add('opacity-100', 'translate-y-0');
      canTransitionToLogin = true;
      interactionHint.classList.remove('opacity-0');
    }, 500);
  }, 4000);

  // Transição para a tela de autenticação por qualquer evento
  function goToLogin() {
    if (!canTransitionToLogin || hasTransitioned) return;
    hasTransitioned = true;
    welcomeScreen.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      welcomeScreen.classList.add('hidden');
      loginScreen.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
      loginScreen.classList.add('opacity-100', 'scale-100');
    }, 800);
  }

  window.addEventListener('mousemove', goToLogin);
  window.addEventListener('click', goToLogin);
  window.addEventListener('touchstart', goToLogin);
  window.addEventListener('wheel', goToLogin);

  // Exibir / Ocultar Senha
  togglePassword.addEventListener('click', () => {
    const isPassword = loginPassword.type === 'password';
    loginPassword.type = isPassword ? 'text' : 'password';
    togglePassword.innerHTML = isPassword 
      ? '<i class="fa-regular fa-eye-slash"></i>' 
      : '<i class="fa-regular fa-eye"></i>';
  });

  // Alternar Formulário entre Modo Cadastro e Modo Login
  toggleModeBtn.addEventListener('click', () => {
    isSignUpMode = !isSignUpMode;
    loginError.classList.add('hidden');

    if (isSignUpMode) {
      formTitle.textContent = 'Criar Perfil Agrovia';
      formSubtitle.textContent = 'Preencha seus dados para configurar sua fazenda';
      fieldNameContainer.classList.remove('hidden');
      fieldFarmContainer.classList.remove('hidden');
      loginName.setAttribute('required', 'true');
      loginFarm.setAttribute('required', 'true');
      submitBtn.textContent = 'Criar Perfil e Acessar';
      toggleModeBtn.innerHTML = 'Já tem um perfil? <span class="text-emerald-400 font-semibold underline">Fazer Login</span>';
    } else {
      formTitle.textContent = 'Acessar Conta';
      formSubtitle.textContent = 'Insira suas credenciais para gerenciar sua fazenda';
      fieldNameContainer.classList.add('hidden');
      fieldFarmContainer.classList.add('hidden');
      loginName.removeAttribute('required');
      loginFarm.removeAttribute('required');
      submitBtn.textContent = 'Entrar no Painel';
      toggleModeBtn.innerHTML = 'Ainda não tem perfil? <span class="text-emerald-400 font-semibold underline">Criar Perfil</span>';
    }
  });

  // 2. Navegação entre Abas do Dashboard
  const navButtons = document.querySelectorAll('.nav-btn');
  const viewSections = document.querySelectorAll('.view-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      navButtons.forEach(b => {
        b.classList.remove('bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20');
        b.classList.add('text-slate-400');
      });

      btn.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20');
      btn.classList.remove('text-slate-400');

      viewSections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });

      closeSidebar();
    });
  });

  // Controle de Visualização do Sidebar
  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
    sidebarOverlay.classList.add('opacity-100');
  }

  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.remove('opacity-100');
    sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
  }

  if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // 3. Processamento do Login
  function performLogin(name, farm) {
    loginError.classList.add('hidden');
    const producerName = name.trim() || 'Produtor';
    const farmName = farm.trim() || 'Fazenda Ouro Verde';

    userNameDisplay.textContent = producerName;
    userFarmDisplay.textContent = farmName;
    welcomeGreeting.innerHTML = `Olá, ${producerName} <i class="fa-solid fa-seedling text-emerald-400 text-lg sm:text-xl"></i>`;
    
    const initials = producerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    userInitialsDisplay.textContent = initials || 'P';

    loginScreen.classList.remove('opacity-100', 'scale-100');
    loginScreen.classList.add('opacity-0', 'scale-95', 'pointer-events-none');

    setTimeout(() => {
      loginScreen.classList.add('hidden');
      dashboardApp.classList.remove('hidden');
      initCharts();
    }, 600);
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = loginName.value;
    const farm = loginFarm.value;

    if (isSignUpMode && (!name.trim() || !farm.trim())) {
      loginError.textContent = 'Por favor, informe seu nome e fazenda!';
      loginError.classList.remove('hidden');
      return;
    }

    performLogin(isSignUpMode ? name : 'Produtor', isSignUpMode ? farm : 'Fazenda Ouro Verde');
  });

  demoLoginBtn.addEventListener('click', () => {
    performLogin('Carlos Andrade', 'Fazenda Santa Maria');
  });

  logoutBtn.addEventListener('click', () => {
    location.reload();
  });

  // 4. Inicialização de Gráficos (Chart.js)
  let chartsLoaded = false;
  function initCharts() {
    if (chartsLoaded) return;
    chartsLoaded = true;

    const ctxProd = document.getElementById('productionChart').getContext('2d');
    new Chart(ctxProd, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Produção Real (Ton)',
            data: [420, 580, 750, 900, 1100, 1050],
            backgroundColor: '#10b981',
            borderRadius: 8
          },
          {
            label: 'Meta (Ton)',
            data: [500, 600, 700, 850, 1000, 1100],
            type: 'line',
            borderColor: '#f59e0b',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8' } } },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { display: false } },
          y: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } }
        }
      }
    });

    const ctxCosts = document.getElementById('costsChart').getContext('2d');
    new Chart(ctxCosts, {
      type: 'doughnut',
      data: {
        labels: ['Sementes', 'Fertilizantes', 'Defensivos', 'Combustível'],
        datasets: [{
          data: [35, 30, 20, 15],
          backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#6366f1'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } } },
        cutout: '70%'
      }
    });
  }
});