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
Os 13 tratamentos oficiais confirmados pela cliente já estão todos cadastrados
em `treatments` (`src/data/siteContent.ts`, tipo `Treatment` em
`src/types/siteContent.ts`), com `id`/`name`/`categoryId` (e `subtitle` no
caso do Skin Glass) e agora também `summary` (resumo breve, usado nos cards) e
`description` (explicação completa, usada no modal de detalhes) — escritos de
forma genérica a partir do que o próprio nome do procedimento já define
publicamente (o que é uma limpeza de pele, um peeling, microagulhamento
etc.), sem citar equipamento, substância, indicação clínica específica,
contraindicação, duração, sessões, preço ou resultado garantido. Todos os
demais campos do tipo continuam opcionais e, enquanto ausentes, a interface
mostra avisos honestos (sem seção de benefícios/indicação/cuidados/antes e
depois) em vez de inventar conteúdo. Assim que a Letícia confirmar qualquer
campo de um item, é só preenchê-lo diretamente no objeto correspondente — a
interface passa a exibir automaticamente, sem precisar mexer em nenhum
componente:
- [ ] **Limpeza de Pele Premium** (categoria: Limpeza e renovação) — benefícios, indicação, duração/sessões, preço
- [ ] **Limpeza de Pele GHK-Cu** (categoria: Limpeza e renovação) — benefícios, indicação, duração/sessões, preço
- [ ] **Dermaplaning** (categoria: Limpeza e renovação) — benefícios, indicação, duração/sessões, preço
- [ ] **Skin Glass** ("Peeling de Vidro", categoria: Limpeza e renovação) — benefícios, indicação, duração/sessões, preço
- [ ] **Peeling Herbal** (categoria: Limpeza e renovação) — composição, indicação/benefícios, cuidados, duração, preço
- [ ] **Peeling de Hollywood** (categoria: Limpeza e renovação) — benefícios, indicação, duração/sessões, preço
- [ ] **Skin Booster** (categoria: Estética regenerativa) — benefícios, indicação, duração/sessões, preço
- [ ] **Microagulhamento GHK-Cu** (categoria: Rejuvenescimento) — benefícios, indicação, duração/sessões, preço
- [ ] **Ultramed** (categoria: Rejuvenescimento) — **prioridade**: sequer o tipo de procedimento está confirmado (facial ou corporal, tecnologia utilizada); o `summary`/`description` atuais são intencionalmente neutros até isso ser esclarecido; depois, nome comercial do equipamento, indicação/benefícios, contraindicações, duração, preço
- [ ] **Tratamento Rejuvenescedor e Clareador** (categoria: Rejuvenescimento) — benefícios, indicação, duração/sessões, preço
- [ ] **Jato de Plasma** (categoria: Rejuvenescimento) — nome comercial do equipamento, indicação/benefícios, contraindicações, duração, preço
- [ ] **Depilação a Laser** (categoria: Depilação e tecnologias) — indicação, duração/sessões, preço
- [ ] **Remoção de Tatuagem** (categoria: Depilação e tecnologias) — técnica utilizada, nº de sessões, indicação, contraindicações, preço
- [ ] Imagem ou vídeo de cada tratamento (campo `media`, tipo `TreatmentMedia` em `src/types/siteContent.ts`: `type` ("image"/"video"), `src`, `poster` opcional para vídeo, `alt`). Enquanto ausente, o card mostra um placeholder e o modal de detalhes mostra "Conteúdo visual em preparação" — nunca uma imagem quebrada ou espaço vazio.

A categoria **Protocolos personalizados** é a única que ainda não tem nenhum
tratamento; fica automaticamente oculta do filtro em Tratamentos
(`Treatments.tsx` só renderiza o botão de uma categoria quando
`treatments.some(t => t.categoryId === category.id)`) — reaparece sozinha
assim que houver um tratamento real classificado nela, sem precisar mexer em
código.

## Ofertas e condições comerciais
Não existe mais uma seção separada de "Ofertas" — condições especiais agora
vivem dentro de cada tratamento, em `treatments[].specialOffer` (tipo
`TreatmentSpecialOffer` em `src/types/siteContent.ts`: `active`, `title`,
`description`, `originalPrice`, `promoPrice`, `validUntil`). Enquanto nenhum
tratamento tiver `specialOffer.active: true`, o filtro "Condições especiais"
em Tratamentos fica completamente oculto (não é só uma mensagem vazia — o
botão do filtro nem é renderizado). Assim que a Letícia confirmar uma
condição especial real de algum tratamento, preencher o `specialOffer`
correspondente com `active: true`.
- [ ] Ofertas ativas (tratamento correspondente, título, descrição, validade, preço original/promocional)
- [ ] Formas de pagamento aceitas
- [x] Prazo de cancelamento/remarcação — confirmado: mínimo de 24 horas de antecedência (`legal.cancellationPolicy`). Sem multa, cobrança, perda de sinal ou outra penalidade até serem confirmadas.

## Tecnologias e produtos
- [ ] Nome, finalidade e benefício de cada tecnologia/equipamento utilizado
- [ ] Foto real de cada equipamento

## Instagram
- [ ] Seleção de publicações reais para exibir na seção "Instagram" (a seção já está pronta, apenas sem posts)

## Políticas legais
- [x] `legal.privacyPolicy` (Política de Privacidade) — confirmada pela cliente, conteúdo oficial
- [x] `legal.cancellationPolicy` (Política de Cancelamento e Reagendamento) — confirmada pela cliente, com o prazo mínimo de 24 horas de antecedência

## Avaliações e resultados
- [ ] Avaliações de clientes autorizadas para publicação
- [ ] Resultados antes/depois autorizados para publicação — não existe mais uma
      seção separada de "Resultados autorizados"; cada resultado agora entra
      dentro do tratamento correspondente, em `treatments[].beforeAfter`
      (tipo `TreatmentBeforeAfter`: `before`, `beforeAlt`, `after`, `afterAlt`
      — os quatro preenchidos juntos, com imagens reais autorizadas pela
      cliente). Enquanto ausente, a seção "Antes e depois" simplesmente não
      aparece nos detalhes daquele tratamento (sem placeholder, sem aviso).

## Horários e agendamento
- [ ] Horários de funcionamento
- [ ] Regras específicas de agendamento (antecedência mínima, intervalos, etc.)

## Sobre a profissional
- [ ] Formação acadêmica, cursos, especializações e certificados — o módulo "Formações e Certificações" (seção Autoridade → botão "Ver formações e certificações") já está pronto para receber cada item com: nome, instituição, ano, carga horária, categoria, imagem real do certificado/diploma e uma breve descrição. Ver `credentials.items` em `src/data/siteContent.ts` (tipo `CredentialItem` em `src/types/siteContent.ts`) — enquanto vazio, o módulo mostra apenas "As formações e certificações profissionais serão adicionadas em breve." Utilizar somente documentos reais fornecidos pela Letícia, nunca certificados genéricos ou gerados por IA.

## Técnico (não depende da cliente)
- [ ] `src/components/NotFoundPage.tsx` está pronto mas não está montado — o site hoje é uma página única com âncoras, sem rotas. Só faz sentido ativá-lo se o site ganhar páginas internas separadas (ex.: `/gestao`, política de privacidade em página própria) no futuro.
- [x] **Atalho "Qual cuidado sua pele precisa?" → tratamento específico**: cada item de `skinConcerns.items` aponta direto para os `treatmentIds` relacionados do catálogo oficial (`requestTreatmentsHighlight` em `src/context/TreatmentsFilterContext.tsx`), filtra a seção Tratamentos, rola até o card (`servico-${id}`) e o destaca por ~2s. Os 13 tratamentos oficiais têm `categoryId` preenchido e os relacionamentos já usam ids reais e válidos do catálogo.

## Observação
Todos os textos, valores e dados já publicados no site (nome, profissional,
foco, anos de experiência, WhatsApp, e-mail, Instagram, endereço, propósito,
objetivo, diferencial e valores) foram confirmados diretamente pela cliente
e não devem ser alterados sem uma nova confirmação.

O item "+ de 1000 clientes atendidos" (em `about.highlights`) é uma exceção
pontual: veio direto da bio pública do Instagram @leh_estetic (texto literal,
não deduzido), aprovado pela cliente em 2026-07-24 para uso no site. Em
2026-07-31 o texto foi corrigido de "atendidas" para "atendidos" (concordância
com "clientes"). Se esse número mudar no Instagram, atualizar aqui também.
