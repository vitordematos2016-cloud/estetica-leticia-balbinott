import type { SiteContent } from '../types/siteContent';

/**
 * Fonte única de conteúdo do site. Nenhum texto deve ser escrito diretamente
 * nos componentes — tudo vem daqui. Informações ainda não confirmadas pela
 * cliente permanecem como listas vazias / avisos, nunca como dados inventados.
 */
export const siteContent: SiteContent = {
  brand: {
    name: 'Estética Letícia Balbinott',
    professional: 'Letícia Balbinott',
    role: 'Especialista em estética facial',
    focus: 'Estética regenerativa',
    experienceYears: 8,
    tagline: 'Estética facial e regenerativa',
  },

  contact: {
    whatsappNumber: '5545998188396',
    whatsappDisplay: '(45) 99818-8396',
    email: 'leticiabalbinott@outlook.com',
    instagramHandle: '@leh_estetic',
    instagramUrl: 'https://www.instagram.com/leh_estetic/',
  },

  address: {
    street: 'Rua José Sampaio, sala 101, 1º andar',
    reference: 'Prédio espelhado próximo à Audisom',
    googleMapsUrl: 'https://maps.app.goo.gl/Vosud7mfswEU1TGUA',
    wazeUrl: 'https://waze.com/ul?ll=-25.09952986593139,-52.870404056863315&navigate=yes',
    latitude: -25.09952986593139,
    longitude: -52.870404056863315,
  },

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Tratamentos', href: '#tratamentos' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Localização', href: '#localizacao' },
  ],

  headerCta: { label: 'Agendar avaliação', href: '#agendamento' },

  hero: {
    eyebrow: 'Estética facial e regenerativa',
    title: 'Sua pele cuidada com segurança, transparência e atenção em cada detalhe',
    description:
      'Tratamentos estéticos personalizados, desenvolvidos com responsabilidade, respeito à beleza natural e um cuidado verdadeiramente humano.',
    primaryCta: { label: 'Conhecer tratamentos', href: '#tratamentos' },
    secondaryCta: { label: 'Agendar avaliação', href: '#agendamento' },
  },

  brandLoop: {
    items: [
      '+ DE 8 ANOS DE EXPERIÊNCIA',
      'ESTÉTICA FACIAL',
      'ESTÉTICA REGENERATIVA',
      'BELEZA NATURAL',
      'LEH ESTETIC',
      '+1000 CLIENTES ATENDIDOS',
    ],
    ariaLabel: 'Estética Letícia Balbinott — mais de 8 anos de experiência em estética facial e regenerativa',
  },

  manifesto: {
    title: 'Cuidar da pele também é cuidar de como você se sente',
    text: 'Cada atendimento é conduzido com atenção, responsabilidade e respeito às necessidades únicas de cada pele.',
  },

  about: {
    title: 'Cuidado que respeita a individualidade de cada pele',
    text: 'Letícia Balbinott é especialista em estética facial, com foco em estética regenerativa e + de 8 anos de experiência. Seu trabalho é baseado em tratamentos personalizados, atendimento acolhedor, segurança e respeito às características únicas de cada pele.',
    highlights: [
      'Letícia Balbinott',
      'Especialista em estética facial',
      'Estética regenerativa',
      '+ de 8 anos de experiência',
      '+ de 1000 clientes atendidas',
    ],
  },

  purpose: {
    eyebrow: 'Nossa essência',
    heading: 'Cuidar vai além da estética',
    subheading:
      'Cada atendimento nasce de um propósito claro: unir conhecimento, segurança e atenção verdadeira em cada etapa do cuidado.',
    purposeTitle: 'Propósito',
    purposeText:
      'Transformar a autoestima e fortalecer a confiança de cada pessoa por meio de tratamentos estéticos seguros, personalizados e baseados em resultados reais, sempre com um atendimento humano, acolhedor e responsável.',
    objectiveTitle: 'Objetivo',
    objectiveText:
      'Fazer com que cada cliente perceba que está sendo cuidada por uma profissional que realmente se importa com seu resultado, sua segurança, seu bem-estar e a forma como ela se sente consigo mesma.',
  },

  differential: {
    eyebrow: 'Nosso diferencial',
    title: 'Um cuidado pensado em cada detalhe',
    text: 'Cada atendimento é conduzido com atenção, responsabilidade e respeito às necessidades de cada pessoa, criando uma experiência que vai além do procedimento.',
    closing:
      'Cuidado, conhecimento e atenção unidos em uma experiência verdadeiramente personalizada.',
  },

  values: [
    {
      title: 'Ética e honestidade',
      text: 'Indicações realizadas com responsabilidade, transparência e respeito às necessidades de cada cliente.',
    },
    {
      title: 'Atendimento humanizado',
      text: 'Um cuidado acolhedor, atento e desenvolvido de maneira individualizada.',
    },
    {
      title: 'Respeito à beleza natural',
      text: 'Tratamentos pensados para valorizar as características e a individualidade de cada pessoa.',
    },
    {
      title: 'Segurança da pele',
      text: 'Compromisso com procedimentos seguros, responsáveis e adequados para cada necessidade.',
    },
    {
      title: 'Atualização e inovação',
      text: 'Busca constante por conhecimento, aperfeiçoamento e novas possibilidades de tratamento.',
    },
    {
      title: 'Excelência em cada detalhe',
      text: 'Profissionalismo, dedicação e amor pelo trabalho em todas as etapas do atendimento.',
    },
  ],

  howItWorks: {
    title: 'A jornada do seu tratamento',
    text: 'Um caminho claro, do primeiro contato ao acompanhamento — para que você saiba exatamente o que esperar em cada etapa.',
    steps: [
      {
        title: 'Avaliação',
        text: 'Sua pele é avaliada com atenção para entender histórico, sensibilidades e objetivos antes de qualquer indicação.',
      },
      {
        title: 'Planejamento',
        text: 'A partir da avaliação, é construído um plano de cuidado transparente, adequado às suas necessidades.',
      },
      {
        title: 'Procedimento',
        text: 'Cada etapa é conduzida com atenção, segurança e respeito ao seu tempo.',
      },
      {
        title: 'Orientações',
        text: 'Você recebe orientações claras sobre os cuidados necessários após o atendimento.',
      },
      {
        title: 'Acompanhamento',
        text: 'O cuidado continua além do consultório, com atenção próxima em cada etapa seguinte.',
      },
    ],
  },

  experience: {
    title: 'Um ambiente preparado para cuidar de você',
    text: 'Um ambiente acolhedor, preparado para que cada cliente possa desacelerar, se sentir à vontade e receber um atendimento atento, respeitoso e personalizado.',
    additionalBlocks: [
      {
        title: 'Conforto em cada atendimento',
        text: 'Um espaço organizado, tranquilo e preparado para que cada cuidado seja realizado com atenção, segurança e conforto.',
      },
      {
        title: 'Um ambiente pensado para você',
        text: 'Cada elemento foi escolhido para proporcionar uma experiência acolhedora desde a chegada até o final do atendimento.',
      },
    ],
  },

  facade: {
    title: 'Estética Letícia Balbinott',
    years: 8,
    yearsLabel: 'anos de experiência',
    clients: 1000,
    clientsLabel: 'clientes atendidos',
    text: 'Uma trajetória construída com cuidado, confiança e respeito à beleza natural.',
  },

  credentials: {
    title: 'Conhecimento que se transforma em cuidado',
    text: 'A busca constante por atualização é o que sustenta cada indicação feita na Estética Letícia Balbinott — sempre com responsabilidade sobre o que é apresentado.',
    moduleTitle: 'Formações e Certificações',
    moduleTeaser:
      'Conheça as formações, especializações e atualizações profissionais que sustentam cada atendimento.',
    moduleCta: 'Ver formações e certificações',
    notice: 'As formações e certificações profissionais serão adicionadas em breve.',
    items: [],
  },

  skinConcerns: {
    title: 'Qual cuidado sua pele precisa?',
    text: 'Cada objetivo pede um caminho diferente. Escolha o que mais se aproxima do que você sente hoje.',
    items: [
      {
        id: 'manchas',
        label: 'Melhorar manchas',
        description: 'Uniformizar o tom e a aparência da pele.',
        categoryId: 'manchas-uniformizacao',
      },
      {
        id: 'linhas-sinais',
        label: 'Suavizar linhas e sinais',
        description: 'Atenuar marcas de expressão e sinais do tempo.',
        categoryId: 'rejuvenescimento',
      },
      {
        id: 'oleosidade-acne',
        label: 'Controlar oleosidade e acne',
        description: 'Equilibrar a produção de oleosidade da pele.',
        categoryId: 'acne-oleosidade',
      },
      {
        id: 'textura-vico',
        label: 'Melhorar textura e viço',
        description: 'Renovar a superfície da pele e devolver luminosidade.',
        categoryId: 'limpeza-renovacao',
      },
      {
        id: 'saude-pele',
        label: 'Recuperar a saúde da pele',
        description: 'Fortalecer e regenerar a barreira natural da pele.',
        categoryId: 'estetica-regenerativa',
      },
      {
        id: 'flacidez',
        label: 'Cuidar da flacidez',
        description: 'Trabalhar firmeza e sustentação da pele.',
        categoryId: 'rejuvenescimento',
      },
      {
        id: 'prevencao',
        label: 'Prevenir o envelhecimento',
        description: 'Cuidados contínuos para retardar sinais futuros.',
        categoryId: 'rejuvenescimento',
      },
    ],
  },

  treatmentCategories: [
    {
      id: 'limpeza-renovacao',
      name: 'Limpeza e renovação',
      description: 'Procedimentos de renovação da superfície da pele.',
    },
    {
      id: 'estetica-regenerativa',
      name: 'Estética regenerativa',
      description: 'Cuidados voltados à regeneração e saúde da pele.',
    },
    {
      id: 'rejuvenescimento',
      name: 'Rejuvenescimento',
      description: 'Tratamentos focados em firmeza e sinais do tempo.',
    },
    {
      id: 'manchas-uniformizacao',
      name: 'Manchas e uniformização',
      description: 'Cuidados para tom e uniformidade da pele.',
    },
    {
      id: 'acne-oleosidade',
      name: 'Acne e oleosidade',
      description: 'Tratamentos para controle de oleosidade e acne.',
    },
    {
      id: 'protocolos-personalizados',
      name: 'Protocolos personalizados',
      description: 'Combinações construídas a partir da avaliação individual.',
    },
    {
      id: 'depilacao-tecnologias',
      name: 'Depilação e tecnologias',
      description: 'Procedimentos a laser e outras tecnologias que não são cuidados de pele do rosto.',
    },
  ],

  // Tratamentos oficiais confirmados pela cliente. Os 6 abaixo (identificados
  // originalmente em destaques fixos do Instagram @leh_estetic) ainda não têm
  // descrição, benefícios, imagem ou preço confirmados -- ver
  // docs/PENDENCIAS_CLIENTE.md para o que falta de cada um.
  //
  // categoryId classificado pelo tipo de procedimento que o próprio nome já
  // identifica sem ambiguidade (não é uma descrição/benefício inventado):
  // - Limp GHK-CU / Herbal Peel: limpeza/peeling -> limpeza-renovacao;
  // - Dep. Laser H / Remoção de Tatuagem: procedimentos a laser, não são
  //   cuidado de pele do rosto -> nova categoria depilacao-tecnologias;
  // - Jato de Plasma: tecnologia usada no mercado quase exclusivamente para
  //   firmeza/sinais do tempo -> rejuvenescimento.
  // "Skin Class" ficou de fora de propósito: o nome não deixa claro se é um
  // tratamento para cliente ou um curso/aula da profissional -- categorizar
  // sem essa confirmação seria adivinhar. Continua aparecendo em "Todos os
  // tratamentos" normalmente, só não em nenhum filtro de categoria.
  treatments: [
    { id: 'limp-ghk-cu', name: 'Limp GHK-CU', categoryId: 'limpeza-renovacao' },
    { id: 'herbal-peel', name: 'Herbal Peel', categoryId: 'limpeza-renovacao' },
    { id: 'dep-laser-h', name: 'Dep. Laser H', categoryId: 'depilacao-tecnologias' },
    { id: 'jato-de-plasma', name: 'Jato de Plasma', categoryId: 'rejuvenescimento' },
    { id: 'rem-tatuagem', name: 'Remoção de Tatuagem', categoryId: 'depilacao-tecnologias' },
    { id: 'skin-class', name: 'Skin Class' },
  ],

  aftercare: {
    title: 'Cuidados após o atendimento',
    text: 'O cuidado não termina quando o procedimento acaba. Você recebe orientações claras sobre os cuidados necessários e permanece acompanhada nos dias seguintes, com atenção para qualquer dúvida que surgir.',
    cta: { label: 'Agendar minha avaliação', href: '#agendamento' },
  },

  thoughtfulDetails: {
    title: 'Cuidado presente em cada detalhe',
    text: 'Na Estética Letícia Balbinott, cada detalhe é pensado para proporcionar uma experiência acolhedora, especial e personalizada.',
  },

  technologies: {
    title: 'Tecnologias e produtos utilizados',
    text: 'Equipamentos e linhas profissionais utilizados nos tratamentos da Estética Letícia Balbinott.',
    notice: 'Informações sobre tecnologias e produtos em atualização.',
    items: [],
  },

  instagramShowcase: {
    title: 'Acompanhe cuidados, resultados e bastidores da Estética Letícia Balbinott',
    text: 'Uma seleção de publicações do Instagram da Estética Letícia Balbinott.',
    notice: 'Publicações em seleção — em breve, destaques direto do Instagram.',
    postsPlaceholderCount: 6,
  },

  // Avaliações reais do perfil oficial da Estética Letícia Balbinott no
  // Google (mesmo endereço/nome confirmados pelo googleMapsUrl já usado no
  // site). Coletadas manualmente em 2026-07-25 -- texto e nome exatamente
  // como publicados no Google, sem correção de estilo. Nenhuma nota, nome
  // ou comentário foi inventado.
  reviews: [
    {
      id: 'ana-luiza-portolan',
      author: 'Ana Luiza Portolan',
      text: 'Ótimo atendimento, excelente profissional, e a leh é uma querida, fiz uma compra via Instagram e fui super bem atendida, ganhei até brindezinhos.',
      rating: 5,
    },
    {
      id: 'fernanda-cristina-rocha',
      author: 'Fernanda Cristina Rocha',
      text: 'Já faço meus procedimentos a 4 anos,indico demais essa estética,além do atendimento excelente os produtos que ela usa são de qualidade e os resultados são incríveis melhor estética de Guaraniaçu 👏👏❤️…',
      rating: 5,
    },
    {
      id: 'carolina-harley',
      author: 'Carolina Harley',
      text: 'Ótimo atendimento, ambiente agradável e excelência nos procedimentos 🥰',
      rating: 5,
    },
    {
      id: 'lionara-dall-agnolo',
      author: 'Lionara Dall Agnolo',
      text: 'Excelente profissional, procedimento de qualidade, é uma pessoa incrível 😍😍',
      rating: 5,
    },
    {
      id: 'adriana-alves',
      author: 'Adriana Alves',
      text: 'Sempre fui muito bem atendida, produtos de ótima qualidade, super recomendo ☺️',
      rating: 5,
    },
    {
      id: 'daiane-f-marinello',
      author: 'Daiane F Marinello',
      text: 'Fui atendida sempre muito bem, ela tem uma paciência e amor pelo que faz, tem um grande cuidado com a gente, o espaço é maravilhoso aconchegante você se sente em casa com ela, sem contar que os preços dos produtos são bem em conta, super recomendoo ❤️😍…',
      rating: 5,
    },
  ],
  reviewsNotice: 'As avaliações de clientes serão publicadas em breve.',

  faq: [
    {
      question: 'Como faço para agendar uma avaliação?',
      answer:
        'Você pode agendar diretamente pelo formulário de agendamento do site ou falando conosco pelo WhatsApp.',
    },
    {
      question: 'Os tratamentos são personalizados?',
      answer:
        'Sim. Cada indicação é feita de forma individual, respeitando as características e necessidades de cada pele.',
    },
    {
      question: 'Onde fica localizada a Estética Letícia Balbinott?',
      answer:
        'Na Rua José Sampaio, sala 101, 1º andar — no prédio espelhado próximo à Audisom.',
    },
  ],

  finalCta: {
    title: 'Sua pele merece um cuidado pensado especialmente para ela',
    text: 'Agende uma avaliação e descubra quais cuidados fazem sentido para as necessidades da sua pele.',
    primaryCta: { label: 'Agendar avaliação', href: '#agendamento' },
    secondaryCtaLabel: 'Falar pelo WhatsApp',
  },

  seo: {
    title: 'Estética Letícia Balbinott | Estética Facial e Regenerativa',
    description:
      'Conheça a Estética Letícia Balbinott, especializada em estética facial e regenerativa, com atendimento personalizado, acolhedor e responsável.',
  },

  footer: {
    developedByPrefix: 'Desenvolvido por ',
    developerName: 'Matos Soluções',
    developerWhatsappNumber: '5545933005119',
    developerWhatsappMessage:
      'Olá! Acessei o site da Estética Letícia Balbinott e vi que ele foi desenvolvido pela Matos Soluções. Gostaria de conversar sobre a criação ou modernização de um site para o meu negócio. Poderia me explicar como funciona?',
    copyright: '© Estética Letícia Balbinott — Todos os direitos reservados.',
  },

  legal: {
    privacyPolicy: {
      title: 'Política de Privacidade',
      sections: [
        {
          heading: 'Quais dados são coletados',
          text: 'Ao preencher o formulário de agendamento ou entrar em contato pelo site, coletamos apenas os dados informados voluntariamente: nome, telefone e, quando preenchidas, observações e preferências de horário.',
        },
        {
          heading: 'Como esses dados são usados',
          text: 'As informações são usadas exclusivamente para responder à sua solicitação de contato ou agendamento pelo WhatsApp, e não são utilizadas para nenhuma outra finalidade.',
        },
        {
          heading: 'Compartilhamento',
          text: 'Os dados informados não são vendidos, compartilhados ou repassados a terceiros.',
        },
      ],
    },
    cancellationPolicy: {
      title: 'Política de Cancelamento e Reagendamento',
      sections: [
        {
          heading: 'Como cancelar ou reagendar',
          text: 'Cancelamentos e reagendamentos devem ser solicitados diretamente pelo WhatsApp.',
        },
        {
          heading: 'Prazo mínimo',
          text: 'Cancelamentos e reagendamentos devem ser solicitados com, no mínimo, 24 horas de antecedência.',
        },
      ],
    },
  },

  schedulingConsent: {
    label: 'Autorizo o contato via WhatsApp para tratar desta solicitação.',
    error: 'É necessário autorizar o contato via WhatsApp para continuar.',
  },

  whatsappDefaultMessage:
    'Olá! Conheci a Estética Letícia Balbinott pelo site e gostaria de solicitar informações sobre os tratamentos e horários disponíveis.',
};
