import type { SiteContent } from '../types/siteContent';

/**
 * Fonte única de conteúdo do site. Nenhum texto deve ser escrito diretamente
 * nos componentes — tudo vem daqui. Informações ainda não confirmadas pela
 * cliente permanecem como listas vazias / avisos, nunca como dados inventados.
 */
export const siteContent: SiteContent = {
  brand: {
    name: 'Leh Estetic',
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
      'LEH ESTETIC',
      '8 ANOS DE EXPERIÊNCIA',
      'ESTÉTICA FACIAL',
      'ESTÉTICA REGENERATIVA',
      'CUIDADO PERSONALIZADO',
      'BELEZA NATURAL',
    ],
    ariaLabel: 'Leh Estetic — 8 anos de experiência em estética facial e regenerativa',
  },

  manifesto: {
    title: 'Cuidar da pele também é cuidar de como você se sente',
    text: 'Cada atendimento é conduzido com atenção, responsabilidade e respeito às necessidades únicas de cada pele.',
  },

  about: {
    title: 'Cuidado que respeita a individualidade de cada pele',
    text: 'Letícia Balbinott é especialista em estética facial, com foco em estética regenerativa e 8 anos de experiência. Seu trabalho é baseado em tratamentos personalizados, atendimento acolhedor, segurança e respeito às características únicas de cada pele.',
    highlights: [
      'Letícia Balbinott',
      'Especialista em estética facial',
      'Estética regenerativa',
      '8 anos de experiência',
    ],
  },

  purpose: {
    title: 'Propósito',
    text: 'Transformar a autoestima e a confiança das pessoas por meio de tratamentos estéticos seguros, personalizados e baseados em resultados reais, oferecendo um atendimento humano, acolhedor e de excelência.',
    emphasis: ['autoestima', 'segurança', 'personalização', 'acolhimento', 'resultados reais'],
    objectiveTitle: 'Objetivo',
    objectiveText:
      'Fazer com que cada cliente perceba que está sendo cuidada por uma profissional que realmente se importa com seu resultado, sua segurança e sua autoestima.',
  },

  differential: {
    title: 'Diferencial',
    text: 'Transparência nas orientações, responsabilidade em cada indicação e preocupação verdadeira com o cuidado de cada pele.',
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
    ],
  },

  gallery: {
    title: 'Galeria',
    text: 'Em breve, imagens reais do espaço e dos atendimentos da Leh Estetic.',
    images: [],
  },

  facade: {
    title: 'Leh Estetic',
    years: 8,
    text: '8 anos de cuidado, confiança e respeito à beleza natural.',
  },

  authorizedResults: {
    title: 'Resultados autorizados',
    text: 'Em breve, resultados reais autorizados pelas clientes da Leh Estetic.',
    placeholder: 'Nenhum resultado autorizado publicado até o momento.',
  },

  credentials: {
    title: 'Conhecimento que se transforma em cuidado',
    text: 'A busca constante por atualização é o que sustenta cada indicação feita na Leh Estetic — sempre com responsabilidade sobre o que é apresentado.',
    notice: 'Formações, especializações e certificações em atualização.',
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
  ],

  treatments: [],
  treatmentsCatalogNotice: 'Catálogo oficial em atualização.',

  personalAssessment: {
    title: 'Cada pele precisa de uma avaliação individual',
    text: 'Nenhum tratamento é indicado apenas pela aparência ou pela vontade da cliente. Antes de qualquer sugestão, a avaliação considera:',
    criteria: [
      'Histórico da pele',
      'Rotina de cuidados',
      'Sensibilidades',
      'Objetivos',
      'Tratamentos anteriores',
      'Necessidades atuais',
    ],
    cta: { label: 'Agendar minha avaliação', href: '#agendamento' },
  },

  aftercare: {
    title: 'Cuidados após o atendimento',
    text: 'O cuidado não termina quando o procedimento acaba. Você recebe orientações claras sobre os cuidados necessários e permanece acompanhada nos dias seguintes, com atenção para qualquer dúvida que surgir.',
  },

  thoughtfulDetails: {
    title: 'Cuidado presente em cada detalhe',
    text: 'Na Leh Estetic, cada detalhe é pensado para proporcionar uma experiência acolhedora, especial e personalizada.',
  },

  technologies: {
    title: 'Tecnologias e produtos utilizados',
    text: 'Equipamentos e linhas profissionais utilizados nos tratamentos da Leh Estetic.',
    notice: 'Informações sobre tecnologias e produtos em atualização.',
    items: [],
  },

  instagramShowcase: {
    title: 'Acompanhe cuidados, resultados e bastidores da Leh Estetic',
    text: 'Uma seleção de publicações do Instagram da Leh Estetic.',
    notice: 'Publicações em seleção — em breve, destaques direto do Instagram.',
    postsPlaceholderCount: 6,
  },

  offers: [],
  offersNotice: 'Nenhuma oferta ativa no momento.',

  reviews: [],
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
      question: 'Onde fica localizada a Leh Estetic?',
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
    title: 'Leh Estetic | Estética Facial e Regenerativa',
    description:
      'Conheça a Leh Estetic, especializada em estética facial e regenerativa, com atendimento personalizado, acolhedor e responsável.',
  },

  footer: {
    developedBy: 'Desenvolvido por Matos Soluções',
  },

  legal: {
    privacyPolicy: {
      title: 'Política de Privacidade',
      reviewNotice:
        'Conteúdo preliminar, ainda pendente de revisão e confirmação pela Leh Estetic antes da publicação definitiva.',
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
      reviewNotice:
        'Conteúdo preliminar, ainda pendente de definição e confirmação pela Leh Estetic antes da publicação definitiva.',
      sections: [
        {
          heading: 'Como cancelar ou reagendar',
          text: 'Cancelamentos e reagendamentos devem ser solicitados diretamente pelo WhatsApp, com a maior antecedência possível.',
        },
        {
          heading: 'Prazos e condições',
          text: 'Os prazos mínimos de antecedência e eventuais condições específicas ainda serão definidos pela Leh Estetic e publicados aqui assim que confirmados.',
        },
      ],
    },
  },

  schedulingConsent: {
    label: 'Autorizo o contato via WhatsApp para tratar desta solicitação.',
    error: 'É necessário autorizar o contato via WhatsApp para continuar.',
  },

  whatsappDefaultMessage:
    'Olá! Conheci a Leh Estetic pelo site e gostaria de solicitar informações sobre os tratamentos e horários disponíveis.',
};
