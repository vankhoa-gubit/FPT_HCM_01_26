import type { CSSProperties } from 'react';
import type { SceneDefinition } from '../data/scenes';
import { formatDuration } from '../data/scenes';
import { getHistoricalEntry } from '../data/historicalContent';
import { SourceBadge } from '../components/SourceBadge';
import { usePresentationStore } from '../store/presentationStore';

interface SceneContentProps {
  scene: SceneDefinition;
  sceneIndex: number;
  sceneBeat: number;
}

function SourceRow({ scene }: { scene: SceneDefinition }) {
  if (!scene.sourceIds.length) return null;
  return (
    <div className="scene-source-row">
      {scene.sourceIds.map((id) => (
        <SourceBadge key={id} sourceId={id} />
      ))}
    </div>
  );
}

function Opening({ scene }: { scene: SceneDefinition }) {
  return (
    <div className="scene-layout scene-layout--opening">
      <div className="opening-copy">
        <p className="eyebrow reveal-item">
          ĐỀ TÀI THUYẾT TRÌNH MÔN TƯ TƯỞNG HỒ CHÍ MINH <span className="eyebrow-rule" /> NHÓM 1
        </p>
        <h1 className="display-title reveal-item">
          <span className="poster-gold-kicker">HÀNH TRÌNH HỒ CHÍ MINH</span>
          <br />
          <span className="poster-crimson-core">
            CHUYỂN HÓA TƯ TƯỞNG VỀ QUYỀN CON NGƯỜI
            <br />
            THÀNH QUYỀN TỰ QUYẾT CỦA MỘT DÂN TỘC
          </span>
        </h1>
        <p className="opening-subtitle reveal-item">
          Từ chủ nghĩa yêu nước đến chủ nghĩa Mác — Lênin và con đường giải phóng dân tộc
        </p>
        <div className="scene-footer reveal-item">
          <span className="footer-mark">CHƯƠNG 01</span>
          <span className="footer-line" />
          <span>1911 — 1920</span>
          <span className="footer-line" />
          <span className="footer-mark">ĐỘC LẬP · TỰ QUYẾT</span>
        </div>
        <SourceRow scene={scene} />
      </div>
      <div className="opening-orbit-label reveal-item">
        <span className="orbit-dot" /> SÀI GÒN <span>·</span> 5 CHÂU 4 BIỂN <span>·</span> PARIS <span>·</span> 1945
      </div>
    </div>
  );
}

function CentralQuestion({ scene }: { scene: SceneDefinition }) {
  return (
    <div className="scene-layout scene-layout--center">
      <p className="eyebrow reveal-item">MỘT CÂU HỎI XUYÊN SUỐT</p>
      <h1 className="question-title reveal-item">
        Nếu lòng yêu nước là điểm khởi đầu,
        <br className="desktop-break" /> điều gì giúp một người tìm được
        <br className="desktop-break" /> con đường cứu nước đúng đắn?
      </h1>
      <div className="three-words reveal-item">
        <div className="three-word-item">
          <span className="word-num">01</span>
          <strong>YÊU NƯỚC</strong>
        </div>
        <i className="word-separator" />
        <div className="three-word-item">
          <span className="word-num">02</span>
          <strong>THỰC TIỄN</strong>
        </div>
        <i className="word-separator" />
        <div className="three-word-item">
          <span className="word-num">03</span>
          <strong>LÝ LUẬN</strong>
        </div>
      </div>
      <p className="quiet-note reveal-item">Ba yếu tố quyết định bước chuyển tư tưởng lịch sử.</p>
      <SourceRow scene={scene} />
    </div>
  );
}

function Crossroads({ scene }: { scene: SceneDefinition }) {
  const panels = [
    {
      label: '01 / KHUYNH HƯỚNG PHONG KIẾN',
      title: 'Phong trào Cần Vương',
      detail: 'Tận trung cứu nước nhưng bế tắc về hệ tư tưởng và ngọn cờ giải phóng.',
    },
    {
      label: '02 / KHUYNH HƯỚNG TƯ SẢN',
      title: 'Đông Du · Duy Tân',
      detail: 'Đổi mới nhưng còn phụ thuộc vào ngoại lực hoặc cải lương trong khuôn khổ.',
    },
    {
      label: '03 / HƯỚNG ĐI MỚI',
      title: 'Khảo nghiệm thế giới',
      detail: 'Tìm hiểu ngọn nguồn tự do, bình đẳng tại chính các mẫu quốc phương Tây.',
    },
  ];
  return (
    <div className="scene-layout scene-layout--crossroads">
      <div className="section-heading reveal-item">
        <p className="eyebrow">BỐI CẢNH TRƯỚC NĂM 1911</p>
        <h1 className="serif-heading">
          Đầu thế kỷ XX:
          <br />
          Khủng hoảng sâu sắc về đường lối cứu nước
        </h1>
        <p className="body-lead">
          Các cuộc khởi nghĩa và phong trào yêu nước liên tiếp nổ ra nhưng đều lâm vào bế tắc. Dân tộc đòi hỏi một con đường hoàn toàn mới.
        </p>
      </div>
      <div className="archive-panels">
        {panels.map((panel, index) => (
          <article className={`archive-panel archive-panel--${index + 1} reveal-item`} key={panel.label}>
            <span>{panel.label}</span>
            <strong>{panel.title}</strong>
            <small>{panel.detail}</small>
            <i aria-hidden="true" />
          </article>
        ))}
      </div>
      <div className="analysis-caption reveal-item">
        <span className="analysis-caption__line" />
        BỐI CẢNH LỊCH SỬ · ĐIỂM XUẤT PHÁT CỦA SỰ TÌM ĐƯỜNG
        <SourceRow scene={scene} />
      </div>
      <div className="crossroads-question reveal-item">
        “Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác.
        <br />
        Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.”
      </div>
    </div>
  );
}

function Departure({ scene }: { scene: SceneDefinition }) {
  const entry = getHistoricalEntry('departure-1911');
  return (
    <div className="scene-layout scene-layout--departure">
      <div className="date-ghost" aria-hidden="true">
        1911
      </div>
      <div className="departure-copy">
        <p className="eyebrow reveal-item">
          {entry?.date} <span className="eyebrow-rule" /> BẾN CẢNG NHÀ RỒNG · SÀI GÒN
        </p>
        <h1 className="serif-heading reveal-item">
          Ra đi tìm đường
          <br />
          cứu nước.
        </h1>
        <p className="body-lead reveal-item">
          Người thanh niên Nguyễn Tất Thành bước lên tàu Amiral Latouche-Tréville với tên gọi Văn Ba, bắt đầu cuộc hành trình vĩ đại kéo dài 30 năm qua 3 đại dương và 4 châu lục.
        </p>
        <div className="departure-caption reveal-item">
          <span className="caption-rule" />
          TÀU AMIRAL LATOUCHE-TRÉVILLE <span className="caption-dot" /> BẾN CẢNG NHÀ RỒNG
        </div>
        <SourceRow scene={scene} />
      </div>
      <div className="water-index reveal-item">
        <span>SÀI GÒN · VIỆT NAM</span>
        <i />
        <span>HÀNH TRÌNH KHỞI ĐẦU · 1911</span>
      </div>
    </div>
  );
}

function WorldJourney({ sceneBeat, scene }: { sceneBeat: number; scene: SceneDefinition }) {
  const steps = [
    { title: 'TRẢI NGHIỆM', desc: 'Lao động và sinh sống cùng nhân dân lao động nhiều nước.' },
    { title: 'QUAN SÁT', desc: 'Thấy rõ bản chất bóc lột của chủ nghĩa thực dân ở khắp các thuộc địa.' },
    { title: 'ĐỐI CHIẾU', desc: 'So sánh các cuộc cách mạng tư sản Pháp, Mỹ với thực tiễn thuộc địa.' },
    { title: 'NHẬN THỨC', desc: 'Nhân dân lao động ở đâu cũng bị áp bức; kẻ thù là chủ nghĩa thực dân.' },
  ];
  const current = Math.min(sceneBeat, steps.length - 1);
  return (
    <div className="scene-layout scene-layout--journey">
      <div className="journey-heading reveal-item">
        <p className="eyebrow">1911 — 1919 <span className="eyebrow-rule" /> THỰC TIỄN TOÀN CẦU</p>
        <h1 className="serif-heading">
          Khảo nghiệm thế giới
          <br />
          bằng thực tiễn lao động
        </h1>
        <p className="body-lead">
          Không chỉ qua sách vở, Nguyễn Ái Quốc thấu hiểu thế giới qua chính cuộc sống của người lao động tại Á, Âu, Phi và châu Mỹ.
        </p>
      </div>
      <div className="journey-steps">
        {steps.map((step, index) => (
          <div
            className={`journey-step reveal-item ${index === current ? 'journey-step--active' : ''} ${
              index < current ? 'journey-step--passed' : ''
            }`}
            key={step.title}
          >
            <span className="journey-step__index">0{index + 1}</span>
            <strong>{step.title}</strong>
            <p className="journey-step__desc">{step.desc}</p>
            {index < steps.length - 1 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="journey-side-note reveal-item">
        <span>HÀNH TRÌNH QUA 3 ĐẠI DƯƠNG</span>
        <p>Pháp · Anh · Mỹ · Châu Phi · Châu Á</p>
        <small>Nhấn Space để tiếp tục hành trình</small>
      </div>
      <SourceRow scene={scene} />
    </div>
  );
}

function Paris1919({ scene }: { scene: SceneDefinition }) {
  const entry = getHistoricalEntry('petition-1919');
  return (
    <div className="scene-layout scene-layout--document">
      <div className="document-copy reveal-item">
        <p className="eyebrow">
          {entry?.date} <span className="eyebrow-rule" /> HỘI NGHỊ VERSAILLES · PARIS
        </p>
        <h1 className="serif-heading">
          Yêu sách của
          <br />
          Nhân dân An Nam
        </h1>
        <p className="body-lead">{entry?.statement}</p>
        <div className="document-keywords">
          <span>QUYỀN TỰ DO DÂN CHỦ</span>
          <span>BÌNH ĐẲNG PHÁP LÝ</span>
          <span>QUYỀN CON NGƯỜI</span>
        </div>
        <SourceRow scene={scene} />
      </div>
      <div className="document-label reveal-item">
        <span>VĂN KIỆN LỊCH SỬ / 1919</span>
        <i />
        <small>Bản Yêu sách 8 điểm ký tên Nguyễn Ái Quốc</small>
      </div>
      <div className="question-break reveal-item">
        <span>BÀI HỌC THỰC TIỄN QUAN TRỌNG</span>
        <p>
          Các cường quốc tư sản không bao giờ tự nguyện trao quyền tự quyết cho thuộc địa. Muốn giải phóng dân tộc, chỉ có thể dựa vào chính sức mình.
        </p>
      </div>
    </div>
  );
}

function Theses1920({ scene, sceneBeat }: { scene: SceneDefinition; sceneBeat: number }) {
  const entry = getHistoricalEntry('theses-1920');
  return (
    <div className="scene-layout scene-layout--theses">
      <div className="theses-copy reveal-item">
        <p className="eyebrow">
          {entry?.date} <span className="eyebrow-rule" /> BÁO L’HUMANITÉ · PARIS
        </p>
        <h1 className="serif-heading">
          Sơ thảo Luận cương
          <br />
          về vấn đề dân tộc
          <br />
          và thuộc địa
        </h1>
        <p className="theses-attribution">V.I. Lênin <span>·</span> Đăng trên báo Nhân đạo Pháp</p>
        <p className="body-lead">{entry?.statement}</p>
        <blockquote className="theses-quote">
          “Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi vui mừng đến phát khóc lên... Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta.”
        </blockquote>
        <SourceRow scene={scene} />
      </div>
      <div className="theses-terms" aria-live="polite">
        {sceneBeat === 0 ? (
          <div className="term-question reveal-item">
            <span>BƯỚC NGOẶT NHẬN THỨC</span>
            <p>Luận cương Lênin đã chỉ rõ mối quan hệ mật thiết giữa cách mạng vô sản ở chính quốc và cách mạng giải phóng dân tộc ở thuộc địa.</p>
            <small>Nhấn Space để mở các trụ cột tư tưởng</small>
          </div>
        ) : (
          <>
            {[
              { num: '01', title: 'QUYỀN TỰ QUYẾT DÂN TỘC', sub: 'Mọi dân tộc đều bình đẳng' },
              { num: '02', title: 'LIÊN MINH VÔ SẢN', sub: 'Chính quốc gắn kết thuộc địa' },
              { num: '03', title: 'CON ĐƯỜNG CÁCH MẠNG', sub: 'Giải phóng dân tộc triệt để' },
            ].map((term, index) => (
              <div className="thesis-term reveal-item" key={term.title} style={{ '--term-index': index } as CSSProperties}>
                <span>{term.num}</span>
                <strong>{term.title}</strong>
                <small>{term.sub}</small>
              </div>
            ))}
            <p className="theses-analysis reveal-item">
              QUYỀN CON NGƯỜI <i /> QUYỀN TỰ QUYẾT <i /> ĐỘC LẬP TỰ DO
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Tours1920({ scene }: { scene: SceneDefinition }) {
  const entry = getHistoricalEntry('tours-1920');
  return (
    <div className="scene-layout scene-layout--tours">
      <p className="eyebrow reveal-item">
        ĐẠI HỘI LẦN THỨ XVIII <span className="eyebrow-rule" /> ĐẢNG XÃ HỘI PHÁP TẠI TOURS
      </p>
      <div className="tours-title reveal-item">
        <h1>ĐẠI HỘI TOURS</h1>
        <span>{entry?.date}</span>
      </div>
      <p className="tours-description reveal-item">
        Từ tiếp cận lý luận đến một lựa chọn chính trị dứt khoát:
        <br />
        Bỏ phiếu gia nhập Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp
      </p>
      <div className="tours-fact reveal-item">
        <span>12.1920</span>
        <p>
          Khẳng định con đường giải phóng dân tộc gắn liền với chủ nghĩa xã hội. Nguyễn Ái Quốc trở thành người cộng sản Việt Nam đầu tiên.
        </p>
      </div>
      <SourceRow scene={scene} />
    </div>
  );
}

const synthesisNodes = [
  { num: '01', title: 'CHỦ NGHĨA YÊU NƯỚC', desc: 'Động lực nguyên thủy sâu sắc của dân tộc' },
  { num: '02', title: 'NHU CẦU TÌM ĐƯỜNG MỚI', desc: 'Khát vọng vượt qua bế tắc thời đại' },
  { num: '03', title: 'KHẢO NGHIỆM THỰC TIỄN', desc: 'Hành trình 10 năm qua 4 châu lục' },
  { num: '04', title: 'ĐỐI CHIẾU CÁC CON ĐƯỜNG', desc: 'Thấy rõ giới hạn của cách mạng tư sản' },
  { num: '05', title: 'TIẾP CẬN LUẬN CƯƠNG LÊNIN', desc: 'Gặp gỡ chân lý cách mạng vô sản' },
  { num: '06', title: 'LỰA CHỌN CON ĐƯỜNG GIẢI PHÓNG', desc: 'Độc lập dân tộc gắn liền CNXH' },
];

function Synthesis({ sceneBeat }: { sceneBeat: number }) {
  return (
    <div className="scene-layout scene-layout--synthesis">
      <div className="synthesis-heading reveal-item">
        <p className="eyebrow">
          SƠ ĐỒ TỔNG HỢP BIỆN CHỨNG <span className="eyebrow-rule" /> QUY LUẬT CHUYỂN HÓA
        </p>
        <h1 className="serif-heading">
          Từ chủ nghĩa yêu nước
          <br />
          đến lựa chọn lý luận khoa học
        </h1>
      </div>
      <div className="synthesis-track">
        {synthesisNodes.map((node, index) => (
          <div
            className={`synthesis-node reveal-item ${index === sceneBeat ? 'synthesis-node--active' : ''} ${
              index < sceneBeat ? 'synthesis-node--passed' : ''
            }`}
            key={node.title}
          >
            <span className="synthesis-node__dot">{node.num}</span>
            <strong>{node.title}</strong>
            <small>{node.desc}</small>
          </div>
        ))}
      </div>
      <div className="synthesis-takeaway reveal-item">
        <span>KẾT LUẬN CỦA NHÓM</span>
        <p>
          Đây là bước phát triển nhảy vọt về chất trong tư tưởng Nguyễn Ái Quốc: chuyển hóa từ ý thức hệ phong kiến, tư sản sang lập trường cách mạng vô sản.
        </p>
      </div>
      <div className="synthesis-step reveal-item">
        DÙNG SPACE HOẶC PHÍM MŨI TÊN ĐỂ ĐI QUA TỪNG MẮT XÍCH <span>0{sceneBeat + 1} / 06</span>
      </div>
    </div>
  );
}

function Reflection({ sceneBeat }: { sceneBeat: number }) {
  const seconds = usePresentationStore((state) => state.reflectionSeconds);
  const start = usePresentationStore((state) => state.startReflectionTimer);
  const timerRunning = usePresentationStore((state) => state.timerRunning);
  return (
    <div className="scene-layout scene-layout--reflection">
      <div className="reflection-mark reveal-item">
        <span>GÓC SUY NGẪM &amp; THẢO LUẬN</span>
        <i />
      </div>
      {sceneBeat < 2 ? (
        <>
          <h1 className="reflection-question reveal-item">
            Nếu chỉ có lòng yêu nước mà thiếu quá trình khảo nghiệm thực tiễn và tiếp cận lý luận Mác – Lênin, liệu hành trình giải phóng dân tộc có thể thành công?
          </h1>
          <div className="reflection-action reveal-item">
            {seconds > 0 ? (
              <>
                <div className={`timer-ring ${timerRunning ? 'timer-ring--running' : ''}`}>
                  <span>{String(seconds).padStart(2, '0')}</span>
                  <small>GIÂY</small>
                </div>
                <div>
                  <p>Trao đổi cùng bạn bên cạnh trong 20 giây.</p>
                  <button className="text-control" type="button" onClick={start}>
                    {timerRunning ? 'ĐỒNG HỒ ĐANG ĐẾM LÙI...' : 'BẤM T HOẶC NHẤN VÀO ĐÂY ĐỂ BẮT ĐẦU 20S'}
                  </button>
                </div>
              </>
            ) : (
              <div className="reflection-share">
                <span>20 GIÂY THẢO LUẬN HOÀN TẤT</span>
                <p>Mời đại diện nhóm chia sẻ ý kiến ngắn</p>
                <small>Nhấn Space để kết nối ba nhân tố</small>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="reflection-payoff reveal-item">
          <p className="eyebrow">BA NHÂN TỐ QUYẾT ĐỊNH ĐÃ HÒA QUYỆN</p>
          <div className="three-words three-words--connected">
            <span>YÊU NƯỚC</span>
            <i />
            <span>THỰC TIỄN</span>
            <i />
            <span>LÝ LUẬN</span>
          </div>
          <p className="quiet-note">
            Chủ nghĩa yêu nước là ngọn nguồn; Thực tiễn là phép thử; Chủ nghĩa Mác – Lênin là kim chỉ nam.
          </p>
        </div>
      )}
    </div>
  );
}

function Conclusion({ scene }: { scene: SceneDefinition }) {
  return (
    <div className="scene-layout scene-layout--conclusion">
      <div className="conclusion-copy">
        <p className="eyebrow reveal-item">
          HÀNH TRÌNH TƯ TƯỞNG HỒ CHÍ MINH <span className="eyebrow-rule" /> 1911 — 1945
        </p>
        <h1 className="serif-heading reveal-item">
          Từ một hành trình địa lý
          <br />
          đến quyền tự quyết của cả dân tộc
        </h1>
        <p className="body-lead reveal-item">
          Ngày 2/9/1945 tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa, hiện thực hóa quyền con người thành quyền tự quyết thiêng liêng của một dân tộc độc lập, tự do.
        </p>
        <div className="final-sequence reveal-item">
          <span>YÊU NƯỚC</span>
          <i />
          <span>KHẢO NGHIỆM</span>
          <i />
          <span>LUẬN CƯƠNG LÊNIN</span>
          <i />
          <span>ĐẢNG CỘNG SẢN</span>
          <i />
          <span>1945 ĐỘC LẬP TỰ QUYẾT</span>
        </div>
        <p className="thanks reveal-item">Xin trân trọng cảm ơn Thầy Cô và các bạn!</p>
        <SourceRow scene={scene} />
      </div>
      <div className="conclusion-orbit reveal-item">
        <span>1911</span>
        <i />
        <span>1945</span>
      </div>
    </div>
  );
}

export function SceneContent({ scene, sceneIndex, sceneBeat }: SceneContentProps) {
  const view = (() => {
    switch (scene.id) {
      case 'opening':
        return <Opening scene={scene} />;
      case 'question':
        return <CentralQuestion scene={scene} />;
      case 'crossroads':
        return <Crossroads scene={scene} />;
      case 'departure':
        return <Departure scene={scene} />;
      case 'world-journey':
        return <WorldJourney sceneBeat={sceneBeat} scene={scene} />;
      case 'paris-1919':
        return <Paris1919 scene={scene} />;
      case 'theses-1920':
        return <Theses1920 scene={scene} sceneBeat={sceneBeat} />;
      case 'tours-1920':
        return <Tours1920 scene={scene} />;
      case 'synthesis':
        return <Synthesis sceneBeat={sceneBeat} />;
      case 'reflection':
        return <Reflection sceneBeat={sceneBeat} />;
      case 'conclusion':
        return <Conclusion scene={scene} />;
      default:
        return null;
    }
  })();
  return (
    <section className={`scene-content scene-content--${scene.id}`} aria-label={`Cảnh ${scene.number}: ${scene.eyebrow}`}>
      <div className="scene-content__inner">{view}</div>
      <div className="scene-time">
        <span>{scene.number}</span>
        <i />
        {formatDuration(scene.durationSeconds)}
      </div>
      <span className="scene-index-quiet">{String(sceneIndex + 1).padStart(2, '0')} / 11</span>
    </section>
  );
}
