import { useEffect, useMemo, useRef } from 'react';
import { formatDuration, scenes } from '../data/scenes';
import { sources } from '../data/sources';
import { usePresentationStore } from '../store/presentationStore';

function usePanelFocus(visible: boolean) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!visible) return;
    const panel = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () => Array.from(panel?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? []);
    (getFocusable()[0] ?? panel)?.focus();

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) {
        event.preventDefault();
        panel?.focus();
      } else if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener('keydown', onTab, true);
    return () => {
      document.removeEventListener('keydown', onTab, true);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [visible]);

  return dialogRef;
}

export function SourcesDrawer() {
  const visible = usePresentationStore((state) => state.showSources);
  const activeSourceId = usePresentationStore((state) => state.activeSourceId);
  const currentScene = usePresentationStore((state) => state.currentScene);
  const closePanels = usePresentationStore((state) => state.closePanels);
  const dialogRef = usePanelFocus(visible);
  const currentSources = useMemo(() => {
    const ids = scenes[currentScene].sourceIds;
    return [...sources].sort((a, b) => Number(b.id === activeSourceId) - Number(a.id === activeSourceId))
      .filter((source) => ids.includes(source.id) || source.id === activeSourceId);
  }, [activeSourceId, currentScene]);

  if (!visible) return null;
  return (
    <div className="panel-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
      <aside ref={dialogRef} className="side-panel" role="dialog" aria-modal="true" aria-labelledby="sources-title" tabIndex={-1}>
        <div className="side-panel__topline"><span className="panel-kicker">ARCHIVE / INDEX</span><button className="icon-button" onClick={closePanels} aria-label="Đóng nguồn">×</button></div>
        <h2 id="sources-title">Nguồn tư liệu</h2>
        <p className="panel-intro">Các tư liệu được gắn với cảnh hiện tại; đường dẫn mở trang nguồn gốc.</p>
        <div className="source-list">
          {currentSources.length ? currentSources.map((source) => (
            <article className={`source-record ${source.id === activeSourceId ? 'source-record--active' : ''}`} key={source.id}>
              <div className="source-record__meta"><span>{source.organization}</span><span>{source.year}</span></div>
              <h3>{source.title}</h3>
              <p>{source.supports}</p>
              <small className="source-record__scenes">CẢNH {scenes.filter((item) => item.sourceIds.includes(source.id)).map((item) => item.number).join(' · ')}</small>
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
  const dialogRef = usePanelFocus(visible);
  if (!visible) return null;
  return (
    <div className="panel-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
      <aside ref={dialogRef} className="side-panel ai-panel" role="dialog" aria-modal="true" aria-labelledby="ai-title" tabIndex={-1}>
        <div className="side-panel__topline"><span className="panel-kicker">MINH BẠCH / PHƯƠNG PHÁP</span><button className="icon-button" onClick={closePanels} aria-label="Đóng thông tin AI">×</button></div>
        <h2 id="ai-title">Sử dụng AI<br />và liêm chính học thuật</h2>
        <div className="ai-fields">
          <section><span className="field-label">Công cụ</span><p>ChatGPT và Codex (GPT-6 Luna) hỗ trợ cấu trúc nội dung, lời dẫn, giao diện React/TypeScript/CSS, rà soát mã và kiểm tra hiển thị.</p></section>
          <section><span className="field-label">Đề bài và đầu ra</span><p>Brief đính kèm có prompt mẫu: “Dựa trên rubric, xây dựng bài thuyết trình 15–20 phút…”. Đây là câu mẫu trong brief, không phải bản ghi prompt từng lượt. AI hỗ trợ dàn ý, lời dẫn, ghi chú thuyết trình và câu hỏi tương tác cho 11 cảnh.</p></section>
          <section><span className="field-label">Chỉnh sửa và kiểm chứng</span><p>Codex chuyển nội dung thành trình chiếu React/Three.js, chỉnh lời dẫn và tương tác, gắn nguồn cho cảnh và mô hình. Kiểm tra kỹ thuật gồm build, ảnh chụp trình duyệt và hành vi điều khiển; các bước này không thay thế việc thẩm định sử liệu. Nhóm vẫn cần duyệt nội dung cuối.</p></section>
          <section><span className="field-label">Nguồn nội dung</span><p>Đề tài và tư liệu nội dung do người dùng cung cấp; các mốc lịch sử trên trang được liên kết đến nguồn tham khảo tương ứng.</p></section>
          <section><span className="field-label">Tài sản hình ảnh và 3D</span><p>Địa cầu dùng bản đồ NASA Visible Earth (public domain); hoa sen của Sean Tarrant dùng theo CC BY, <a href="https://poly.pizza/m/6rLIFNbNTRG" target="_blank" rel="noreferrer">xem ghi công</a>. La bàn, bánh lái, sách, máy chữ và máy in từ 3DAssets.dev dùng CC0 1.0; trang đóng góp khai báo có AI hỗ trợ. Tất cả chỉ là minh họa, không phải hiện vật lịch sử. <a href="https://commons.wikimedia.org/wiki/File:Equirectangular-projection.jpg" target="_blank" rel="noreferrer">Nguồn bản đồ NASA</a>.</p></section>
          <section><span className="field-label">Rà soát của nhóm</span><p>Không tạo ảnh mới bằng công cụ tạo ảnh. Kiểm tra kỹ thuật không xác nhận mọi diễn giải lịch sử; việc đọc đối chiếu độc lập và duyệt cuối của nhóm vẫn đang chờ.</p></section>
        </div>
        <blockquote>“AI hỗ trợ quá trình chuẩn bị. Nhóm cần tự kiểm chứng, biên tập và chịu trách nhiệm về nội dung cuối cùng.”</blockquote>
      </aside>
    </div>
  );
}

export function PresenterOverlay() {
  const visible = usePresentationStore((state) => state.showPresenterInfo);
  const currentScene = usePresentationStore((state) => state.currentScene);
  const togglePresenterInfo = usePresentationStore((state) => state.togglePresenterInfo);
  if (!visible) return null;
  const scene = scenes[currentScene];
  const elapsed = scenes.slice(0, currentScene).reduce((sum, item) => sum + item.durationSeconds, 0);
  const questions = [
    {
      question: 'Tại sao lấy năm 1920 làm bước ngoặt mà không phải năm 1911?',
      answer: '1911 là điểm khởi đầu của quá trình tìm kiếm; tháng 7 và tháng 12/1920 lần lượt thể hiện bước chuyển về lý luận và lựa chọn chính trị. Hai mốc có chức năng khác nhau.',
    },
    {
      question: 'Nguyễn Ái Quốc đến với chủ nghĩa Mác – Lênin có phải chỉ vì đọc Luận cương của Lênin?',
      answer: 'Không nên diễn giải như vậy. Hồ Chí Minh sau này mô tả đó là quá trình từng bước, kết hợp nghiên cứu lý luận với hoạt động thực tế. Luận cương là bước ngoặt trong một quá trình đã được chuẩn bị bởi nhiều năm trải nghiệm.',
    },
    {
      question: 'Chủ nghĩa yêu nước có mất đi sau năm 1920 không?',
      answer: 'Không. Trong lời tự thuật về quá trình tư tưởng của mình, chủ nghĩa yêu nước là điểm xuất phát đưa Nguyễn Ái Quốc đến việc tìm hiểu Lênin và Quốc tế III.',
    },
    {
      question: 'Tại sao đưa số liệu xuất nhập khẩu 2025 vào chủ đề 1911–1920?',
      answer: 'Số liệu hiện tại không chứng minh lịch sử. Nó cung cấp bối cảnh hội nhập để liên hệ bài học về tiếp nhận tri thức quốc tế, năng lực chọn lọc và tự chủ.',
    },
  ];
  return (
    <aside className="presenter-overlay" aria-label="Thông tin dành cho người thuyết trình">
      <div className="presenter-overlay__top"><span>GHI CHÚ NGƯỜI THUYẾT TRÌNH</span><button className="icon-button" onClick={togglePresenterInfo} aria-label="Đóng ghi chú">×</button></div>
      <h2>{scene.number} · {scene.title}</h2>
      <div className="presenter-overlay__grid">
        <div><span>THỜI LƯỢNG MỤC TIÊU</span><strong>{formatDuration(scene.durationSeconds)}</strong></div>
        <div><span>THỜI LƯỢNG TRƯỚC ĐÓ</span><strong>{formatDuration(elapsed)}</strong></div>
      </div>
      <div className="presenter-overlay__next"><span>CHUYỂN Ý</span><p>{scene.transition}</p></div>
      <section className="presenter-notes"><h3>Lời dẫn</h3><p>{scene.speakerNotes}</p></section>
      <section className="presenter-questions"><h3>Câu hỏi dự kiến</h3>
        {questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
      </section>
    </aside>
  );
}

export function SceneOverview() {
  const visible = usePresentationStore((state) => state.showOverview);
  const closePanels = usePresentationStore((state) => state.closePanels);
  const goToScene = usePresentationStore((state) => state.goToScene);
  const currentScene = usePresentationStore((state) => state.currentScene);
  const dialogRef = usePanelFocus(visible);
  if (!visible) return null;
  return (
    <div className="overview-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
      <section ref={dialogRef} className="overview-panel" role="dialog" aria-modal="true" aria-labelledby="overview-title" tabIndex={-1}>
        <div className="overview-panel__header"><div><span className="panel-kicker">MỤC LỤC / 1911—SAU 1920</span><h2 id="overview-title">Hành trình</h2></div><button className="icon-button" onClick={closePanels} aria-label="Đóng mục lục">×</button></div>
        <div className="overview-list">
          {scenes.map((scene, index) => (
            <button className={`overview-item ${currentScene === index ? 'overview-item--active' : ''}`} key={scene.id} onClick={() => goToScene(index)}>
              <span className="overview-item__num">{scene.number}</span><span className="overview-item__copy"><small>{scene.eyebrow}</small><strong>{scene.title.replace('\n', ' ')}</strong></span><span className="overview-item__time">{formatDuration(scene.durationSeconds)}</span>
            </button>
          ))}
        </div>
        <div className="overview-panel__footer"><span>TỔNG THỜI LƯỢNG</span><strong>{formatDuration(scenes.reduce((sum, scene) => sum + scene.durationSeconds, 0))}</strong><span>{scenes.length} cảnh · điều khiển thủ công</span></div>
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
