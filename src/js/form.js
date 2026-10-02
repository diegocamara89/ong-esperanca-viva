const mensagens = {
  nome: 'Informe seu nome completo.',
  email: 'Informe um e-mail válido.',
  area: 'Selecione uma área de interesse.',
};

export const CAMPOS = ['nome', 'email', 'area'];

// Valida um campo e aplica o feedback visual (is-valid / is-invalid + mensagem)
export function validarCampo(campo) {
  const ok = campo.value.trim() !== '' && campo.checkValidity();
  campo.setAttribute('aria-invalid', ok ? 'false' : 'true');
  campo.classList.toggle('is-invalid', !ok);
  campo.classList.toggle('is-valid', ok);
  mostrarErro(campo, ok ? '' : mensagens[campo.id]);
  return ok;
}

export function validarFormulario(form) {
  let valido = true;
  CAMPOS.forEach((id) => {
    if (!validarCampo(form.querySelector(`#${id}`))) valido = false;
  });
  const primeiroInvalido = form.querySelector('[aria-invalid="true"]');
  if (primeiroInvalido) primeiroInvalido.focus();
  return valido;
}

export function limparFeedback(form) {
  CAMPOS.forEach((id) => {
    const campo = form.querySelector(`#${id}`);
    campo.removeAttribute('aria-invalid');
    campo.classList.remove('is-valid', 'is-invalid');
    mostrarErro(campo, '');
  });
}

function mostrarErro(campo, texto) {
  let erro = campo.parentElement.querySelector('.field-error');
  if (!erro) {
    erro = document.createElement('span');
    erro.className = 'field-error';
    erro.id = `erro-${campo.id}`;
    erro.setAttribute('role', 'alert');
    campo.setAttribute('aria-describedby', erro.id);
    campo.parentElement.append(erro);
  }
  erro.textContent = texto;
}
