
export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface FactCheckResult {
  rating: 'True' | 'False' | 'Misleading' | 'Partially True' | 'Unverifiable';
  summary: string;
  justification: string;
  sources: GroundingChunk[];
}
