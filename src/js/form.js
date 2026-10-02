const mensagens = {
  nome: 'Informe seu nome completo.',
  email: 'Informe um e-mail válido.',
  area: 'Selecione uma área de interesse.',
};

export function validarFormulario(form) {
  let valido = true;
  ['nome', 'email', 'area'].forEach((id) => {
    const campo = form.querySelector(`#${id}`);
    const ok = campo.value.trim() !== '' && campo.checkValidity();
    campo.setAttribute('aria-invalid', ok ? 'false' : 'true');
    mostrarErro(campo, ok ? '' : mensagens[id]);
    if (!ok) valido = false;
  });
  const primeiroInvalido = form.querySelector('[aria-invalid="true"]');
  if (primeiroInvalido) primeiroInvalido.focus();
  return valido;
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
