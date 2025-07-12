export interface Essay {
  title: string;
  description: string;
  coverImage: string;
  slug: string;
  date: string;
  readTime: number;
  icon?: string; // Lucide icon name as string
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

// Import individual essays
import { bearspawGolfEvaluation } from './bearspaw-golf-evaluation';
import { canadaLabourEconomicModel } from './canada-labour-economic-model';
import { canadaWildfireManagement } from './canada-wildfire-management';

// Combine all essays into a single array
export const essays: Essay[] = [
  canadaWildfireManagement,
  bearspawGolfEvaluation,
  canadaLabourEconomicModel
]; 