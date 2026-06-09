# AS Hotels

Relatorio do projeto **AS Hotels**, um site responsivo para reservas de hotel com foco em experiencia de usuario, visual profissional e navegacao simples.

## Visao geral

O **AS Hotels** e uma interface web para pesquisa e reserva de estadias em hoteis. O projeto foi desenvolvido como um site estatico, com layout moderno, cores azul e branco, imagens de hotel, filtros interativos e uma experiencia pensada para ser clara tanto em desktop quanto em dispositivos moveis.

A primeira tela ja apresenta a principal acao do produto: buscar uma estadia por destino, datas e quantidade de hospedes. Abaixo, o usuario encontra indicadores de confianca, filtros, hoteis recomendados, oferta especial e diferenciais do servico.

## Objetivo

Criar um site de reservas de hotel chamado **AS Hotels** com UI/UX profissional, facil de usar e visualmente atrativo. O projeto busca simular a experiencia inicial de uma plataforma real de hospedagem, priorizando clareza, hierarquia visual e interacao direta.

## Funcionalidades

- Busca por destino, check-in, check-out e quantidade de hospedes.
- Datas preenchidas automaticamente com sugestao inicial de viagem.
- Filtro por preco maximo por noite.
- Filtro por tipo de viagem: todos, trabalho ou lazer.
- Ordenacao por recomendados, menor preco e melhor avaliacao.
- Cards de hoteis com imagem, localizacao, avaliacao, comodidades e preco.
- Botao de reserva com feedback visual por notificacao.
- Secao de oferta especial.
- Secao de experiencias e beneficios.
- Layout responsivo para desktop, tablet e celular.
- Servidor local em PowerShell para abrir o projeto via localhost.

## Design UI/UX

O design utiliza uma paleta baseada em azul e branco para transmitir confianca, conforto e profissionalismo. A interface foi organizada para reduzir friccao na jornada do usuario:

- Hero com imagem real de hotel e formulario de reserva em destaque.
- Cabecalho fixo com navegacao direta.
- Filtros laterais para desktop e empilhados no mobile.
- Cards com informacoes essenciais para comparacao rapida.
- Componentes com bordas discretas, bom espacamento e contraste adequado.
- Feedback visual em acoes importantes, como busca e selecao de hotel.

## Tecnologias utilizadas

- **HTML5** para estrutura do site.
- **CSS3** para layout, responsividade e estilo visual.
- **JavaScript** para filtros, ordenacao, renderizacao dos hoteis e interacoes.
- **Lucide Icons** via CDN para icones da interface.
- **Unsplash Images** via URL externa para imagens de hoteis.
- **PowerShell** para servidor local simples.

## Estrutura do projeto

```text
AS/
|-- index.html
|-- styles.css
|-- script.js
|-- as-hotels-server.ps1
`-- README.md
```

## Como executar

O projeto pode ser aberto diretamente pelo arquivo `index.html`.

Para executar via localhost no Windows, use:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\as-hotels-server.ps1 -Root . -Port 8000
```

Depois, acesse:

```text
http://localhost:8000/
```

## Status do projeto

O projeto esta em versao front-end estatica. Ele simula uma plataforma de reservas com dados locais no JavaScript, sem integracao com banco de dados, autenticacao ou sistema real de pagamento.

## Melhorias futuras

- Criar backend para reservas reais.
- Adicionar autenticacao de usuarios.
- Implementar calendario avancado de disponibilidade.
- Adicionar pagina de detalhes para cada hotel.
- Incluir checkout e confirmacao de reserva.
- Salvar favoritos e historico de buscas.
- Adicionar testes automatizados de interface.

## Descricao curta para GitHub

Site responsivo de reservas de hotel com design UI/UX profissional, filtros interativos e identidade visual azul e branca para a marca AS Hotels.

## Topicos sugeridos

```text
hotel-booking
frontend
ui-ux
responsive-design
html
css
javascript
hospitality
```
