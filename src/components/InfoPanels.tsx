import { useMemo } from 'react';
import { formatDuration, scenes } from '../data/scenes';
import { sources } from '../data/sources';
import { usePresentationStore } from '../store/presentationStore';

export function SourcesDrawer() {
  const visible = usePresentationStore((state) => state.showSources);
  const activeSourceId = usePresentationStore((state) => state.activeSourceId);
  const currentScene = usePresentationStore((state) => state.currentScene);
  const closePanels = usePresentationStore((state) => state.closePanels);
  const currentSources = useMemo(() => {
    const ids = scenes[currentScene].sourceIds;
    return [...sources].sort((a, b) => Number(b.id === activeSourceId) - Number(a.id === activeSourceId))
      .filter((source) => ids.includes(source.id) || source.id === activeSourceId || activeSourceId === null);
  }, [activeSourceId, currentScene]);

  if (!visible) return null;
  return (
    <div className="panel-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
      <aside className="side-panel" role="dialog" aria-modal="true" aria-labelledby="sources-title">
        <div className="side-panel__topline"><span className="panel-kicker">ARCHIVE / INDEX</span><button className="icon-button" onClick={closePanels} aria-label="Đóng nguồn">×</button></div>
        <h2 id="sources-title">Nguồn tư liệu</h2>
        <p className="panel-intro">Danh mục tư liệu cho các mốc lịch sử. SourceBadge trong từng scene mở đúng bản ghi liên quan.</p>
        <div className="source-list">
          {currentSources.length ? currentSources.map((source) => (
            <article className={`source-record ${source.id === activeSourceId ? 'source-record--active' : ''}`} key={source.id}>
              <div className="source-record__meta"><span>{source.organization}</span><span>{source.year}</span></div>
              <h3>{source.title}</h3>
              <p>{source.supports}</p>
              <small className="source-record__scenes">SCENE {source.usedInScenes.map((index) => scenes[index].number).join(' · ')}</small>
              <a href={source.url} target="_blank" rel="noreferrer">Mở tư liệu gốc <span aria-hidden="true">↗</span></a>
            </article>
          )) : <p className="panel-empty">Scene này dùng câu hỏi dẫn dắt và sơ đồ phân tích, không nêu dữ kiện lịch sử mới.</p>}
        </div>
        <p className="panel-footnote">Nội dung trình chiếu được lưu cục bộ; liên kết nguồn cần Internet để mở.</p>
      </aside>
    </div>
  );
}

export function AIUsagePanel() {
  const visible = usePresentationStore((state) => state.showAIUsage);
  const closePanels = usePresentationStore((state) => state.closePanels);
  if (!visible) return null;
  return (
    <div className="panel-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
      <aside className="side-panel ai-panel" role="dialog" aria-modal="true" aria-labelledby="ai-title">
        <div className="side-panel__topline"><span className="panel-kicker">APPENDIX / TRANSPARENCY</span><button className="icon-button" onClick={closePanels} aria-label="Đóng AI Usage">×</button></div>
        <h2 id="ai-title">AI usage &amp;<br />academic integrity</h2>
        <div className="ai-fields">
          <section><span className="field-label">Công cụ</span><p>ChatGPT hỗ trợ phác thảo trải nghiệm và viết prototype. Không sử dụng AI tạo ảnh.</p></section>
          <section><span className="field-label">Prompt chính</span><p>Đặc tả do người dùng cung cấp về cinematic presentation 1911–1920, thiết kế bảo tàng đương đại và các tiêu chí liêm chính học thuật.</p></section>
          <section><span className="field-label">AI hỗ trợ</span><p>Cấu trúc scene, microcopy, mã giao diện, gợi ý chuyển động và hình khối 3D trừu tượng.</p></section>
          <section><span className="field-label">Trách nhiệm biên tập của nhóm</span><p>Đối chiếu giáo trình và nguồn chính thống; kiểm chứng dữ kiện; biên tập lời dẫn; quyết định thiết kế cuối cùng trước khi trình bày.</p></section>
          <section><span className="field-label">Tư liệu hình ảnh</span><p>Không dùng ảnh AI hoặc ảnh lưu trữ trong bản này. Hình ảnh được dựng bằng typography, CSS và hình học 3D.</p></section>
        </div>
        <blockquote>“AI được sử dụng như công cụ hỗ trợ. Nhóm chịu trách nhiệm kiểm chứng, biên tập và chịu trách nhiệm về nội dung cuối cùng.”</blockquote>
        <p className="panel-footnote">Bản trình diễn này không tự nhận nhóm đã hoàn tất bước đối chiếu; hãy hoàn thiện bước biên tập và xác minh trước buổi học.</p>
      </aside>
    </div>
  );
}

export function PresenterOverlay() {
  const visible = usePresentationStore((state) => state.showPresenterInfo);
  const currentScene = usePresentationStore((state) => state.currentScene);
  if (!visible) return null;
  const scene = scenes[currentScene];
  const elapsed = scenes.slice(0, currentScene).reduce((sum, item) => sum + item.durationSeconds, 0);
  return (
    <aside className="presenter-overlay" aria-label="Thông tin dành cho người thuyết trình">
      <div className="presenter-overlay__top"><span>REHEARSAL MODE</span><span>{scene.number} / 11</span></div>
      <h2>{scene.eyebrow}</h2>
      <p>{scene.narration}</p>
      <div className="presenter-overlay__grid">
        <div><span>THỜI LƯỢNG</span><strong>{formatDuration(scene.durationSeconds)}</strong></div>
        <div><span>THỜI GIAN TÍCH LŨY</span><strong>{formatDuration(elapsed)}</strong></div>
      </div>
      <div className="presenter-overlay__next"><span>TIẾP THEO</span><strong>{scene.nextLabel}</strong></div>
      <small>Nhấn P để ẩn bảng tập dượt</small>
    </aside>
  );
}

export function SceneOverview() {
  const visible = usePresentationStore((state) => state.showOverview);
  const closePanels = usePresentationStore((state) => state.closePanels);
  const goToScene = usePresentationStore((state) => state.goToScene);
  const currentScene = usePresentationStore((state) => state.currentScene);
  if (!visible) return null;
  return (
    <div className="overview-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
      <section className="overview-panel" role="dialog" aria-modal="true" aria-labelledby="overview-title">
        <div className="overview-panel__header"><div><span className="panel-kicker">SCENE INDEX / 1911—1920</span><h2 id="overview-title">Hành trình</h2></div><button className="icon-button" onClick={closePanels} aria-label="Đóng mục lục">×</button></div>
        <div className="overview-list">
          {scenes.map((scene, index) => (
            <button className={`overview-item ${currentScene === index ? 'overview-item--active' : ''}`} key={scene.id} onClick={() => goToScene(index)}>
              <span className="overview-item__num">{scene.number}</span><span className="overview-item__copy"><small>{scene.eyebrow}</small><strong>{scene.title.replace('\n', ' ')}</strong></span><span className="overview-item__time">{formatDuration(scene.durationSeconds)}</span>
            </button>
          ))}
        </div>
        <div className="overview-panel__footer"><span>TỔNG THỜI LƯỢNG</span><strong>17:15</strong><span>11 cảnh · điều khiển thủ công</span></div>
      </section>
    </div>
  );
}

const milestones = [
  { label: '1911', scene: 3 },
  { label: '1919', scene: 5 },
  { label: '07.1920', scene: 6 },
  { label: '12.1920', scene: 7 },
];

export function ProgressTimeline({ visible }: { visible: boolean }) {
  const currentScene = usePresentationStore((state) => state.currentScene);
  const goToScene = usePresentationStore((state) => state.goToScene);
  const isConceptual = [2, 8, 9].includes(currentScene);
  const chapterLabels = ['BỐI CẢNH', 'HÀNH TRÌNH', 'BƯỚC NGOẶT', 'TỔNG HỢP'];
  const activeChapter = scenes[currentScene].chapter;
  return (
    <nav className={`progress-timeline ${visible ? 'progress-timeline--visible' : ''}`} aria-label="Tiến trình presentation">
      {isConceptual ? chapterLabels.map((chapter) => (
        <button key={chapter} className={`timeline-chapter ${activeChapter === chapter ? 'timeline-chapter--active' : ''}`} onClick={() => {
          const match = scenes.findIndex((scene) => scene.chapter === chapter);
          if (match >= 0) goToScene(match);
        }}>{chapter}</button>
      )) : milestones.map((milestone) => (
        <button key={milestone.label} className={`timeline-milestone ${currentScene === milestone.scene ? 'timeline-milestone--active' : ''}`} onClick={() => goToScene(milestone.scene)}>
          <span>{milestone.label}</span><i aria-hidden="true" />
        </button>
      ))}
      <span className="timeline-current">{scenes[currentScene].number} / 11</span>
    </nav>
  );
}

export function NavigationHint() {
  const visible = usePresentationStore((state) => state.showNavigation);
  const fullscreen = usePresentationStore((state) => state.isFullscreen);
  if (!visible) return null;
  return (
    <div className="navigation-hint" aria-label="Phím tắt">
      <span><kbd>←</kbd><kbd>→</kbd> di chuyển</span><span><kbd>F</kbd> {fullscreen ? 'thoát toàn màn hình' : 'toàn màn hình'}</span><span><kbd>S</kbd> nguồn</span><span><kbd>A</kbd> AI</span><span><kbd>O</kbd> mục lục</span>
    </div>
  );
}
