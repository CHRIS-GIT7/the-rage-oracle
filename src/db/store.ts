import { AssessmentSubmission, AdminStats } from '../types';
import { SEEDED_ASSESSMENTS } from '../data/seededAssessments';

// Global memory store for server and client session
const STORAGE_KEY = 'brand_oracle_assessments_v1';

class AssessmentStore {
  private assessments: Map<string, AssessmentSubmission> = new Map();

  constructor() {
    this.initializeStore();
  }

  private initializeStore() {
    // Seed initial demo data
    SEEDED_ASSESSMENTS.forEach(item => {
      this.assessments.set(item.id, item);
    });

    // If running in browser, try to load stored submissions
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const items: AssessmentSubmission[] = JSON.parse(stored);
          items.forEach(item => this.assessments.set(item.id, item));
        } else {
          this.persistToLocalStorage();
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
  }

  private persistToLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        const list = Array.from(this.assessments.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.warn('LocalStorage persist error:', e);
      }
    }
  }

  public getAll(): AssessmentSubmission[] {
    return Array.from(this.assessments.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getById(id: string): AssessmentSubmission | undefined {
    return this.assessments.get(id);
  }

  public save(submission: AssessmentSubmission): AssessmentSubmission {
    this.assessments.set(submission.id, submission);
    this.persistToLocalStorage();
    return submission;
  }

  public delete(id: string): boolean {
    const res = this.assessments.delete(id);
    this.persistToLocalStorage();
    return res;
  }

  public getAdminStats(): AdminStats {
    const list = Array.from(this.assessments.values());
    const total = list.length;
    const completed = list.filter(a => a.status === 'completed' && a.analysis);
    const emailSentCount = list.filter(a => a.emailStatus === 'sent').length;

    const avgClarity = completed.length > 0
      ? Math.round(completed.reduce((acc, curr) => acc + (curr.analysis?.brandClarityIndex || 0), 0) / completed.length)
      : 0;

    const emailRate = total > 0 ? Math.round((emailSentCount / total) * 100) : 100;

    // Constraints frequency
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
      ]
    };
  }
}

export const store = new AssessmentStore();
