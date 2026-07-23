import { siteContent } from '../data/siteContent';

export function getTreatmentCategoryName(categoryId: string): string {
  return (
    siteContent.treatmentCategories.find((category) => category.id === categoryId)?.name ??
    categoryId
  );
}
