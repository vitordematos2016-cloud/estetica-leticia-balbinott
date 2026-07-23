export const siteConfig = {
  locale: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  siteUrl: 'https://lehestetic.com.br',
  colors: {
    creamLight: '#F1E8DC',
    beigeMedium: '#D9C6AE',
    gold: '#B18A55',
    brown: '#5B4033',
    brownDark: '#30221C',
    white: '#FFFDF9',
  },
  fonts: {
    heading: "'Cormorant Garamond', serif",
    body: "'Jost', sans-serif",
  },
  scheduling: {
    openingHour: 8,
    closingHour: 19,
    slotIntervalMinutes: 30,
  },
} as const;

export type SiteConfig = typeof siteConfig;
