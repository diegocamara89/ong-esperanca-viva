import { validarFormulario } from './form.js';

const form = document.querySelector('#form-voluntario');
if (form) {
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (validarFormulario(form)) {
      mostrarSucesso();
      form.reset();
    }
  });
}

function mostrarSucesso() {
  const aviso = document.querySelector('#form-status');
  aviso.className = 'form-success';
  aviso.textContent = 'Inscrição recebida! Obrigado por querer fazer parte (demonstração, nenhum dado é enviado).';
}
