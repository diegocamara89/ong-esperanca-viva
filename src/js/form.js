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
    mostrarErro(campo, ok ? '' : mensagens[id]);
    if (!ok) valido = false;
  });
  return valido;
}

function mostrarErro(campo, texto) {
  let erro = campo.parentElement.querySelector('.field-error');
  if (!erro) {
    erro = document.createElement('span');
    erro.className = 'field-error';
    campo.parentElement.append(erro);
  }
  erro.textContent = texto;
}
