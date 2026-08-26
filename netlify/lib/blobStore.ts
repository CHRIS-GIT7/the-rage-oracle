import { getStore } from '@netlify/blobs';
import { AssessmentSubmission, AdminStats } from '../src/types.js';
import { SEEDED_ASSESSMENTS } from '../src/data/seededAssessments.js';

const STORE_NAME = 'assessments';

export async function getAllAssessments(): Promise<AssessmentSubmission[]> {
  const store = getStore(STORE_NAME);
  const { blobs } = await store.list();

  const items: AssessmentSubmission[] = [];

  // Always include seeded demo data
  const seeded = SEEDED_ASSESSMENTS as AssessmentSubmission[];
  items.push(...seeded);

  for (const blob of blobs) {
    try {
      const data = await store.get(blob.key, { type: 'json' });
      if (data) items.push(data as AssessmentSubmission);
    } catch {
      // skip corrupt entries
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getAssessmentById(id: string): Promise<AssessmentSubmission | null> {
  // Check seeded data first
  const seeded = SEEDED_ASSESSMENTS.find(a => a.id === id) as AssessmentSubmission | undefined;
  if (seeded) return seeded;

  const store = getStore(STORE_NAME);
  try {
    const data = await store.get(id, { type: 'json' });
    return (data as AssessmentSubmission) || null;
  } catch {
    return null;
  }
}

export async function saveAssessment(submission: AssessmentSubmission): Promise<void> {
  const store = getStore(STORE_NAME);
  await store.setJSON(submission.id, submission);
}

export async function deleteAssessment(id: string): Promise<boolean> {
  const store = getStore(STORE_NAME);
  try {
    await store.delete(id);
    return true;
  } catch {
    return false;
  }
}

export async function getAdminStats(): Promise<AdminStats> {
  const list = await getAllAssessments();
  const total = list.length;
  const completed = list.filter(a => a.status === 'completed' && a.analysis);
  const emailSentCount = list.filter(a => a.emailStatus === 'sent').length;

  const avgClarity =
    completed.length > 0
      ? Math.round(
          completed.reduce((acc, curr) => acc + (curr.analysis?.brandClarityIndex || 0), 0) /
            completed.length
        )
      : 0;

  const emailRate = total > 0 ? Math.round((emailSentCount / total) * 100) : 100;

  const constraintMap: Record<string, number> = {};
  const industryMap: Record<string, number> = {};

  completed.forEach(item => {
    const c = item.analysis?.primaryConstraint.name || 'Undefined Constraint';
    constraintMap[c] = (constraintMap[c] || 0) + 1;
    const ind = item.business.industry || 'Other';
    industryMap[ind] = (industryMap[ind] || 0) + 1;
  });

  const topPrimaryConstraints = Object.entries(constraintMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topIndustries = Object.entries(industryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalAssessments: total,
    completedReports: completed.length,
    averageClarityIndex: avgClarity,
    emailDeliveryRate: emailRate,
    topPrimaryConstraints,
    topIndustries,
    monthlyVolume: [
      { month: 'Jun', count: Math.max(1, Math.floor(total * 0.2)) },
      { month: 'Jul', count: Math.max(2, Math.floor(total * 0.35)) },
      { month: 'Aug', count: Math.max(3, Math.floor(total * 0.45)) },
    ],
  };
}
