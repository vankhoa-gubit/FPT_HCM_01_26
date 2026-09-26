
export function UncleHoPortrait() {
  return (
    <div className="art-uncle-ho" aria-hidden="true">
      <svg viewBox="0 0 400 480" className="art-uncle-ho__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7ecd7" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#d2b88b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8d6232" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="halo" cx="45%" cy="38%" r="50%">
            <stop offset="0%" stopColor="#fff8eb" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#dec496" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#cead74" stopOpacity="0" />
          </radialGradient>
          <filter id="sepiaGrit">
            <feColorMatrix type="matrix" values="
              0.393 0.769 0.189 0 0
              0.349 0.686 0.168 0 0
              0.272 0.534 0.131 0 0
              0     0     0     1 0" />
          </filter>
        </defs>

        {/* Ambient warm aura behind portrait */}
        <circle cx="180" cy="180" r="160" fill="url(#halo)" />

        {/* Artistic stylized silhouette & contour of President Ho Chi Minh */}
        <g className="portrait-drawing" opacity="0.88">
          {/* Collar & Coat */}
          <path
            d="M80,470 C95,410 130,370 170,355 C190,375 220,375 240,355 C275,370 310,405 330,470 Z"
            fill="#3a2a1d"
            opacity="0.9"
          />
          <path
            d="M170,355 C190,340 220,340 240,355 L235,395 C215,405 195,405 175,395 Z"
            fill="#523d2c"
          />
          <path
            d="M195,355 L205,355 L205,420 L195,420 Z"
            fill="#2c1f15"
            opacity="0.8"
          />
          {/* Neck & Beard */}
          <path
            d="M175,280 C175,310 185,345 205,355 C225,345 235,310 235,280 Z"
            fill="#c9aa7d"
          />
          {/* Iconic beard lines */}
          <path
            d="M185,290 C185,325 195,355 205,365 C215,355 225,325 225,290 C220,305 210,312 205,312 C200,312 190,305 185,290 Z"
            fill="#e2cdab"
            opacity="0.95"
          />
          <path
            d="M195,315 C195,345 202,360 205,368 C208,360 215,345 215,315 Z"
            fill="#f7eedc"
          />
          {/* Face structure */}
          <path
            d="M152,175 C146,215 158,265 178,285 C192,298 218,298 232,285 C252,265 264,215 258,175 C253,130 242,105 205,102 C168,105 157,130 152,175 Z"
            fill="#d8bc91"
          />
          {/* Forehead & High Brow highlight */}
          <ellipse cx="205" cy="140" rx="34" ry="22" fill="#ebcfab" opacity="0.8" />
          {/* Iconic Hair (brushed back) */}
          <path
            d="M150,150 C145,115 160,80 195,74 C225,72 255,95 260,135 C263,150 258,155 254,142 C248,105 225,92 198,92 C170,92 154,115 150,150 Z"
            fill="#3f3125"
          />
          {/* Eyes, brows, mustache */}
          {/* Eyebrows */}
          <path d="M168,168 C176,162 188,164 194,169" stroke="#332419" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M216,169 C222,164 234,162 242,168" stroke="#332419" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Eyes with visionary gaze */}
          <ellipse cx="182" cy="178" rx="6" ry="4" fill="#24170f" />
          <ellipse cx="228" cy="178" rx="6" ry="4" fill="#24170f" />
          <circle cx="184" cy="177" r="1.5" fill="#ffffff" />
          <circle cx="230" cy="177" r="1.5" fill="#ffffff" />
          {/* Nose bridge & tip */}
          <path d="M205,172 L202,210 C200,216 206,220 208,217 L210,210" stroke="#755639" strokeWidth="2.5" fill="none" />
          {/* Mustache */}
          <path
            d="M184,242 C194,238 202,242 205,246 C208,242 216,238 226,242 C218,252 210,250 205,248 C200,250 192,252 184,242 Z"
            fill="#4a392b"
          />
          {/* Gentle smiling lip */}
          <path d="M192,256 C200,260 210,260 218,256" stroke="#5a3d2a" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Ears */}
          <path d="M152,175 C142,185 142,215 154,228" stroke="#a07d54" strokeWidth="2.5" fill="none" />
          <path d="M258,175 C268,185 268,215 256,228" stroke="#a07d54" strokeWidth="2.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}

export function LotusBlossomArt() {
  return (
    <div className="art-lotus-corner" aria-hidden="true">
      <svg viewBox="0 0 320 260" className="art-lotus__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="petalGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f3ebd9" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8c78c" />
          </linearGradient>
          <linearGradient id="petalGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ecdcb9" />
            <stop offset="50%" stopColor="#fff8ed" />
            <stop offset="100%" stopColor="#d99f4d" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a383a" />
            <stop offset="50%" stopColor="#122528" />
            <stop offset="100%" stopColor="#0a181b" />
          </linearGradient>
          <filter id="goldGleam">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#d8a642" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Large dark jade lotus leaf behind */}
        <g id="lotus-leaves">
          <path
            d="M-20,240 C10,140 100,120 180,160 C230,190 220,250 190,280 C110,310 10,290 -20,240 Z"
            fill="url(#leafGrad)"
            stroke="#b89345"
            strokeWidth="1.2"
            opacity="0.95"
          />
          {/* Gold leaf veins */}
          <path d="M100,190 Q60,165 10,175" stroke="#b89345" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M100,190 Q120,150 160,155" stroke="#b89345" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M100,190 Q80,225 50,250" stroke="#b89345" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M100,190 Q130,230 170,220" stroke="#b89345" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* Primary Lotus Blossom */}
        <g id="main-lotus" transform="translate(100, 70)" filter="url(#goldGleam)">
          {/* Outer back petals */}
          <path d="M0,80 C-45,60 -65,25 -55,-5 C-35,15 -15,50 0,80 Z" fill="url(#petalGrad1)" stroke="#cfa652" strokeWidth="1" />
          <path d="M0,80 C45,60 65,25 55,-5 C35,15 15,50 0,80 Z" fill="url(#petalGrad1)" stroke="#cfa652" strokeWidth="1" />
          <path d="M0,80 C-30,45 -45,-15 -25,-40 C-10,-10 -2,40 0,80 Z" fill="url(#petalGrad1)" stroke="#cfa652" strokeWidth="1" />
          <path d="M0,80 C30,45 45,-15 25,-40 C10,-10 2,40 0,80 Z" fill="url(#petalGrad1)" stroke="#cfa652" strokeWidth="1" />

          {/* Central majestic petal */}
          <path d="M0,80 C-20,30 -22,-30 0,-60 C22,-30 20,30 0,80 Z" fill="url(#petalGrad2)" stroke="#dfb45e" strokeWidth="1.2" />

          {/* Inner blooming petals */}
          <path d="M0,80 C-15,40 -15,0 0,-25 C15,0 15,40 0,80 Z" fill="#fffdfa" stroke="#cca14b" strokeWidth="0.9" />

          {/* Golden stamens & receptacle */}
          <circle cx="0" cy="5" r="7" fill="#f0bf4c" />
          <path d="M-8,5 Q0,0 8,5" stroke="#a36e1b" strokeWidth="1" fill="none" />
        </g>

        {/* Smaller secondary lotus blossom */}
        <g id="secondary-lotus" transform="translate(210, 125) scale(0.68)" filter="url(#goldGleam)">
          <path d="M0,80 C-40,55 -55,20 -45,-5 C-28,15 -10,48 0,80 Z" fill="url(#petalGrad1)" stroke="#cfa652" strokeWidth="1" />
          <path d="M0,80 C40,55 55,20 45,-5 C28,15 10,48 0,80 Z" fill="url(#petalGrad1)" stroke="#cfa652" strokeWidth="1" />
          <path d="M0,80 C-18,25 -20,-30 0,-50 C20,-30 18,25 0,80 Z" fill="url(#petalGrad2)" stroke="#dfb45e" strokeWidth="1.2" />
          <circle cx="0" cy="15" r="5" fill="#f0bf4c" />
        </g>
      </svg>
    </div>
  );
}

export function HistoricalSkyline() {
  return (
    <div className="art-historical-skyline" aria-hidden="true">
      <svg viewBox="0 0 1600 240" preserveAspectRatio="xMidYMax meet" className="skyline-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4d3522" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#2e1f14" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1a110a" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1911 Steamship silhouette on the left */}
        <g id="steamship-silhouette" transform="translate(40, 70)" opacity="0.65">
          {/* Water reflection */}
          <path d="M10,80 L240,80 M30,85 L220,85 M60,89 L180,89" stroke="#7d5c3d" strokeWidth="1.2" strokeDasharray="8 4" />
          {/* Hull */}
          <path d="M20,60 L220,60 L240,78 L10,78 Z" fill="#2d1d13" />
          {/* Decks & Cabins */}
          <rect x="50" y="42" width="140" height="18" fill="#463124" />
          <rect x="75" y="30" width="80" height="12" fill="#5c4232" />
          {/* Two iconic steam funnels */}
          <path d="M90,30 L93,8 L103,8 L105,30 Z" fill="#803322" />
          <path d="M125,30 L128,8 L138,8 L140,30 Z" fill="#803322" />
          {/* Smoke clouds */}
          <circle cx="106" cy="2" r="5" fill="#a48366" opacity="0.4" />
          <circle cx="118" cy="-4" r="8" fill="#a48366" opacity="0.3" />
          <circle cx="140" cy="-2" r="6" fill="#a48366" opacity="0.3" />
          {/* Masts & Rigging */}
          <line x1="45" y1="60" x2="45" y2="0" stroke="#332217" strokeWidth="1.5" />
          <line x1="180" y1="60" x2="180" y2="2" stroke="#332217" strokeWidth="1.5" />
          <line x1="45" y1="15" x2="10" y2="60" stroke="#5a3d2a" strokeWidth="0.8" />
          <line x1="45" y1="10" x2="90" y2="40" stroke="#5a3d2a" strokeWidth="0.8" />
          <line x1="180" y1="10" x2="230" y2="60" stroke="#5a3d2a" strokeWidth="0.8" />
          {/* Year 1911 Badge */}
          <text x="110" y="112" fill="#9e2828" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="700" fontSize="18" textAnchor="middle">1911</text>
        </g>

        {/* European Capitals: Eiffel Tower & Big Ben in the middle */}
        <g id="europe-landmarks" transform="translate(420, 30)" opacity="0.5">
          {/* Cathedral Domes */}
          <path d="M40,110 C40,75 70,55 90,55 C110,55 140,75 140,110 Z" fill="#3b291d" />
          <rect x="88" y="35" width="4" height="20" fill="#3b291d" />
          {/* Eiffel Tower Silhouette */}
          <path d="M190,120 L212,20 L216,20 L238,120 L226,120 L220,70 L208,70 L202,120 Z" fill="#2d1f16" />
          <path d="M200,68 L228,68" stroke="#2d1f16" strokeWidth="2" />
          <path d="M205,100 Q214,88 223,100" stroke="#2d1f16" strokeWidth="2" fill="none" />
          <line x1="214" y1="20" x2="214" y2="0" stroke="#2d1f16" strokeWidth="2" />
          {/* London Big Ben Clock Tower */}
          <rect x="290" y="40" width="24" height="80" fill="#3b291d" />
          <polygon points="290,40 302,10 314,40" fill="#2d1f16" />
          <line x1="302" y1="10" x2="302" y2="0" stroke="#2d1f16" strokeWidth="1.5" />
          <circle cx="302" cy="55" r="5" fill="#dec49b" opacity="0.7" />
        </g>

        {/* Nha Rong Harbor & Hanoi / Colonial governmental building */}
        <g id="colonial-edifice" transform="translate(850, 45)" opacity="0.55">
          <rect x="0" y="45" width="210" height="75" fill="#382518" />
          {/* Pediment & Columns */}
          <polygon points="40,45 105,15 170,45" fill="#291b11" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={15 + i * 20} y="55" width="8" height="50" fill="#1d130c" />
          ))}
          <rect x="0" y="38" width="210" height="8" fill="#4a3323" />
        </g>

        {/* Ba Dinh Square & Cheering masses with national flag (1945) */}
        <g id="ba-dinh-1945" transform="translate(1180, 50)" opacity="0.7">
          {/* Tribune / Platform */}
          <rect x="80" y="60" width="120" height="50" fill="#332014" />
          {/* Flagpole & Red Flag with Gold Star */}
          <line x1="140" y1="60" x2="140" y2="-10" stroke="#22150d" strokeWidth="2" />
          <polygon points="140,-10 185,0 140,12" fill="#aa1c1c" />
          <polygon points="152,0 156,-4 157,1 153,-2 158,-2" fill="#f7cd4a" />
          {/* Crowd silhouettes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`translate(${10 + i * 11 + (i % 3) * 2}, ${95 + (i % 2) * 5})`}>
              <circle cx="4" cy="0" r="3.5" fill="#24170f" />
              <path d="M0,5 L8,5 L7,22 L1,22 Z" fill="#24170f" />
              {i % 4 === 0 && <line x1="4" y1="5" x2="7" y2="-4" stroke="#24170f" strokeWidth="1.2" />}
            </g>
          ))}
          {/* Year 1945 Badge */}
          <text x="140" y="132" fill="#aa1c1c" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="700" fontSize="18" textAnchor="middle">1945</text>
        </g>
      </svg>
    </div>
  );
}

export function FlowingRedRibbonBanner({
  currentScene,
  onSelectMilestone,
}: {
  currentScene: number;
  onSelectMilestone: (index: number) => void;
}) {
  const milestoneList = [
    { label: 'RA ĐI TÌM ĐƯỜNG CỨU NƯỚC', year: '1911', sceneIndex: 3 },
    { label: 'NHỮNG CHÂN TRỜI TƯ TƯỞNG', sceneIndex: 4 },
    { label: 'TIẾP THU TINH HOA NHÂN LOẠI', sceneIndex: 5 },
    { label: 'KHẲNG ĐỊNH CON ĐƯỜNG GIẢI PHÓNG DÂN TỘC', sceneIndex: 7 },
    { label: 'ĐỘC LẬP CHO DÂN TỘC QUYỀN TỰ QUYẾT CHO NHÂN DÂN', year: '1945', sceneIndex: 10 },
  ];

  return (
    <div className="flowing-red-ribbon" role="navigation" aria-label="Lộ trình tư tưởng Hồ Chí Minh">
      {/* Dynamic SVG Wave Background with Golden Bevel Edge */}
      <svg
        className="flowing-red-ribbon__svg"
        viewBox="0 0 1920 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crimsonGradient" x1="0%" y1="30%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#680b0b" />
            <stop offset="35%" stopColor="#8c1212" />
            <stop offset="70%" stopColor="#a31717" />
            <stop offset="100%" stopColor="#550808" />
          </linearGradient>
          <linearGradient id="goldEdgeGleam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd875" />
            <stop offset="40%" stopColor="#f5c249" />
            <stop offset="70%" stopColor="#e2a734" />
            <stop offset="100%" stopColor="#ffd875" />
          </linearGradient>
          <radialGradient id="flagStarGlow" cx="93%" cy="28%" r="40%">
            <stop offset="0%" stopColor="#ffe580" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#d49e29" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#800" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Golden star ambient glow */}
        <circle cx="1780" cy="110" r="180" fill="url(#flagStarGlow)" />

        {/* Primary flowing crimson silk curve */}
        <path
          d="M0,130 C320,110 520,185 880,185 C1220,185 1440,110 1920,20 L1920,320 L0,320 Z"
          fill="url(#crimsonGradient)"
        />

        {/* Secondary wave shadow layer for fabric depth */}
        <path
          d="M0,170 C400,160 680,225 1100,215 C1460,205 1680,110 1920,55 L1920,320 L0,320 Z"
          fill="#440707"
          opacity="0.65"
        />

        {/* Gleaming golden ribbon trim edge */}
        <path
          d="M0,130 C320,110 520,185 880,185 C1220,185 1440,110 1920,20"
          stroke="url(#goldEdgeGleam)"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M0,132 C320,112 520,187 880,187 C1220,187 1440,112 1920,22"
          stroke="#fff4cc"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Vietnamese Golden Star on the right silk flag wave */}
        <g transform="translate(1780, 105)">
          {/* 5-pointed star with beveled golden facets */}
          <polygon
            points="0,-48 14,-15 48,-15 20,6 31,40 0,20 -31,40 -20,6 -48,-15 -14,-15"
            fill="#f7ca45"
            stroke="#e2a829"
            strokeWidth="1.5"
          />
          {/* Bevel facet highlights */}
          <polygon points="0,-48 0,20 14,-15" fill="#ffec85" />
          <polygon points="48,-15 0,20 20,6" fill="#df9e22" />
          <polygon points="31,40 0,20 0,20" fill="#c48517" />
          <polygon points="-31,40 0,20 -20,6" fill="#ffde66" />
          <polygon points="-48,-15 0,20 -14,-15" fill="#f0b62e" />
        </g>
      </svg>

      {/* Interactive Milestones along the ribbon */}
      <div className="flowing-red-ribbon__nodes">
        {milestoneList.map((item, idx) => {
          const isActive = currentScene === item.sceneIndex;
          return (
            <button
              key={idx}
              className={`ribbon-node ${isActive ? 'ribbon-node--active' : ''}`}
              onClick={() => onSelectMilestone(item.sceneIndex)}
              title={`Chuyển tới: ${item.label}`}
            >
              {item.year && <span className="ribbon-node__year">{item.year}</span>}
              <span className="ribbon-node__dot" aria-hidden="true" />
              <span className="ribbon-node__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function GrandPresentationHeader() {
  return (
    <header className="grand-poster-header" role="banner">
      <div className="grand-poster-header__titles">
        <h2 className="grand-poster-title">HÀNH TRÌNH HỒ CHÍ MINH</h2>
        <h1 className="grand-poster-subtitle">
          CHUYỂN HÓA TƯ TƯỞNG VỀ QUYỀN CON NGƯỜI THÀNH QUYỀN TỰ QUYẾT CỦA MỘT DÂN TỘC
        </h1>
        <div className="grand-poster-star" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="28" height="28">
            <polygon
              points="20,2 25,14 38,14 27,22 31,35 20,27 9,35 13,22 2,14 15,14"
              fill="#eebc38"
              stroke="#c79219"
              strokeWidth="1.2"
            />
            <polygon points="20,2 20,27 25,14" fill="#fff099" />
            <polygon points="38,14 20,27 27,22" fill="#d9991e" />
            <polygon points="31,35 20,27 20,27" fill="#b37610" />
            <polygon points="9,35 20,27 13,22" fill="#ffe26a" />
            <polygon points="2,14 20,27 15,14" fill="#e0a324" />
          </svg>
        </div>
        <p className="grand-poster-subject">
          Đề tài thuyết trình môn Tư tưởng Hồ Chí Minh
        </p>
        <span className="grand-poster-group">Nhóm 1</span>
      </div>
    </header>
  );
}
