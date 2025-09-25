export interface GradeResult {
  letterGrade: string;
  gpa: string;
}

export function calculateGradeAndGPA(percentage: string | number): GradeResult {
  const grade = typeof percentage === 'string' ? parseFloat(percentage) : percentage;
  
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
  const grade = parseFloat(percentage);
  return !isNaN(grade) && grade >= 0 && grade <= 100;
}
