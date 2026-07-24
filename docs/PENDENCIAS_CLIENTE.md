# Pendências — Leh Estetic

Itens que dependem de material ou informações a serem enviados pela cliente.
Nenhum destes itens foi inventado ou preenchido com dados fictícios — o site
está preparado para recebê-los assim que estiverem disponíveis.

## Identidade visual
- [ ] Logotipo oficial da Leh Estetic
- [ ] Foto oficial da profissional (Letícia Balbinott) — a seção "Sobre" ainda usa um placeholder para o retrato dela; a foto real usada no Hero é da sala de atendimento, não um retrato

## Ambiente e imagens
- [x] Foto da fachada — usada na seção Localização (`src/assets/leh-estetic/fachada-leh-estetic.webp`)
- [x] Foto principal da sala de atendimento — usada no Hero (`sala-principal-leh-estetic.webp`)
- [x] Foto do corredor/espera — usada na seção Experience (`corredor-leh-estetic.webp`)
- [x] Foto dos biscoitos personalizados — usada na seção "Cuidado presente em cada detalhe" (`cuidado-detalhes-leh-estetic.webp`)
- [ ] Fotos adicionais do ambiente (entrada, recepção, equipamentos, outros detalhes) — os 4 placeholders restantes na seção Experience aguardam material real; não reaproveitar as 4 fotos já usadas em outros lugares
- [ ] Imagens para a Galeria — nenhuma foto adicional (distinta das já usadas) foi fornecida ainda

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
