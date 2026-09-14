// Central feature flags configuration for CareerCompass AI
export const FEATURE_FLAGS = {
  showReport: true,
  showCompanies: true,
  showCertifications: true,
  showRoadmap: true,
  showResume: true,
  showCodingWorkbench: true,
  showMockInterview: true,
  showJobCautions: true,
  showProfile: true
};
export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;
