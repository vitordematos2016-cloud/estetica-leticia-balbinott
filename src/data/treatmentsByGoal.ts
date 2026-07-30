import type { SkinGoal } from '../types/siteContent';

/**
 * Configuração centralizada entre cada objetivo de "Qual cuidado sua pele
 * precisa?" e os tratamentos reais do catálogo (`treatments[].id`) -- fonte
 * única, usada pelo clique em "Ver tratamentos" (`SkinConcerns.tsx`) para
 * filtrar a grade de Tratamentos. Mapeamento revisado para ficar mais
 * específico por objetivo (evita repetir o mesmo tratamento em quase todos
 * os grupos), com base só no que já existe em `summary`/`description` de
 * cada tratamento -- nunca numa indicação clínica inventada. Ultramed,
 * Depilação a Laser e Remoção de Tatuagem seguem fora de todo objetivo: os
 * dois últimos por categoria ("depilacao-tecnologias" -- tecnologias que não
 * são cuidados de pele do rosto) e o Ultramed por sua própria descrição
 * ainda não confirmar a técnica utilizada.
 */
export const treatmentsByGoal: Record<SkinGoal, string[]> = {
  manchas: ['peeling-hollywood', 'rejuvenescedor-clareador', 'skin-class'],
  'linhas-sinais': ['rejuvenescedor-clareador', 'microagulhamento', 'jato-de-plasma', 'skin-booster'],
  'oleosidade-acne': ['limpeza-pele-premium', 'limp-ghk-cu', 'herbal-peel'],
  'textura-vico': ['dermaplaning', 'skin-class', 'herbal-peel', 'peeling-hollywood', 'skin-booster', 'microagulhamento'],
  'saude-pele': ['limp-ghk-cu', 'skin-class', 'skin-booster', 'rejuvenescedor-clareador'],
  flacidez: ['jato-de-plasma', 'microagulhamento'],
  'prevencao-envelhecimento': ['skin-booster', 'microagulhamento', 'rejuvenescedor-clareador', 'skin-class'],
};
