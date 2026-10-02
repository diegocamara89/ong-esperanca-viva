# ONG Esperança Viva

Site institucional (fictício) de uma ONG de educação e inclusão digital para jovens de comunidades periféricas. Projeto da **Experiência Prática IV – Desenvolvimento Front-end**, com foco em versionamento (Git/GitFlow), acessibilidade (WCAG 2.1 AA), otimização e deploy.

> **Aviso:** a ONG, os números de impacto e o formulário de doação/voluntariado são fictícios. Nenhum dado é coletado ou enviado.

**Demonstração:** _adicione aqui o link do GitHub Pages após o primeiro deploy_ (`https://<usuario>.github.io/ong-esperanca-viva/`)

## Tecnologias

- HTML5 semântico, CSS3 (variáveis, Grid, Flexbox) e JavaScript (ES modules), sem frameworks de interface
- [Vite](https://vitejs.dev/) 5 para servidor de desenvolvimento e build de produção
- GitHub Actions + GitHub Pages para deploy

## Como instalar e executar

Requisitos: Node.js 20 ou superior e npm.

```bash
git clone https://github.com/<usuario>/ong-esperanca-viva.git
cd ong-esperanca-viva
npm install
npm run dev        # servidor local em http://localhost:5173
npm run build      # gera a versão de produção em /dist
npm run preview    # serve o /dist localmente em http://localhost:4173
```

## Estrutura do projeto

```
├── index.html              # página única com todas as seções
├── src/
│   ├── css/style.css       # estilos, tokens de cor e responsividade
│   └── js/
│       ├── main.js         # inicialização e mensagem de sucesso do formulário
│       └── form.js         # validação acessível do formulário
├── public/                 # arquivos copiados como estão (favicon e imagens otimizadas)
├── design/                 # imagem original em alta resolução (não vai para produção)
├── vite.config.js          # configuração de build
└── .github/workflows/      # pipeline de deploy
```

## Fluxo de versionamento (GitFlow)

| Branch | Função |
| --- | --- |
| `main` | Código estável e publicado. Cada versão recebe uma tag (`v1.0.0`). |
| `develop` | Integração contínua das funcionalidades prontas. |
| `feature/*` | Uma branch por funcionalidade, criada a partir de `develop`. |
| `release/*` | Preparação de versão (ajuste de versão e testes finais) antes de ir para `main`. |
| `hotfix/*` | Correção urgente criada a partir de `main` e integrada em `main` e `develop`. |

Integrações usam `--no-ff` (ou Pull Request) para preservar o histórico de cada branch.

### Convenção de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat`, `fix`, `perf`, `style`, `docs`, `ci`, `chore`. Exemplo: `fix(a11y): corrige contraste do botão Doe agora`.

## Acessibilidade (WCAG 2.1 AA)

Verificada com **axe-core** (0 violações nas regras WCAG 2.0/2.1 A e AA e boas práticas) e com testes manuais de teclado e leitor de tela.

Principais decisões:

- Idioma da página (`lang="pt-BR"`), títulos hierárquicos (um `h1`) e marcos semânticos (`header`, `nav`, `main`, `footer`)
- Link "Pular para o conteúdo principal" (2.4.1)
- Foco visível em todos os elementos interativos (2.4.7)
- Contraste mínimo de 4,5:1 para texto (1.4.3); o audit inicial encontrou 2 falhas, corrigidas
- Formulário com `label` associado, campos obrigatórios identificados, erros com `role="alert"`, `aria-invalid` e foco no primeiro campo inválido (3.3.1, 3.3.3)
- Mensagem de sucesso em região `role="status"` (4.1.3)
- Respeita `prefers-reduced-motion` e não gera rolagem horizontal em 320 px (1.4.10)
- Imagem com texto alternativo descritivo

Limitações conhecidas: não foi realizada validação com usuários reais de tecnologias assistivas; recomenda-se testar com NVDA/VoiceOver antes de uso real.

## Otimização e performance

- Minificação de JS e CSS com hash nos nomes de arquivo (cache de longa duração)
- Imagem original de **406 KB (PNG) substituída por WebP responsivo de 7–18 KB** (cerca de 96% menor), com `srcset`, `loading="lazy"`, `decoding="async"` e `width`/`height` para evitar layout shift
- Sem bibliotecas externas, fontes de sistema e apenas 5 requisições
- Peso total da página: cerca de **30 KB** (medido sem compressão gzip)

## Deploy

O deploy é automático: todo push na `main` executa `.github/workflows/deploy.yml`, que instala dependências, gera o build e publica no GitHub Pages.

Configuração inicial (uma única vez): no repositório, **Settings → Pages → Build and deployment → Source: GitHub Actions**.

O build usa caminhos relativos (`base: './'`), por isso funciona em subcaminhos como `/ong-esperanca-viva/`.

## Manutenção

1. Crie uma branch a partir de `develop`: `git checkout -b feature/nome-da-mudanca develop`
2. Faça commits semânticos e abra um Pull Request para `develop`
3. Antes de integrar, rode `npm run build` e confira acessibilidade (axe DevTools no navegador)
4. Para publicar, crie `release/vX.Y.Z`, faça merge em `main`, adicione a tag e integre de volta em `develop`
5. Correções urgentes em produção: `hotfix/*` a partir de `main`

## Licença

Distribuído sob a licença [MIT](LICENSE).

## Autor

Marcelo Diego Sousa da Camara – Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas.
