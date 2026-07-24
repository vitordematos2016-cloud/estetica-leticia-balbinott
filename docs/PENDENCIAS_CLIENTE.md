# Pendências — Leh Estetic

Itens que dependem de material ou informações a serem enviados pela cliente.
Nenhum destes itens foi inventado ou preenchido com dados fictícios — o site
está preparado para recebê-los assim que estiverem disponíveis.

## Identidade visual
- [ ] Logotipo oficial da Leh Estetic
- [ ] **Foto profissional da Letícia Balbinott para o Hero** — o espaço já está pronto e reservado exclusivamente para essa foto (retrato dela, rosto e parte superior do corpo). Quando enviada:
  - salvar o arquivo como `src/assets/leh-estetic/leticia-balbinott-profissional.webp`;
  - importar em `src/components/sections/Hero.tsx` e trocar o bloco placeholder (o `<div role="img">` com "Foto profissional da Letícia / Em preparação") por um `<img>` com `object-fit: cover`, sem deformar, e `object-position` centralizado no rosto/parte superior do corpo;
  - manter a mesma área reservada (`aspect-[4/5]`, `max-w-md`, cartão com cantos `rounded-[3rem] rounded-tr-[6rem]`, borda dourada) para não alterar o layout do Hero.

## Ambiente e imagens
- [x] Foto da fachada — usada na seção Localização (`src/assets/leh-estetic/fachada-leh-estetic.webp`)
- [x] Foto do corredor/espera — usada na seção Experience (`corredor-leh-estetic.webp`)
- [x] Foto dos biscoitos personalizados — usada na seção "Cuidado presente em cada detalhe" (`cuidado-detalhes-leh-estetic.webp`)
- [x] Foto da sala de atendimento — usada na seção Experience, como segundo bloco ("Conforto em cada atendimento"), ao lado da foto do corredor (`sala-principal-leh-estetic.webp`)
- [ ] Fotos adicionais do ambiente (entrada, recepção, equipamentos, outros detalhes) — a cliente pediu para remover os cards vazios/placeholder da seção Experience; quando houver fotos reais novas (sem repetir as já usadas), podem virar um novo bloco alternado na mesma seção, seguindo o padrão de `src/components/sections/Experience.tsx`
- [ ] Imagens para a Galeria — nenhuma foto adicional (distinta das já usadas) foi fornecida ainda; a seção segue com o aviso "em breve"

## Tratamentos
- [ ] Lista oficial completa de tratamentos
- [ ] Categoria de cada tratamento
- [ ] Resumo e descrição de cada tratamento
- [ ] Imagem de cada tratamento
- [ ] Benefícios de cada tratamento
- [ ] Indicação de cada tratamento
- [ ] Cuidados recomendados
- [ ] Duração de cada procedimento
- [ ] Preço de cada tratamento
- [ ] Quais tratamentos devem aparecer em destaque

## Ofertas e condições comerciais
- [ ] Ofertas ativas (título, descrição, validade)
- [ ] Formas de pagamento aceitas
- [ ] Políticas de cancelamento/remarcação (prazos e condições — o site já tem uma seção preliminar em `src/data/siteContent.ts` → `legal.cancellationPolicy`, marcada como conteúdo em revisão)

## Tecnologias e produtos
- [ ] Nome, finalidade e benefício de cada tecnologia/equipamento utilizado
- [ ] Foto real de cada equipamento

## Instagram
- [ ] Seleção de publicações reais para exibir na seção "Instagram" (a seção já está pronta, apenas sem posts)

## Políticas legais
- [ ] Revisão e confirmação do texto de `legal.privacyPolicy` (Política de Privacidade) — conteúdo preliminar
- [ ] Revisão e confirmação do texto de `legal.cancellationPolicy` (Política de Cancelamento e Reagendamento) — conteúdo preliminar, sem prazos definidos ainda

## Avaliações e resultados
- [ ] Avaliações de clientes autorizadas para publicação
- [ ] Resultados (antes/depois) autorizados para publicação

## Horários e agendamento
- [ ] Horários de funcionamento
- [ ] Regras específicas de agendamento (antecedência mínima, intervalos, etc.)

## Sobre a profissional
- [ ] Formação acadêmica
- [ ] Cursos e especializações
- [ ] Certificados e registros profissionais

## Técnico (não depende da cliente)
- [ ] `src/components/NotFoundPage.tsx` está pronto mas não está montado — o site hoje é uma página única com âncoras, sem rotas. Só faz sentido ativá-lo se o site ganhar páginas internas separadas (ex.: `/gestao`, política de privacidade em página própria) no futuro.

## Observação
Todos os textos, valores e dados já publicados no site (nome, profissional,
foco, anos de experiência, WhatsApp, e-mail, Instagram, endereço, propósito,
objetivo, diferencial e valores) foram confirmados diretamente pela cliente
e não devem ser alterados sem uma nova confirmação.
