import { validarFormulario } from './form.js';

const form = document.querySelector('#form-voluntario');
if (form) {
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (validarFormulario(form)) {
      mostrarSucesso(form);
      form.reset();
    }
  });
}

function mostrarSucesso(formulario) {
  let aviso = document.querySelector('.form-success');
  if (!aviso) {
    aviso = document.createElement('p');
    aviso.className = 'form-success';
    formulario.after(aviso);
  }
  aviso.textContent = 'Inscrição recebida! Obrigado por querer fazer parte (demonstração, nenhum dado é enviado).';
}
