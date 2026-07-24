import { siteContent } from '../data/siteContent';

export function getTreatmentCategoryName(categoryId: string | undefined): string | undefined {
  if (!categoryId) return undefined;
  return siteContent.treatmentCategories.find((category) => category.id === categoryId)?.name;
}
