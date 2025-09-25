export interface GradeResult {
  letterGrade: string;
  gpa: string;
}

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

export function calculateGradeAndGPA(percentage: string | number): GradeResult {
  let grade: number;
  
  if (typeof percentage === 'string') {
    const parsed = parseGradeInput(percentage);
    if (parsed === null) {
      return { letterGrade: '', gpa: '' };
    }
    grade = parsed;
  } else {
    grade = percentage;
  }
  
  if (isNaN(grade) || grade < 0 || grade > 100) {
    return { letterGrade: '', gpa: '' };
  }
  
  let letterGrade: string;
  let gpa: string;
  
  if (grade >= 90) {
    letterGrade = 'A+';
    gpa = '4.0';
  } else if (grade >= 85) {
    letterGrade = 'A';
    gpa = '4.0';
  } else if (grade >= 80) {
    letterGrade = 'A-';
    gpa = '3.7';
  } else if (grade >= 77) {
    letterGrade = 'B+';
    gpa = '3.3';
  } else if (grade >= 73) {
    letterGrade = 'B';
    gpa = '3.0';
  } else if (grade >= 70) {
    letterGrade = 'B-';
    gpa = '2.7';
  } else if (grade >= 67) {
    letterGrade = 'C+';
    gpa = '2.3';
  } else if (grade >= 63) {
    letterGrade = 'C';
    gpa = '2.0';
  } else if (grade >= 60) {
    letterGrade = 'C-';
    gpa = '1.7';
  } else if (grade >= 55) {
    letterGrade = 'D+';
    gpa = '1.3';
  } else if (grade >= 50) {
    letterGrade = 'D';
    gpa = '1.0';
  } else {
    letterGrade = 'F';
    gpa = '0.0';
  }
  
  return { letterGrade, gpa };
}

export function isValidGrade(percentage: string): boolean {
  const parsed = parseGradeInput(percentage);
  return parsed !== null && parsed >= 0 && parsed <= 100;
}

export function formatGradeInput(input: string): string {
  const parsed = parseGradeInput(input);
  if (parsed === null) return input;
  return parsed.toFixed(1) + '%';
}
