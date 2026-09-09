// Central feature flags configuration for CareerCompass AI
export const FEATURE_FLAGS = {
  showReport: true,
  showCertifications: true,
  showRoadmap: true,
  showResume: true,
  showCodingWorkbench: false,
  showMockInterview: false,
  showJobCautions: false
};
export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;
