import { getSource } from '../data/sources';
import { usePresentationStore } from '../store/presentationStore';

interface SourceBadgeProps {
  sourceId: string;
  label?: string;
}

export function SourceBadge({ sourceId, label = 'NGUỒN' }: SourceBadgeProps) {
  const openSource = usePresentationStore((state) => state.openSource);
  const source = getSource(sourceId);
  if (!source) return null;
  return (
    <button className="source-badge" type="button" onClick={() => openSource(sourceId)} aria-label={`Mở nguồn: ${source.title}`}>
      <span className="source-badge__dot" aria-hidden="true" />
      <span>{label}</span>
      <span className="source-badge__arrow" aria-hidden="true">↗</span>
    </button>
  );
}
