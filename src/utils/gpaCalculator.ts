import gradingScale from '@/data/grading-scale.json';

export interface GradingScaleEntry {
  minPercentage: number;
  maxPercentage: number;
  letterGrade: string;
  gradePoints: number;
}

export interface GradeResult {
  letterGrade: string;
  gradePoints: number;
}

export interface CourseGPAStats {
  gpa: number;
  letterGrade: string;
  totalCredits: number;
  weightedPoints: number;
}

/**
 * Parse grade input to get percentage value
 */
export function parseGradeInput(input: string): number | null {
  if (!input || input.trim() === '') return null;
  
  const trimmed = input.trim();
  
  // Check if it's a fraction format (e.g., "87/100", "15/20")
  const fractionMatch = trimmed.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const numerator = parseFloat(fractionMatch[1]);
    const denominator = parseFloat(fractionMatch[2]);
    
    if (denominator === 0) return null;
    
    const percentage = (numerator / denominator) * 100;
    return percentage;
  }
  
  // Check if it's already a percentage
  const percentageMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*%?$/);
  if (percentageMatch) {
    const value = parseFloat(percentageMatch[1]);
    return value;
  }
  
  return null;
}

/**
 * Get letter grade and grade points for a given percentage
 */
export function getGradeFromPercentage(percentage: number): GradeResult {
  if (isNaN(percentage) || percentage < 0 || percentage > 100) {
    return { letterGrade: '', gradePoints: 0 };
  }
  
  const gradeEntry = gradingScale.find(entry => 
    percentage >= entry.minPercentage && percentage <= entry.maxPercentage
  );
  
  if (gradeEntry) {
    return {
      letterGrade: gradeEntry.letterGrade,
      gradePoints: gradeEntry.gradePoints
    };
  }
  
  return { letterGrade: '', gradePoints: 0 };
}

/**
 * Calculate GPA for a single grade input
 */
export function calculateGradeAndGPA(percentage: string | number): GradeResult {
  let grade: number;
  
  if (typeof percentage === 'string') {
    const parsed = parseGradeInput(percentage);
    if (parsed === null) {
      return { letterGrade: '', gradePoints: 0 };
    }
    grade = parsed;
  } else {
    grade = percentage;
  }
  
  return getGradeFromPercentage(grade);
}

/**
 * Check if a grade input is valid
 */
export function isValidGrade(percentage: string): boolean {
  const parsed = parseGradeInput(percentage);
  return parsed !== null && parsed >= 0 && parsed <= 100;
}

/**
 * Format grade input for display
 */
export function formatGradeInput(input: string): string {
  const parsed = parseGradeInput(input);
  if (parsed === null) return input;
  return parsed.toFixed(1) + '%';
}

/**
 * Calculate course GPA from deliverables
 */
export function calculateCourseGPA(deliverables: any[]): CourseGPAStats {
  let totalWeightedPoints = 0;
  let totalCredits = 0;
  
  deliverables.forEach(deliverable => {
    const grade = deliverable['Grade %'];
    const weight = parseFloat(deliverable['Weight %']) || 0;
    
    if (grade && grade !== '' && grade !== 'Not specified' && grade !== 'Not graded') {
      const parsedGrade = parseGradeInput(grade);
      if (parsedGrade !== null) {
        const gradeResult = getGradeFromPercentage(parsedGrade);
        totalWeightedPoints += gradeResult.gradePoints * weight;
        totalCredits += weight;
      }
    }
  });
  
  const gpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
  
  // Calculate the weighted average percentage to get the correct letter grade
  let totalWeightedPercentage = 0;
  let totalWeight = 0;
  
  deliverables.forEach(deliverable => {
    const grade = deliverable['Grade %'];
    const weight = parseFloat(deliverable['Weight %']) || 0;
    
    if (grade && grade !== '' && grade !== 'Not specified' && grade !== 'Not graded') {
      const parsedGrade = parseGradeInput(grade);
      if (parsedGrade !== null) {
        totalWeightedPercentage += parsedGrade * weight;
        totalWeight += weight;
      }
    }
  });
  
  const averagePercentage = totalWeight > 0 ? totalWeightedPercentage / totalWeight : 0;
  const letterGrade = getGradeFromPercentage(averagePercentage).letterGrade;
  
  return {
    gpa: Math.round(gpa * 10) / 10, // Round to 1 decimal place
    letterGrade,
    totalCredits,
    weightedPoints: totalWeightedPoints
  };
}
