export interface TargetAudience {
  primary: string;
  secondary?: string;
  pain_points: string[];
  desired_outcomes: string[];
}

export interface ThreeSecondItem {
  pass: boolean;
  score?: number;
  comment: string;
}

export interface ThreeSecondAudit {
  for_whom: ThreeSecondItem;
  what_service: ThreeSecondItem;
  credible: ThreeSecondItem;
  reason_to_act: ThreeSecondItem;
  location_clear: ThreeSecondItem;
  next_action: ThreeSecondItem;
}

export interface Diagnosis {
  strengths: string[];
  problems: string[];
  missing_elements: string[];
}

export interface ElixenceMarketingBrain {
  brand_vs_response_gap: string;
  psychological_barrier: string;
  conversion_architecture: string;
  executive_verdict: string;
}

export interface ConceptDetail {
  summary: string;
  layout: string[];
  headline?: string;
  visual_description?: string;
  color_scheme?: string;
}

export interface Concepts {
  direct_response: ConceptDetail;
  brand_response: ConceptDetail;
  minimal_sign: ConceptDetail;
}

export interface FinalPrompt {
  direct_response: string;
  brand_response: string;
  minimal_sign: string;
}

export interface AdDiagnosisResult {
  detected_media: string;
  current_ad_summary: string;
  target_audience: TargetAudience;
  three_second_audit?: ThreeSecondAudit;
  diagnosis: Diagnosis;
  elixence_marketing_brain?: ElixenceMarketingBrain;
  winning_angle: string;
  main_copy_options: string[];
  offer_options: string[];
  cta_options: string[];
  trust_elements: string[];
  remove_or_reduce: string[];
  information_priority: string[];
  concepts: Concepts;
  final_prompt: FinalPrompt;
  notes: string[];
}

export interface SupplementaryInfo {
  mediaType: string;
  industryService: string;
  target: string;
  region: string;
  price: string;
  offer: string;
  reviews: string;
  credentials: string;
  storeLocation: string;
  distanceStation: string;
  businessHours: string;
  finalGoal: string;
}

export interface AdPreset {
  id: string;
  name: string;
  category: string;
  tagline: string;
  imageTitle: string;
  imageDataUrl: string;
  metadata: SupplementaryInfo;
}
