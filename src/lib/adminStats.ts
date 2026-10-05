import type { AssessmentSubmission, AdminStats } from '../types';

export function buildMonthlyVolume(
  assessments: AssessmentSubmission[],
  now = new Date()
): AdminStats['monthlyVolume'] {
  const counts = new Map<string, number>();
  const monthKeys: string[] = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const month = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
    const key = `${month.getUTCFullYear()}-${String(month.getUTCMonth() + 1).padStart(2, '0')}`;
    monthKeys.push(key);
    counts.set(key, 0);
  }

  for (const assessment of assessments) {
    const createdAt = new Date(assessment.createdAt);
    if (Number.isNaN(createdAt.getTime())) continue;
    const key = `${createdAt.getUTCFullYear()}-${String(createdAt.getUTCMonth() + 1).padStart(2, '0')}`;
    if (counts.has(key)) counts.set(key, counts.get(key)! + 1);
  }

  return monthKeys.map(key => ({
    month: new Date(`${key}-01T00:00:00.000Z`).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }),
    count: counts.get(key) || 0,
  }));
}
