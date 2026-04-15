/**
 * ArticleIllustration — illustrations SVG thématiques pour chaque article.
 * Chaque clé correspond à un sujet précis, avec sa propre palette et ses formes.
 */

interface Config {
  bg: string;        // gradient CSS
  accent: string;    // couleur d'accentuation pour les formes SVG
  light: string;     // couleur claire complémentaire
  svg: React.ReactNode;
}

const configs: Record<string, Config> = {

  /* ---- Routine Beauté Matin ---- */
  "routine-matin": {
    bg: "linear-gradient(135deg, #f9e4c8 0%, #f5c887 50%, #e8a84a 100%)",
    accent: "#c8721a",
    light: "#fff8ee",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Sun rays */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
          <line key={i}
            x1="200" y1="60"
            x2={200 + 55 * Math.cos((deg - 90) * Math.PI / 180)}
            y2={60  + 55 * Math.sin((deg - 90) * Math.PI / 180)}
            stroke="#c8721a" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round"
          />
        ))}
        <circle cx="200" cy="60" r="32" fill="#e8a84a" fillOpacity="0.5" />
        <circle cx="200" cy="60" r="20" fill="#c8721a" fillOpacity="0.7" />
        {/* Droplets */}
        <ellipse cx="70" cy="100" rx="18" ry="24" fill="#c8721a" fillOpacity="0.18" />
        <ellipse cx="110" cy="130" rx="12" ry="16" fill="#c8721a" fillOpacity="0.22" />
        <ellipse cx="50" cy="145" rx="8" ry="11" fill="#c8721a" fillOpacity="0.15" />
        {/* Circles deco */}
        <circle cx="140" cy="40" r="5" fill="#c8721a" fillOpacity="0.3" />
        <circle cx="155" cy="55" r="3" fill="#c8721a" fillOpacity="0.2" />
        <circle cx="130" cy="60" r="2" fill="#c8721a" fillOpacity="0.25" />
        {/* Step dots */}
        {[1,2,3,4,5].map((n, i) => (
          <g key={n} transform={`translate(${40 + i * 42}, 165)`}>
            <circle r="10" fill="#c8721a" fillOpacity="0.7" />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n}</text>
          </g>
        ))}
      </svg>
    ),
  },

  /* ---- Peaux Noires / Mélanine ---- */
  "melanine": {
    bg: "linear-gradient(145deg, #3b1a0a 0%, #7a3a18 50%, #c8721a 100%)",
    accent: "#f5c887",
    light: "#fff0dc",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Concentric arcs — mélanine */}
        {[70, 90, 110, 130].map((r, i) => (
          <circle key={i} cx="140" cy="200" r={r}
            stroke="#f5c887" strokeWidth="1" strokeOpacity={0.15 + i * 0.07} fill="none" />
        ))}
        {/* Molecule dots */}
        {[
          [80,60],[140,40],[200,65],[230,110],[190,150],[110,155],[60,115]
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={6 + (i % 3) * 4}
            fill="#f5c887" fillOpacity={0.2 + (i % 4) * 0.1} />
        ))}
        {/* Lines connecting */}
        <line x1="80" y1="60" x2="140" y2="40" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="140" y1="40" x2="200" y2="65" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="200" y1="65" x2="230" y2="110" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="230" y1="110" x2="190" y2="150" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="190" y1="150" x2="110" y2="155" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="110" y1="155" x2="60" y2="115" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="60" y1="115" x2="80" y2="60" stroke="#f5c887" strokeOpacity="0.2" strokeWidth="1" />
        {/* Center */}
        <circle cx="140" cy="90" r="22" fill="#f5c887" fillOpacity="0.25" />
        <circle cx="140" cy="90" r="10" fill="#f5c887" fillOpacity="0.5" />
      </svg>
    ),
  },

  /* ---- Nouveauté Bio Activ ---- */
  "nouveaute": {
    bg: "linear-gradient(135deg, #1a3a1a 0%, #2d6a2d 50%, #5aad5a 100%)",
    accent: "#a8e6a8",
    light: "#edfded",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Leaf shapes */}
        <ellipse cx="100" cy="90" rx="60" ry="30" fill="#a8e6a8" fillOpacity="0.18"
          transform="rotate(-30 100 90)" />
        <ellipse cx="180" cy="80" rx="50" ry="25" fill="#a8e6a8" fillOpacity="0.14"
          transform="rotate(25 180 80)" />
        {/* Sparkles */}
        {[[60,40],[210,50],[240,130],[40,150],[150,20],[130,160]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#a8e6a8" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#a8e6a8" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="-5" y1="-5" x2="5" y2="5" stroke="#a8e6a8" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="5" y1="-5" x2="-5" y2="5" stroke="#a8e6a8" strokeWidth="1" strokeOpacity="0.4" />
          </g>
        ))}
        {/* Bottle silhouette */}
        <rect x="122" y="50" width="36" height="90" rx="12" fill="#a8e6a8" fillOpacity="0.25" />
        <rect x="128" y="38" width="24" height="18" rx="6" fill="#a8e6a8" fillOpacity="0.3" />
        {/* NEW badge */}
        <circle cx="220" cy="38" r="22" fill="#a8e6a8" fillOpacity="0.3" />
        <text x="220" y="43" textAnchor="middle" fill="#edfded" fontSize="10" fontWeight="bold">NEW</text>
      </svg>
    ),
  },

  /* ---- Hyperpigmentation ---- */
  "hyperpigmentation": {
    bg: "linear-gradient(135deg, #2a1040 0%, #5a2080 60%, #9b59b6 100%)",
    accent: "#d7a8f0",
    light: "#f8eeff",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Skin cross-section layers */}
        <rect x="20" y="120" width="240" height="16" rx="4" fill="#d7a8f0" fillOpacity="0.15" />
        <rect x="20" y="136" width="240" height="12" rx="4" fill="#d7a8f0" fillOpacity="0.10" />
        {/* Melanocytes */}
        {[60,100,140,180,220].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy="120" rx="12" ry="8" fill="#d7a8f0" fillOpacity={0.25 + (i % 2) * 0.2} />
            {/* pigment dots */}
            <circle cx={x - 4} cy="110" r="3" fill="#d7a8f0" fillOpacity="0.5" />
            <circle cx={x + 3} cy="105" r="2" fill="#d7a8f0" fillOpacity="0.4" />
            <circle cx={x} cy="98" r="1.5" fill="#d7a8f0" fillOpacity="0.35" />
          </g>
        ))}
        {/* UV rays coming from top */}
        {[80,120,160,200].map((x, i) => (
          <line key={i} x1={x} y1="10" x2={x - 20 + i*10} y2="80"
            stroke="#d7a8f0" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
        ))}
        <text x="140" y="22" textAnchor="middle" fill="#d7a8f0" fillOpacity="0.6" fontSize="9" letterSpacing="3">U V A · U V B</text>
        {/* Target circle on a spot */}
        <circle cx="140" cy="90" r="28" stroke="#d7a8f0" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeDasharray="4 2" />
        <circle cx="140" cy="90" r="14" stroke="#d7a8f0" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
        <circle cx="140" cy="90" r="4" fill="#d7a8f0" fillOpacity="0.8" />
      </svg>
    ),
  },

  /* ---- Ingrédients Africains ---- */
  "ingredients": {
    bg: "linear-gradient(145deg, #1c3a1a 0%, #4a7a30 55%, #8fbb50 100%)",
    accent: "#c8e896",
    light: "#f0f8e0",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Baobab tree silhouette */}
        <rect x="128" y="90" width="24" height="80" rx="5" fill="#c8e896" fillOpacity="0.3" />
        <ellipse cx="140" cy="75" rx="55" ry="45" fill="#c8e896" fillOpacity="0.2" />
        <ellipse cx="105" cy="80" rx="30" ry="22" fill="#c8e896" fillOpacity="0.18" />
        <ellipse cx="175" cy="80" rx="30" ry="22" fill="#c8e896" fillOpacity="0.18" />
        {/* Leaves */}
        {[[70,50],[110,35],[150,28],[190,38],[220,55]].map(([x,y],i) => (
          <ellipse key={i} cx={x} cy={y} rx="12" ry="7"
            fill="#c8e896" fillOpacity="0.35" transform={`rotate(${-20+i*15} ${x} ${y})`} />
        ))}
        {/* Fruits/nuts hanging */}
        {[90,130,160,195].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="95" x2={x+5} y2={115 + (i%2)*8} stroke="#c8e896" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx={x+5} cy={120+(i%2)*8} r="6" fill="#c8e896" fillOpacity="0.4" />
          </g>
        ))}
        {/* Labels */}
        <text x="50" y="155" fill="#c8e896" fillOpacity="0.7" fontSize="7" letterSpacing="1">KARITÉ</text>
        <text x="105" y="170" fill="#c8e896" fillOpacity="0.7" fontSize="7" letterSpacing="1">BAOBAB</text>
        <text x="175" y="162" fill="#c8e896" fillOpacity="0.7" fontSize="7" letterSpacing="1">MORINGA</text>
      </svg>
    ),
  },

  /* ---- Protection Solaire ---- */
  "solaire": {
    bg: "linear-gradient(135deg, #7a3500 0%, #d4620a 45%, #f59b30 100%)",
    accent: "#fde68a",
    light: "#fffbeb",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Sun */}
        {Array.from({length: 16}, (_,i) => i * (360/16)).map((deg, i) => (
          <line key={i}
            x1={70 + 38 * Math.cos(deg * Math.PI / 180)}
            y1={70 + 38 * Math.sin(deg * Math.PI / 180)}
            x2={70 + 58 * Math.cos(deg * Math.PI / 180)}
            y2={70 + 58 * Math.sin(deg * Math.PI / 180)}
            stroke="#fde68a" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round"
          />
        ))}
        <circle cx="70" cy="70" r="30" fill="#fde68a" fillOpacity="0.4" />
        <circle cx="70" cy="70" r="18" fill="#fde68a" fillOpacity="0.7" />
        {/* SPF shield */}
        <path d="M 175 30 L 245 30 L 245 110 Q 210 145 175 110 Z"
          fill="#fde68a" fillOpacity="0.15" stroke="#fde68a" strokeOpacity="0.4" strokeWidth="1.5" />
        <text x="210" y="72" textAnchor="middle" fill="#fde68a" fillOpacity="0.9" fontSize="14" fontWeight="bold">SPF</text>
        <text x="210" y="90" textAnchor="middle" fill="#fde68a" fillOpacity="0.9" fontSize="18" fontWeight="bold">30</text>
        {/* UV arrows blocked */}
        {[140,155,170].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="20" x2={x} y2="60" stroke="#fde68a" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 2" />
            <polygon points={`${x},65 ${x-5},55 ${x+5},55`} fill="#fde68a" fillOpacity="0.35" />
          </g>
        ))}
        <line x1="130" y1="68" x2="175" y2="68" stroke="#fde68a" strokeOpacity="0.5" strokeWidth="2" />
        <polygon points="130,68 140,62 140,74" fill="#fde68a" fillOpacity="0.6" />
      </svg>
    ),
  },

  /* ---- Routine Nuit ---- */
  "nuit": {
    bg: "linear-gradient(145deg, #0a0a2e 0%, #1a1a5e 55%, #3a3a8e 100%)",
    accent: "#c8b8f8",
    light: "#f0eeff",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Moon */}
        <path d="M 180 30 Q 140 60 145 100 Q 150 135 185 150 Q 120 155 105 100 Q 90 50 140 25 Q 155 22 180 30 Z"
          fill="#c8b8f8" fillOpacity="0.35" />
        {/* Stars */}
        {[[40,25],[70,50],[30,80],[60,100],[90,40],[110,70],[220,35],[240,60],[250,100],[220,130],[200,80],[170,20]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.5 : 1.5}
            fill="#c8b8f8" fillOpacity={0.4 + (i % 4) * 0.15} />
        ))}
        {/* ZZZ sleep symbols */}
        {[['Z', 200, 155, 16], ['Z', 225, 140, 12], ['Z', 244, 128, 9]].map(([z, x, y, s], i) => (
          <text key={i} x={x as number} y={y as number} fill="#c8b8f8" fillOpacity={0.5 - i * 0.1}
            fontSize={s as number} fontFamily="serif" fontStyle="italic">{z}</text>
        ))}
        {/* Cell regeneration circles */}
        {[[50,135,20],[80,150,14],[110,140,10]].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            stroke="#c8b8f8" strokeOpacity={0.3 + i * 0.1} strokeWidth="1" fill="none" strokeDasharray="2 2" />
        ))}
        <text x="55" y="140" fill="#c8b8f8" fillOpacity="0.5" fontSize="6" textAnchor="middle">régénération</text>
      </svg>
    ),
  },

  /* ---- Savons Naturels ---- */
  "savon": {
    bg: "linear-gradient(135deg, #1a3a3a 0%, #2d7070 55%, #50a8a8 100%)",
    accent: "#a8e6e6",
    light: "#edfafa",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soap bar */}
        <rect x="80" y="80" width="120" height="70" rx="16" fill="#a8e6e6" fillOpacity="0.25" />
        <rect x="88" y="88" width="104" height="54" rx="12" fill="#a8e6e6" fillOpacity="0.15" stroke="#a8e6e6" strokeOpacity="0.3" strokeWidth="1" />
        <text x="140" y="118" textAnchor="middle" fill="#a8e6e6" fillOpacity="0.6" fontSize="8" letterSpacing="2">NATUREL</text>
        {/* Bubbles */}
        {[[50,50,18],[30,90,12],[65,130,22],[210,45,20],[240,85,14],[215,135,10],
          [150,35,8],[170,155,16],[100,170,9]].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            stroke="#a8e6e6" strokeOpacity={0.25 + (i%3)*0.1} strokeWidth="1.5" fill="#a8e6e6" fillOpacity={0.07} />
        ))}
        {/* Foam on top */}
        {[95,115,135,155,165].map((x, i) => (
          <ellipse key={i} cx={x} cy={78} rx={8+(i%2)*4} ry={6+(i%3)*3}
            fill="#a8e6e6" fillOpacity="0.2" />
        ))}
      </svg>
    ),
  },

  /* ---- Hydratation ---- */
  "hydratation": {
    bg: "linear-gradient(135deg, #0a2a4a 0%, #1a5a8a 55%, #3090c0 100%)",
    accent: "#90d8f8",
    light: "#e8f8ff",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Water waves */}
        <path d="M 0 130 Q 35 115 70 130 Q 105 145 140 130 Q 175 115 210 130 Q 245 145 280 130 L 280 180 L 0 180 Z"
          fill="#90d8f8" fillOpacity="0.15" />
        <path d="M 0 145 Q 35 130 70 145 Q 105 160 140 145 Q 175 130 210 145 Q 245 160 280 145 L 280 180 L 0 180 Z"
          fill="#90d8f8" fillOpacity="0.12" />
        {/* Water drop big */}
        <path d="M 140 20 Q 170 65 170 90 Q 170 120 140 130 Q 110 120 110 90 Q 110 65 140 20 Z"
          fill="#90d8f8" fillOpacity="0.3" />
        <path d="M 140 20 Q 170 65 170 90 Q 170 120 140 130 Q 110 120 110 90 Q 110 65 140 20 Z"
          stroke="#90d8f8" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
        {/* Shine on drop */}
        <ellipse cx="128" cy="65" rx="6" ry="10" fill="white" fillOpacity="0.25" transform="rotate(-20 128 65)" />
        {/* Small drops */}
        {[[55,55],[60,90],[220,60],[225,95],[230,40]].map(([cx,cy],i) => (
          <path key={i}
            d={`M ${cx} ${cy-14} Q ${cx+9} ${cy-2} ${cx+9} ${cy+4} Q ${cx+9} ${cy+14} ${cx} ${cy+16} Q ${cx-9} ${cy+14} ${cx-9} ${cy+4} Q ${cx-9} ${cy-2} ${cx} ${cy-14} Z`}
            fill="#90d8f8" fillOpacity="0.25" />
        ))}
        {/* HA molecule label */}
        <text x="140" y="82" textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="11" fontWeight="bold">H.A.</text>
        <text x="140" y="95" textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="7">hyaluronique</text>
      </svg>
    ),
  },

  /* ---- Cosmétique Togolaise ---- */
  "togo": {
    bg: "linear-gradient(145deg, #1a3a0a 0%, #2d6a1a 40%, #c8722a 100%)",
    accent: "#f5d08a",
    light: "#fffbee",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Africa continent silhouette simplified */}
        <path d="M 100 20 Q 160 18 185 45 Q 210 70 205 110 Q 200 145 175 160 Q 150 175 130 165 Q 105 158 90 135 Q 70 108 75 75 Q 78 45 100 20 Z"
          fill="#f5d08a" fillOpacity="0.15" stroke="#f5d08a" strokeOpacity="0.3" strokeWidth="1" />
        {/* Star for Togo flag */}
        <polygon points="140,70 145,85 161,85 148,94 153,109 140,100 127,109 132,94 119,85 135,85"
          fill="#f5d08a" fillOpacity="0.6" />
        {/* Globe lines */}
        <circle cx="140" cy="90" r="55" stroke="#f5d08a" strokeOpacity="0.15" strokeWidth="1" fill="none" />
        <ellipse cx="140" cy="90" rx="55" ry="20" stroke="#f5d08a" strokeOpacity="0.12" strokeWidth="1" fill="none" />
        <ellipse cx="140" cy="90" rx="30" ry="55" stroke="#f5d08a" strokeOpacity="0.12" strokeWidth="1" fill="none" />
        {/* Export arrows */}
        {[[50,120],[220,55],[240,130]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#f5d08a" fillOpacity="0.3" />
            <line x1={x} y1={y} x2="140" y2="90" stroke="#f5d08a" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 2" />
          </g>
        ))}
        <text x="140" y="158" textAnchor="middle" fill="#f5d08a" fillOpacity="0.6" fontSize="7" letterSpacing="2">LOMÉ · TOGO</text>
      </svg>
    ),
  },

  /* ---- Acné ---- */
  "acne": {
    bg: "linear-gradient(135deg, #0a2a2a 0%, #1a6055 50%, #28998a 100%)",
    accent: "#80e8d8",
    light: "#edfaf8",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Skin layer */}
        <path d="M 20 100 Q 60 88 100 100 Q 140 112 180 100 Q 220 88 260 100"
          stroke="#80e8d8" strokeOpacity="0.35" strokeWidth="2" fill="none" />
        {/* Pores */}
        {[60, 110, 160, 210].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={100} rx="8" ry="5" fill="#80e8d8" fillOpacity="0.2" />
            <ellipse cx={x} cy={108} rx={5+(i%2)*3} ry={8+(i%2)*4} fill="#80e8d8" fillOpacity="0.15" />
          </g>
        ))}
        {/* Check marks — solutions */}
        {[[50,145],[110,155],[170,148],[230,152]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="12" fill="#80e8d8" fillOpacity="0.2" />
            <polyline points={`${x-5},${y} ${x-1},${y+5} ${x+6},${y-5}`}
              stroke="#80e8d8" strokeOpacity="0.7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        ))}
        {/* Molecular formula */}
        <text x="140" y="55" textAnchor="middle" fill="#80e8d8" fillOpacity="0.5" fontSize="9" letterSpacing="1">Acide Salicylique</text>
        <text x="140" y="70" textAnchor="middle" fill="#80e8d8" fillOpacity="0.5" fontSize="9" letterSpacing="1">Niacinamide · Zinc</text>
        {/* Hex pattern */}
        {[[80,30],[130,25],[180,35],[220,22]].map(([cx,cy],i) => (
          <polygon key={i}
            points={`${cx},${cy-10} ${cx+9},${cy-5} ${cx+9},${cy+5} ${cx},${cy+10} ${cx-9},${cy+5} ${cx-9},${cy-5}`}
            stroke="#80e8d8" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        ))}
      </svg>
    ),
  },

  /* ---- Tendances Beauté 2026 ---- */
  "tendances": {
    bg: "linear-gradient(135deg, #3a0a3a 0%, #7a2080 50%, #c060c0 100%)",
    accent: "#f0a8f0",
    light: "#feeefe",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Grid futuriste */}
        {[40,80,120,160,200,240].map((x,i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="180" stroke="#f0a8f0" strokeOpacity="0.07" strokeWidth="1" />
        ))}
        {[30,60,90,120,150].map((y,i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="280" y2={y} stroke="#f0a8f0" strokeOpacity="0.07" strokeWidth="1" />
        ))}
        {/* Trend upward arrow */}
        <polyline points="30,150 80,110 130,125 190,60 250,30"
          stroke="#f0a8f0" strokeOpacity="0.6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="250" cy="30" r="6" fill="#f0a8f0" fillOpacity="0.7" />
        {/* Data points */}
        {[[80,110],[130,125],[190,60]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#f0a8f0" fillOpacity="0.5" />
        ))}
        {/* Year badge */}
        <rect x="100" y="140" width="80" height="28" rx="14" fill="#f0a8f0" fillOpacity="0.2" />
        <text x="140" y="158" textAnchor="middle" fill="#f0a8f0" fillOpacity="0.9" fontSize="12" fontWeight="bold" letterSpacing="2">2026</text>
        {/* Icons */}
        <text x="40" y="35" fill="#f0a8f0" fillOpacity="0.4" fontSize="18">✦</text>
        <text x="220" y="160" fill="#f0a8f0" fillOpacity="0.35" fontSize="14">✦</text>
        <text x="250" y="90" fill="#f0a8f0" fillOpacity="0.3" fontSize="10">✦</text>
      </svg>
    ),
  },

  /* ---- Karité / Shea Butter ---- */
  "karite": {
    bg: "linear-gradient(145deg, #5a3500 0%, #a86a00 50%, #d4a020 100%)",
    accent: "#f5dc90",
    light: "#fffbee",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Karité tree */}
        <rect x="128" y="100" width="24" height="75" rx="5" fill="#f5dc90" fillOpacity="0.25" />
        {/* Canopy */}
        <ellipse cx="140" cy="85" rx="60" ry="50" fill="#f5dc90" fillOpacity="0.18" />
        <ellipse cx="100" cy="95" rx="35" ry="28" fill="#f5dc90" fillOpacity="0.15" />
        <ellipse cx="180" cy="95" rx="35" ry="28" fill="#f5dc90" fillOpacity="0.15" />
        {/* Fruits */}
        {[[115,65],[140,50],[165,60],[128,85],[155,80],[100,80],[175,75]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={5+(i%2)*3}
            fill="#f5dc90" fillOpacity={0.4+(i%3)*0.1} />
        ))}
        {/* Gold sheen */}
        {[40,80,120,160,200,240].map((x, i) => (
          <ellipse key={i} cx={x} cy={160} rx="18" ry="5"
            fill="#f5dc90" fillOpacity={0.1+(i%4)*0.05} />
        ))}
        {/* Label */}
        <text x="140" y="172" textAnchor="middle" fill="#f5dc90" fillOpacity="0.7" fontSize="8" letterSpacing="3">KARITÉ · TOGO</text>
        {/* Molecule */}
        <text x="230" y="40" fill="#f5dc90" fillOpacity="0.5" fontSize="8">Vit. A·D·E·F</text>
      </svg>
    ),
  },

  /* ---- Soins Homme ---- */
  "homme": {
    bg: "linear-gradient(145deg, #0f1a2a 0%, #1e3a5a 55%, #2e5a8a 100%)",
    accent: "#90b8e8",
    light: "#eef4fc",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Face outline */}
        <ellipse cx="140" cy="85" rx="50" ry="60" stroke="#90b8e8" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
        {/* Eyes */}
        <ellipse cx="120" cy="75" rx="8" ry="5" fill="#90b8e8" fillOpacity="0.3" />
        <ellipse cx="160" cy="75" rx="8" ry="5" fill="#90b8e8" fillOpacity="0.3" />
        {/* Nose */}
        <path d="M 140 85 L 132 105 Q 140 110 148 105 Z" stroke="#90b8e8" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        {/* Beard stubble dots */}
        {[
          [115,120],[125,125],[135,128],[145,128],[155,125],[165,120],
          [112,112],[168,112],[120,115],[160,115]
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#90b8e8" fillOpacity="0.3" />
        ))}
        {/* 3 steps */}
        {[["①","Nettoyer",50,155],["②","Hydrater",140,155],["③","Protéger",225,155]].map(([n,t,x,y],i) => (
          <g key={i}>
            <text x={x as number} y={(y as number)-8} textAnchor="middle" fill="#90b8e8" fillOpacity="0.7" fontSize="11">{n as string}</text>
            <text x={x as number} y={y as number} textAnchor="middle" fill="#90b8e8" fillOpacity="0.5" fontSize="7">{t as string}</text>
          </g>
        ))}
        {/* Lines connecting steps */}
        <line x1="75" y1="147" x2="110" y2="147" stroke="#90b8e8" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="165" y1="147" x2="200" y2="147" stroke="#90b8e8" strokeOpacity="0.2" strokeWidth="1" />
      </svg>
    ),
  },

  /* ---- Lait Corporel ---- */
  "lait-corporel": {
    bg: "linear-gradient(135deg, #3a1a2a 0%, #7a3a60 50%, #c060a0 100%)",
    accent: "#f0c0e0",
    light: "#fef0f8",
    svg: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Skin types scale */}
        {[["Sèche","#f0c0e0",48],["Normale","#e0a0c8",105],["Mixte","#c070a0",162],["Grasse","#9040780",219]].map(([label,color,x],i) => (
          <g key={i}>
            <rect x={(x as number)-22} y="70" width="44" height={50 + (i*8 - 12)}
              fill={color as string} fillOpacity="0.25" rx="4" />
            <text x={x as number} y="168" textAnchor="middle" fill="#f0c0e0" fillOpacity="0.6" fontSize="7">{label as string}</text>
          </g>
        ))}
        {/* Bottle silhouettes */}
        {[60,140,220].map((x, i) => (
          <g key={i}>
            <rect x={x-10} y="25" width="20" height="50" rx="8" fill="#f0c0e0" fillOpacity={0.15+i*0.08} />
            <rect x={x-6} y="18" width="12" height="12" rx="4" fill="#f0c0e0" fillOpacity={0.2+i*0.08} />
          </g>
        ))}
        {/* Drops */}
        {[[95,35],[175,30],[100,80],[178,75]].map(([cx,cy],i) => (
          <path key={i}
            d={`M ${cx} ${cy-8} Q ${cx+6} ${cy} ${cx+6} ${cy+4} Q ${cx+6} ${cy+10} ${cx} ${cy+12} Q ${cx-6} ${cy+10} ${cx-6} ${cy+4} Q ${cx-6} ${cy} ${cx} ${cy-8} Z`}
            fill="#f0c0e0" fillOpacity="0.3" />
        ))}
        {/* Texture lines */}
        {[105,125,145].map((y, i) => (
          <path key={i} d={`M 30 ${y} Q 140 ${y-8+i*4} 250 ${y}`}
            stroke="#f0c0e0" strokeOpacity="0.1" strokeWidth="1" fill="none" />
        ))}
      </svg>
    ),
  },
};

/* Fallback générique */
const fallback: Config = {
  bg: "linear-gradient(135deg, #1a0e08 0%, #c8932a 100%)",
  accent: "#e8c98a",
  light: "#fff8ee",
  svg: (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="140" cy="90" r="55" stroke="#e8c98a" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <circle cx="140" cy="90" r="30" fill="#e8c98a" fillOpacity="0.15" />
      <text x="140" y="95" textAnchor="middle" fill="#e8c98a" fillOpacity="0.6" fontSize="12" letterSpacing="2">STEFCOS</text>
    </svg>
  ),
};

interface Props {
  illustrationKey: string;
  className?: string;
}

const ArticleIllustration = ({ illustrationKey, className = "" }: Props) => {
  const cfg = configs[illustrationKey] ?? fallback;

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${className}`}
      style={{ background: cfg.bg }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      {/* SVG illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        {cfg.svg}
      </div>
    </div>
  );
};

export default ArticleIllustration;
