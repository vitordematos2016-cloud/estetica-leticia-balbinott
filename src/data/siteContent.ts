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
    title: 'Como funciona o atendimento',
    text: 'Um processo simples, pensado para que você se sinta segura e bem informada em cada etapa.',
    steps: [
      {
        title: 'Contato inicial',
        text: 'Você entra em contato pelo WhatsApp ou pelo site para tirar dúvidas e solicitar sua avaliação.',
      },
      {
        title: 'Avaliação personalizada',
        text: 'Sua pele é avaliada com atenção para entender suas necessidades antes de qualquer indicação.',
      },
      {
        title: 'Plano de cuidado',
        text: 'As orientações são construídas de forma transparente, respeitando o seu tempo e suas expectativas.',
      },
      {
        title: 'Acompanhamento',
        text: 'O cuidado continua após o atendimento, com atenção próxima em cada etapa do processo.',
      },
    ],
  },

  experience: {
    title: 'Um espaço para você se sentir acolhida',
    text: 'Um ambiente acolhedor, preparado para que cada cliente possa desacelerar, se sentir à vontade e receber um atendimento atento, respeitoso e personalizado.',
    placeholders: [
      { label: 'Fachada', description: 'Foto oficial em preparação' },
      { label: 'Entrada', description: 'Foto oficial em preparação' },
      { label: 'Recepção', description: 'Foto oficial em preparação' },
      { label: 'Sala de atendimento', description: 'Foto oficial em preparação' },
      { label: 'Equipamentos', description: 'Foto oficial em preparação' },
      { label: 'Detalhes do ambiente', description: 'Foto oficial em preparação' },
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

  treatments: [],
  treatmentsCatalogNotice: 'Catálogo oficial em atualização.',

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

  seo: {
    title: 'Leh Estetic | Estética Facial e Regenerativa',
    description:
      'Conheça a Leh Estetic, especializada em estética facial e regenerativa, com atendimento personalizado, acolhedor e responsável.',
  },

  footer: {
    developedBy: 'Desenvolvido por Matos Soluções',
  },

  whatsappDefaultMessage:
    'Olá! Conheci a Leh Estetic pelo site e gostaria de solicitar informações sobre os tratamentos e horários disponíveis.',
};
