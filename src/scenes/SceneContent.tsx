import type { ReactNode } from 'react';
import type { SceneDefinition } from '../data/scenes';
import { BookOpen } from 'lucide-react';
import { usePresentationStore } from '../store/presentationStore';

function SourceRow({ scene }: { scene: SceneDefinition }) {
  const toggleSources = usePresentationStore((state) => state.toggleSources);
  return scene.sourceIds.length ? (
    <div className="scene-source-row" aria-label="Nguồn tư liệu">
      <button className="scene-source-action" type="button" onClick={toggleSources} aria-label={`Mở ${scene.sourceIds.length} nguồn tư liệu của cảnh này`}>
        <BookOpen size={15} aria-hidden="true" />
        <span>Nguồn tư liệu ({scene.sourceIds.length})</span>
      </button>
    </div>
  ) : null;
}

function Frame({ scene, children, visual, className = '' }: {
  scene: SceneDefinition;
  children: ReactNode;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <div className={'scene-layout ' + className}>
      <div className="scene-copy">
        <p className="eyebrow">{scene.eyebrow}<span className="eyebrow-rule" aria-hidden="true" /></p>
        <h1 className="serif-heading">{scene.title}</h1>
        {children}
        <SourceRow scene={scene} />
      </div>
      {visual && <aside className="scene-artifact">{visual}</aside>}
    </div>
  );
}
function Artifact({ id, label, note }: { id: string; label: string; note: string }) {
  return (
    <div className="artifact-slot" data-artifact-slot={id} aria-hidden="true">
      <div className="artifact-slot__copy"><span>{label}</span><small>{note}</small></div>
    </div>
  );
}

function Poll({ id, prompt, options, answer, explanation }: {
  id: string;
  prompt: string;
  options: { key: string; label: string }[];
  answer?: string;
  explanation?: string;
}) {
  const choice = usePresentationStore((state) => state.audienceChoices[id]);
  const revealed = usePresentationStore((state) => state.revealedAnswers.includes(id));
  const setChoice = usePresentationStore((state) => state.setAudienceChoice);
  const reveal = usePresentationStore((state) => state.revealPollAnswer);
  const reset = usePresentationStore((state) => state.resetPoll);
  return (
    <section className="audience-poll" aria-label={prompt}>
      <h2>{prompt}</h2>
      <div className="poll-options" role="group" aria-label="Chọn một phương án">
        {options.map((option) => (
          <button type="button" key={option.key} aria-pressed={choice === option.key}
            className={'poll-option' + (choice === option.key ? ' poll-option--selected' : '') +
              (revealed && option.key === answer ? ' poll-option--correct' : '')}
            onClick={() => setChoice(id, option.key)}>
            <span className="poll-option__key">{option.key}</span><span>{option.label}</span>
          </button>
        ))}
      </div>
      <div className="poll-actions">
        {choice && <span className="poll-selection" aria-live="polite">Đã ghi nhận lựa chọn của bạn.</span>}
        {answer && !revealed && <button type="button" className="text-action" onClick={() => reveal(id)}>Hiện phân tích</button>}
        {(choice || revealed) && <button type="button" className="text-action text-action--quiet" onClick={() => reset(id)}>Đặt lại</button>}
      </div>
      {revealed && explanation && <p className="poll-explanation" aria-live="polite"><strong>Phương án B.</strong> {explanation}</p>}
    </section>
  );
}

function SlideView({ scene, sceneBeat }: { scene: SceneDefinition; sceneBeat: number }) {
  switch (scene.id) {
    case 'opening':
      return <Frame scene={scene} className="scene-layout--opening" visual={<Artifact id="globe" label="Hành trình" note="Đạo cụ 3D mang tính minh họa" />}>
        <p className="body-lead">Hành trình tìm đường cứu nước của Nguyễn Ái Quốc</p>
        <p className="analysis-line">Có lòng yêu nước đã đủ để tìm ra con đường cứu nước hay chưa?</p>
        <Poll id="opening" prompt="Nếu là thanh niên Việt Nam năm 1911, bạn chọn hướng nào?" options={[
          { key: 'A', label: 'Tìm sự giúp đỡ từ một nước châu Á' },
          { key: 'B', label: 'Cải cách xã hội và giáo dục' },
          { key: 'C', label: 'Sang phương Tây để khảo nghiệm thực tế' },
        ]} />
      </Frame>;
    case 'crossroads':
      return <Frame scene={scene} className="scene-layout--crossroads" visual={<Artifact id="crossroads" label="Khủng hoảng phương hướng" note="Đầu thế kỷ XX" />}>
        <p className="body-lead">Đầu thế kỷ XX có những khuynh hướng phong kiến và dân chủ tư sản với chiến lược khác nhau; câu hỏi về con đường giành độc lập vẫn chưa có lời giải.</p>
        <div className="pathways" aria-label="Các hướng tìm đường cứu nước">
          <div className="pathway"><span>01</span><strong>Khuynh hướng phong kiến</strong><small>Khôi phục quyền tự chủ theo những cách khác nhau</small></div>
          <div className="pathway"><span>02</span><strong>Khuynh hướng dân chủ tư sản</strong><small>Canh tân, dân quyền và cải cách xã hội</small></div>
          <div className="pathway pathway--selected"><span>03</span><strong>Tìm hướng mới</strong><small>Khảo nghiệm trực tiếp, so sánh rồi lựa chọn</small></div>
        </div>
        <p className="analysis-line">Lòng yêu nước xác định mục tiêu; lực lượng, phương pháp và tổ chức vẫn cần được tìm lời giải.</p>
      </Frame>;
    case 'departure':
      return <Frame scene={scene} className="scene-layout--departure" visual={<>
        <Artifact id="compass" label="La bàn" note="Đạo cụ minh họa" />
        <Artifact id="ship-wheel" label="Bánh lái" note="Không phải hiện vật lịch sử" />
      </>}>
        <p className="body-lead">Ngày 5/6/1911, Nguyễn Tất Thành rời Sài Gòn trên tàu <em>Amiral Latouche-Tréville</em>.</p>
        <div className="route-line"><span><strong>Sài Gòn</strong><small>5/6/1911</small></span><i aria-hidden="true" /><span><strong>Phương Tây</strong><small>khảo nghiệm trực tiếp</small></span></div>
        <p className="analysis-line">Không nhận sẵn một đáp án: đi, quan sát thế giới, so sánh và rồi lựa chọn.</p>
      </Frame>;
    case 'world-journey':
      return <Frame scene={scene} className="scene-layout--world-journey" visual={<Artifact id="globe" label="Quan sát thế giới" note="Không phải tuyến đường theo từng chặng" />}>
        <p className="body-lead">Trải nghiệm lao động và đời sống ở nhiều nơi mở rộng câu hỏi vượt khỏi phạm vi một quốc gia.</p>
        <div className="observation-chain"><span>Đời sống xã hội</span><i /><span>Người lao động</span><i /><span>Các dân tộc thuộc địa</span></div>
        <p className="analysis-line">Từ “Làm thế nào giải phóng Việt Nam?” đến việc nhận ra một vấn đề thuộc địa rộng hơn.</p>
      </Frame>;
    case 'paris-1919':
      return <Frame scene={scene} className="scene-layout--paris" visual={<>
        <img className="historical-document" src="/assets/images/petition-1919.jpg" alt="Bản Yêu sách của nhân dân An Nam năm 1919" />
        <Artifact id="typewriter" label="Máy chữ" note="Đạo cụ minh họa" />
      </>}>
        <p className="body-lead">Nguyễn Ái Quốc dùng một diễn đàn quốc tế để nêu các yêu cầu về quyền và cải cách.</p>
        <div className="petition-facts"><strong>8</strong><span>điểm yêu sách</span><p>Tự do báo chí · ngôn luận · lập hội · cải cách pháp lý · quyền đại diện</p></div>
        <p className="analysis-line">Hoạt động chính trị công khai; văn bản không yêu cầu độc lập tức thời.</p>
      </Frame>;
    case 'theses-1920':
      return <Frame scene={scene} className="scene-layout--theses" visual={<Artifact id="clasp-book" label="Văn kiện tư liệu" note="Đạo cụ minh họa, không phải bản gốc" />}>
        <p className="body-lead">Ngày 16–17/7/1920, <em>L’Humanité</em> đăng Luận cương của V.I. Lênin về vấn đề dân tộc và thuộc địa.</p>
        <div className="theses-terms"><span>Dân tộc bị áp bức</span><i /><span>Phong trào cách mạng</span><i /><span>Đoàn kết quốc tế</span></div>
        <blockquote className="historical-quote">“Lúc đầu, chính là chủ nghĩa yêu nước, chứ chưa phải chủ nghĩa cộng sản…”<cite>Hồ Chí Minh, “Con đường dẫn tôi đến chủ nghĩa Lênin”</cite></blockquote>
        {sceneBeat > 0 && <Poll id="theses-1920" prompt="Vì sao Luận cương tạo bước ngoặt?" options={[
          { key: 'A', label: 'Trình bày mô hình phát triển kinh tế phương Tây' },
          { key: 'B', label: 'Trực tiếp đề cập dân tộc thuộc địa và lực lượng giải phóng' },
          { key: 'C', label: 'Kêu gọi thuộc địa chờ các nước lớn giúp đỡ' },
        ]} answer="B" explanation="Văn kiện đặt cuộc đấu tranh của các dân tộc bị áp bức trong chiến lược của phong trào cách mạng quốc tế." />}
        <p className="analysis-line">Yêu nước tạo động lực và câu hỏi; lý luận trở thành hệ quy chiếu được lựa chọn để trả lời.</p>
      </Frame>;
    case 'tours-1920':
      return <Frame scene={scene} className="scene-layout--tours" visual={<img className="historical-document historical-document--tours" src="/assets/images/tours-1920.jpg" alt="Đại hội Đảng Xã hội Pháp tại Tours, tháng 12 năm 1920" />}>
        <p className="body-lead">Tại Đại hội Tours, Nguyễn Ái Quốc bỏ phiếu tán thành gia nhập Quốc tế Cộng sản.</p>
        <div className="decision-line"><span>Nhận thức</span><i /><span>Lựa chọn</span><i /><span>Hành động</span></div>
        <p className="analysis-line">Năm 1920 là bước ngoặt về chất, không phải điểm kết thúc của quá trình học tập và hoạt động.</p>
      </Frame>;
    case 'synthesis': {
      const steps = ['Yêu nước', 'Đặt câu hỏi', 'Khảo nghiệm thế giới', 'Kiểm nghiệm tư tưởng', 'Tiếp nhận lý luận', 'Trở lại hoạt động thực tiễn'];
      const visibleCount = Math.min(steps.length, (sceneBeat + 1) * 2);
      return <Frame scene={scene} className="scene-layout--synthesis">
        <p className="body-lead">Lòng yêu nước tiếp tục là động lực; nhận thức về lực lượng, phương pháp và tổ chức trở nên có hệ thống hơn.</p>
        <div className="comparison-wrap"><table className="comparison-table">
          <thead><tr><th scope="col">Phương diện</th><th scope="col">Trước bước ngoặt</th><th scope="col">Sau bước ngoặt 1920</th></tr></thead>
          <tbody>
            <tr><th scope="row">Động lực</th><td>Yêu nước</td><td>Yêu nước tiếp tục là động lực</td></tr>
            <tr><th scope="row">Câu hỏi</th><td>Cứu nước bằng cách nào?</td><td>Có hệ quy chiếu lý luận để giải thích</td></tr>
            <tr><th scope="row">Phạm vi</th><td>Vấn đề Việt Nam</td><td>Việt Nam trong phong trào thuộc địa và quốc tế</td></tr>
            <tr><th scope="row">Hướng hành động</th><td>Tìm kiếm phương hướng</td><td>Xác định rõ hơn lực lượng, tổ chức, phương pháp</td></tr>
          </tbody>
        </table></div>
        <div className="synthesis-process"><span className="field-label">Diễn giải của nhóm</span><ol>
          {steps.map((step, index) => <li className={index < visibleCount ? 'is-visible' : ''} key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
        </ol></div>
        <p className="analysis-line">Thực tiễn đặt vấn đề → lý luận giải thích → thực tiễn tiếp tục kiểm nghiệm nhận thức.</p>
      </Frame>;
    }
    case 'after-1920':
      return <Frame scene={scene} className="scene-layout--after-1920" visual={<Artifact id="press" label="Truyền bá và chuẩn bị" note="Mô hình máy in là minh họa" />}>
        <p className="body-lead">Sau khi lựa chọn, trọng tâm chuyển dần từ tìm đường sang truyền bá và tổ chức lực lượng.</p>
        <div className="timeline-flow"><div><strong>1920</strong><span>Lựa chọn tư tưởng</span></div><i /><div><strong>1921–1929</strong><span>Truyền bá, chuẩn bị</span></div><i /><div><strong>1930</strong><span>Thành lập Đảng</span></div></div>
        <p className="analysis-line">1911–1920 chủ yếu là tìm đường; 1921–1930 là chuẩn bị và tổ chức thực hiện lựa chọn ấy.</p>
      </Frame>;
    case 'application':
      return <Frame scene={scene} className="scene-layout--application">
        <p className="body-lead">Hội nhập rộng đòi hỏi năng lực tự chủ và chọn lọc.</p>
        <div className="trade-figure"><strong>930,05</strong><span>tỷ USD · tổng kim ngạch hàng hóa năm 2025</span></div>
        <div className="trade-bars" role="img" aria-label="Xuất khẩu 475,04 tỷ USD; nhập khẩu 455,01 tỷ USD">
          <div><span>Xuất khẩu</span><strong>475,04 tỷ USD</strong><i><b style={{ width: '100%' }} /></i></div>
          <div><span>Nhập khẩu</span><strong>455,01 tỷ USD</strong><i><b style={{ width: '95.8%' }} /></i></div>
        </div>
        <p className="stat-source">Ước tính năm 2025 · Khu vực FDI chiếm 77,3% giá trị xuất khẩu</p>
        <p className="analysis-line">Tìm hiểu → chọn lọc → kiểm chứng → vận dụng. Số liệu hiện nay minh họa bối cảnh, không chứng minh lịch sử năm 1920.</p>
        <p className="student-example">Với sinh viên: kiểm chứng nguồn và bối cảnh trước khi dùng thông tin từ Internet hoặc AI.</p>
      </Frame>;
    case 'conclusion':
      return <Frame scene={scene} className="scene-layout--conclusion" visual={<Artifact id="lotus" label="Động lực · phương pháp · lý luận" note="Hoa sen là hình tượng trang trí" />}>
        <p className="body-lead">Nguyễn Ái Quốc bắt đầu bằng lòng yêu nước, đi tìm lời giải qua thực tiễn, lựa chọn chủ nghĩa Mác – Lênin và tiếp tục kiểm nghiệm lựa chọn trong hoạt động chính trị.</p>
        <div className="conclusion-chain"><span><strong>Yêu nước</strong><small>Động lực</small></span><i /><span><strong>Khảo nghiệm</strong><small>Phương pháp</small></span><i /><span><strong>Mác – Lênin</strong><small>Lý luận được lựa chọn</small></span><i /><span><strong>Hành động</strong><small>Thực tiễn cách mạng</small></span></div>
        <p className="closing-question">Một lựa chọn có cơ sở bắt đầu bằng câu hỏi đúng, tiếp xúc với thực tiễn và kiểm chứng tri thức.</p>
        <p className="thanks">Xin cảm ơn thầy cô và các bạn.</p>
      </Frame>;
    default:
      return null;
  }
}

export function SceneContent({ scene, sceneIndex, sceneBeat }: {
  scene: SceneDefinition;
  sceneIndex: number;
  sceneBeat: number;
}) {
  return (
    <section className={'scene-content scene-content--' + scene.id} aria-label={'Cảnh ' + scene.number + ': ' + scene.title} data-scene-index={sceneIndex}>
      <div className="scene-content__inner"><SlideView scene={scene} sceneBeat={sceneBeat} /></div>
    </section>
  );
}
