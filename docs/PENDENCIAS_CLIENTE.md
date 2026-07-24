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
- [x] Segunda foto da sala de atendimento — usada na seção Experience, como terceiro bloco ("Um ambiente pensado para você") (`sala-secundaria-leh-estetic.webp`)
- [ ] Fotos adicionais do ambiente (entrada, recepção, equipamentos, outros detalhes) — a cliente pediu para remover os cards vazios/placeholder da seção Experience; quando houver fotos reais novas (sem repetir as já usadas), podem virar um novo bloco alternado na mesma seção, seguindo o padrão de `src/components/sections/Experience.tsx`

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

### Tratamentos identificados no Instagram (@leh_estetic), aguardando confirmação
A seção Tratamentos já mostra estes 6 nomes vistos em destaques fixos do Instagram
(`pendingTreatments` em `src/data/siteContent.ts`), cada um só com uma lista do que
falta confirmar — nenhum benefício, preço, duração ou categoria foi inventado:
- [ ] **Limp GHK-CU** — nome completo, descrição/benefícios, indicação, duração/sessões, preço
- [ ] **Herbal Peel** — nome comercial exato, composição, indicação/benefícios, cuidados, duração, preço
- [ ] **Dep. Laser H** — nome completo (o que "H" significa), se ainda é oferecido, indicação, duração/sessões, preço
- [ ] **Jato de Plasma** — nome comercial do equipamento, indicação/benefícios, contraindicações, duração, preço
- [ ] **Remoção de Tatuagem** — técnica utilizada, nº de sessões, indicação, contraindicações, preço
- [ ] **Skin Class** — o que exatamente é (tratamento, curso ou linha de produto) e todas as demais informações

Assim que a Letícia confirmar os dados de qualquer um destes, mover o item de
`pendingTreatments` para `treatments` (com todos os campos do tipo `Treatment`
preenchidos) e remover a entrada correspondente de `pendingTreatments`.

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
- [ ] Formação acadêmica, cursos, especializações e certificados — o módulo "Formações e Certificações" (seção Autoridade → botão "Ver formações e certificações") já está pronto para receber cada item com: nome, instituição, ano, carga horária, categoria, imagem real do certificado/diploma e uma breve descrição. Ver `credentials.items` em `src/data/siteContent.ts` (tipo `CredentialItem` em `src/types/siteContent.ts`) — enquanto vazio, o módulo mostra apenas "As formações e certificações profissionais serão adicionadas em breve." Utilizar somente documentos reais fornecidos pela Letícia, nunca certificados genéricos ou gerados por IA.

## Técnico (não depende da cliente)
- [ ] `src/components/NotFoundPage.tsx` está pronto mas não está montado — o site hoje é uma página única com âncoras, sem rotas. Só faz sentido ativá-lo se o site ganhar páginas internas separadas (ex.: `/gestao`, política de privacidade em página própria) no futuro.
- [ ] **Atalho "Qual cuidado sua pele precisa?" → tratamento específico**: `requestCategoryHighlight` (em `src/context/TreatmentsFilterContext.tsx`) já localiza o primeiro tratamento confirmado de cada categoria, rola até ele (`servico-${id}`) e o destaca por ~2s. Hoje, como `treatments` está vazio, todo clique cai no fallback (âncora simples para a seção Tratamentos, filtro por categoria) — sem erro, mas sem destaque, porque não há nenhum card confirmado ainda para apontar. Assim que a Letícia confirmar tratamentos reais (com `categoryId` preenchido), o destaque passa a funcionar automaticamente, sem precisar mexer no código.

## Observação
Todos os textos, valores e dados já publicados no site (nome, profissional,
foco, anos de experiência, WhatsApp, e-mail, Instagram, endereço, propósito,
objetivo, diferencial e valores) foram confirmados diretamente pela cliente
e não devem ser alterados sem uma nova confirmação.

O item "+ de 1000 clientes atendidas" (em `about.highlights`) é uma exceção
pontual: veio direto da bio pública do Instagram @leh_estetic (texto literal,
não deduzido), aprovado pela cliente em 2026-07-24 para uso no site. Se esse
número mudar no Instagram, atualizar aqui também.
