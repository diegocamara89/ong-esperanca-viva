import { validarFormulario, validarCampo, limparFeedback, CAMPOS } from './form.js';

/* ===== Menu responsivo: hambúrguer e dropdown ===== */
const botaoMenu = document.querySelector('.nav-toggle');
const listaMenu = document.querySelector('#menu-principal');
const itemComSub = document.querySelector('.has-sub');
const botaoSub = document.querySelector('.sub-toggle');

function alternarMenu(abrir) {
  const aberto = abrir ?? !listaMenu.classList.contains('is-open');
  listaMenu.classList.toggle('is-open', aberto);
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

function alternarSubmenu(abrir) {
  const aberto = abrir ?? !itemComSub.classList.contains('is-open');
  itemComSub.classList.toggle('is-open', aberto);
  botaoSub.setAttribute('aria-expanded', String(aberto));
}

botaoMenu.addEventListener('click', () => alternarMenu());
botaoSub.addEventListener('click', () => alternarSubmenu());
listaMenu.addEventListener('click', (e) => {
  if (e.target.closest('a')) { alternarMenu(false); alternarSubmenu(false); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { alternarMenu(false); alternarSubmenu(false); }
});

/* ===== Toast ===== */
const areaToast = document.querySelector('#toasts');

export function mostrarToast(texto, tipo = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.setAttribute('role', 'status');
  const msg = document.createElement('span');
  msg.textContent = texto;
  const fechar = document.createElement('button');
  fechar.type = 'button';
  fechar.setAttribute('aria-label', 'Fechar notificação');
  fechar.textContent = '×';
  fechar.addEventListener('click', () => toast.remove());
  toast.append(msg, fechar);
  areaToast.append(toast);
  setTimeout(() => toast.remove(), 6000);
}

/* ===== Modal de doação (<dialog>) ===== */
const modal = document.querySelector('#modal-doacao');
document.querySelectorAll('[data-open-modal]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    alternarMenu(false);
    modal.showModal();
  });
});
modal.querySelectorAll('[data-close-modal]').forEach((el) => {
  el.addEventListener('click', () => modal.close());
});
// Clique fora da caixa fecha o modal
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

/* ===== Formulário de voluntariado ===== */
const form = document.querySelector('#form-voluntario');
const resumo = document.querySelector('#form-resumo');
const botaoEnviar = form.querySelector('button[type="submit"]');

function mostrarResumo(tipo, titulo, texto) {
  const icones = { success: '✓', danger: '!' };
  resumo.innerHTML = '';
  const caixa = document.createElement('div');
  caixa.className = `alert alert-${tipo}`;
  const icone = document.createElement('span');
  icone.className = 'alert-icon';
  icone.setAttribute('aria-hidden', 'true');
  icone.textContent = icones[tipo];
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = titulo;
  p.append(strong, texto);
  caixa.append(icone, p);
  resumo.append(caixa);
}

// Feedback em tempo real ao sair de cada campo
CAMPOS.forEach((id) => {
  form.querySelector(`#${id}`).addEventListener('blur', (e) => validarCampo(e.target));
});

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (!validarFormulario(form)) {
    mostrarResumo('danger', 'Revise o formulário', 'Há campos obrigatórios vazios ou inválidos.');
    return;
  }
  // Simula o envio: botão desabilitado enquanto "envia"
  botaoEnviar.disabled = true;
  botaoEnviar.textContent = 'Enviando...';
  setTimeout(() => {
    mostrarResumo('success', 'Inscrição recebida!', 'Obrigado por querer fazer parte (demonstração, nenhum dado é enviado).');
    mostrarToast('Inscrição enviada com sucesso!', 'success');
    form.reset();
    limparFeedback(form);
    botaoEnviar.disabled = false;
    botaoEnviar.textContent = 'Enviar inscrição';
  }, 900);
});
