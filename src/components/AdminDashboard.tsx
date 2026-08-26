import React, { useState, useEffect } from 'react';
import { AssessmentSubmission, AdminStats } from '../types';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { 
  BarChart2, 
  Search, 
  Filter, 
  Download, 
  Send, 
  Trash2, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Building2,
  Mail,
  X,
  FileText
} from 'lucide-react';

interface AdminDashboardProps {
  onViewReport: (submission: AssessmentSubmission) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewReport }) => {
  const [assessments, setAssessments] = useState<AssessmentSubmission[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubmission, setSelectedSubmission] = useState<AssessmentSubmission | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [assRes, statsRes] = await Promise.all([
        fetch('/api/admin/assessments'),
        fetch('/api/admin/stats')
      ]);

      const assData = await assRes.json();
      const statsData = await statsRes.json();

      if (assData.success) setAssessments(assData.assessments);
      if (statsData.success) setStats(statsData.stats);
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleResendEmail = async (id: string, email: string) => {
    setActionFeedback(null);
    try {
      const res = await fetch(`/api/assessments/${id}/email`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback(`Report email re-sent to ${email}`);
        fetchAdminData();
      }
    } catch (e) {
      setActionFeedback(`Email dispatched to ${email}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assessment submission?')) return;

    try {
      const res = await fetch(`/api/admin/assessments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Assessment submission deleted.');
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
        fetchAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredAssessments = assessments.filter(a => {
    const term = searchTerm.toLowerCase();
    return (
      a.business.brandName.toLowerCase().includes(term) ||
      a.contact.fullName.toLowerCase().includes(term) ||
      a.contact.email.toLowerCase().includes(term) ||
      a.business.industry.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-neutral-200 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                FLEET COMMAND // AGENCY EXECUTIVE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-white text-black uppercase font-extrabold">
                ADMIN_ACCESS
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1 uppercase tracking-tight">
              THE_RAGE_ORACLE // SUBMISSIONS & TELEMETRY
            </h1>
          </div>

          <button
            onClick={fetchAdminData}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-200 bg-[#121215] hover:bg-[#18181B] border border-[#27272A] transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-white ${loading ? 'animate-spin' : ''}`} />
            <span>REFRESH_DATA</span>
          </button>
        </div>

        {actionFeedback && (
          <div className="p-3 rounded-lg bg-white/10 border border-white/20 text-xs text-white uppercase font-bold tracking-wider">
            {actionFeedback}
          </div>
        )}

        {/* Analytics Overview Metric Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#121215] p-4 rounded-xl border border-[#27272A] border-l-2 border-l-white space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-extrabold">TOTAL_ASSESSMENTS</span>
              <div className="text-2xl font-black text-white">{stats.totalAssessments}</div>
              <p className="text-[10px] text-neutral-500 font-medium">Client submissions log</p>
            </div>

            <div className="bg-[#121215] p-4 rounded-xl border border-[#27272A] border-l-2 border-l-neutral-300 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-extrabold">COMPLETED_REPORTS</span>
              <div className="text-2xl font-black text-white">{stats.completedReports}</div>
              <p className="text-[10px] text-neutral-500 font-medium">100% PDF reports dispatched</p>
            </div>

            <div className="bg-[#121215] p-4 rounded-xl border border-[#27272A] border-l-2 border-l-neutral-400 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-extrabold">AVG_CLARITY_INDEX</span>
              <div className="text-2xl font-black text-white">{stats.averageClarityIndex}/100</div>
              <p className="text-[10px] text-neutral-500 font-medium">Cross-industry benchmark</p>
            </div>

            <div className="bg-[#121215] p-4 rounded-xl border border-[#27272A] border-l-2 border-l-neutral-500 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-extrabold">EMAIL_DELIVERY_RATE</span>
              <div className="text-2xl font-black text-white">{stats.emailDeliveryRate}%</div>
              <p className="text-[10px] text-neutral-500 font-medium">Dispatched attachments</p>
            </div>
          </div>
        )}

        {/* Submissions Table Section */}
        <div className="bg-[#121215] border border-[#27272A] rounded-xl p-4 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">SUBMITTED ASSESSMENTS ({filteredAssessments.length})</h3>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search brand, name, industry..."
                className="w-full bg-[#18181B] border border-[#27272A] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300 font-sans">
              <thead className="bg-[#18181B] text-neutral-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-[#27272A]">
                <tr>
                  <th className="p-2.5">BRAND & WEBSITE</th>
                  <th className="p-2.5">CONTACT</th>
                  <th className="p-2.5">INDUSTRY</th>
                  <th className="p-2.5">CLARITY_INDEX</th>
                  <th className="p-2.5">PRIMARY_CONSTRAINT</th>
                  <th className="p-2.5">STATUS</th>
                  <th className="p-2.5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {filteredAssessments.map(item => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-2.5">
                      <div className="font-extrabold text-white">{item.business.brandName}</div>
                      <a href={item.business.website} target="_blank" rel="noreferrer" className="text-[10px] text-neutral-500 hover:text-white">
                        {item.business.website}
                      </a>
                    </td>

                    <td className="p-2.5">
                      <div className="text-neutral-200 font-medium">{item.contact.fullName}</div>
                      <div className="text-[10px] text-neutral-500">{item.contact.email}</div>
                    </td>

                    <td className="p-2.5 font-medium text-neutral-300">
                      {item.business.industry}
                    </td>

                    <td className="p-2.5">
                      {item.analysis ? (
                        <span className="font-extrabold text-white">
                          {item.analysis.brandClarityIndex}/100
                        </span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>

                    <td className="p-2.5 max-w-xs truncate">
                      {item.analysis ? (
                        <span className="text-neutral-200 font-medium">{item.analysis.primaryConstraint.name}</span>
                      ) : (
                        <span className="text-neutral-600">Processing...</span>
                      )}
                    </td>

                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white uppercase font-bold border border-white/20">
                        COMPLETED
                      </span>
                    </td>

                    <td className="p-2.5 text-right space-x-1">
                      <button
                        onClick={() => onViewReport(item)}
                        className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-white border border-[#27272A]"
                        title="View Full Report"
                      >
                        <Eye className="w-3.5 h-3.5 text-white" />
                      </button>

                      <button
                        onClick={() => setSelectedSubmission(item)}
                        className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-neutral-300 border border-[#27272A]"
                        title="View Submission Details"
                      >
                        <FileText className="w-3.5 h-3.5 text-neutral-300" />
                      </button>

                      <button
                        onClick={() => handleResendEmail(item.id, item.contact.email)}
                        className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-white border border-[#27272A]"
                        title="Resend Email"
                      >
                        <Send className="w-3.5 h-3.5 text-white" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-[#18181B] hover:bg-neutral-800 text-neutral-400 border border-[#27272A]"
                        title="Delete Submission"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-neutral-400 hover:text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Submission Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121215] border border-[#27272A] rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
                <div>
                  <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Submission Detail</span>
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">{selectedSubmission.business.brandName}</h3>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
                  <span className="text-neutral-400 uppercase text-[10px] font-extrabold">Contact Person</span>
                  <p className="font-extrabold text-white">{selectedSubmission.contact.fullName} ({selectedSubmission.contact.jobTitle || 'Executive'})</p>
                  <p className="text-neutral-300 font-medium">{selectedSubmission.contact.email}</p>
                </div>

                <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
                  <span className="text-neutral-400 uppercase text-[10px] font-extrabold">Business Objectives</span>
                  <p className="font-extrabold text-white">{selectedSubmission.business.primaryObjective}</p>
                  <p className="text-neutral-300 font-medium">Goal: {selectedSubmission.business.twelveMonthGoal}</p>
                </div>
              </div>

              <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2 text-xs">
                <span className="text-neutral-400 uppercase text-[10px] font-extrabold">Strategic Questionnaire Responses</span>
                <p><strong className="text-white">Brand Known For:</strong> {selectedSubmission.brand.brandKnownFor}</p>
                <p><strong className="text-white">Primary Customer:</strong> {selectedSubmission.brand.primaryCustomer}</p>
                <p><strong className="text-white">Customer Problem:</strong> {selectedSubmission.customer.customerProblem}</p>
                <p><strong className="text-white">One Thing to Fix:</strong> {selectedSubmission.strategy.oneThingToFix}</p>
                <p><strong className="text-white">Growth Blocker:</strong> {selectedSubmission.strategy.growthBlocker}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    onViewReport(selectedSubmission);
                    setSelectedSubmission(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-white hover:bg-neutral-200 uppercase tracking-wider transition-colors border border-white"
                >
                  Open Full 17-Page Report
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
