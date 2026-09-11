import React from 'react'
import { ShotItem } from './ShotChart';

type Props = {
  shots: ShotItem[];
}



export const BasketballCourt = ({ shots: filteredShots }: Props) => {
  return (
    // <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto rounded-2xl overflow-hidden border border-neutral-800 bg-[#E8D3A7] shadow-2xl transition-all duration-300">
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-[#E8D3A7] shadow-2xl transition-all duration-300">
      <svg
        viewBox="0 0 1020 590"
        className="w-full h-auto rounded-2xl overflow-hidden select-none font-sans block"
      >
        <defs>
          {/* Patrón Parquet Boston Garden */}
          <pattern
            id="celticsParquet"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <line x1="10" y1="0" x2="10" y2="20" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="20" y1="0" x2="20" y2="20" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="20" y1="10" x2="40" y2="10" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="20" y1="20" x2="40" y2="20" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="0" y1="30" x2="20" y2="30" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="0" y1="40" x2="20" y2="40" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="30" y1="20" x2="30" y2="40" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <line x1="40" y1="20" x2="40" y2="40" stroke="#78350F" strokeWidth="0.8" opacity="0.09" />
            <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="#78350F" strokeWidth="1" opacity="0.12" />
          </pattern>
        </defs>

        {/* 1. Marco exterior verde oficial */}
        <rect width="1020" height="590" fill="#007A33" />

        {/* 2. Textos perimetrales horizontales */}
        <text
          x="510"
          y="24"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="15"
          fontWeight="900"
          letterSpacing="4"
        >
          PRESENTED BY 2KCELTICS.XYZ
        </text>

        <text
          x="510"
          y="566"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="15"
          fontWeight="900"
          letterSpacing="4"
        >
          CELTICS.COM
        </text>

        <text
          x="22"
          y="295"
          transform="rotate(-90, 22, 295)"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="18"
          fontWeight="900"
          letterSpacing="5"
        >
          BOSTON CELTICS
        </text>

        <text
          x="998"
          y="295"
          transform="rotate(90, 998, 295)"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="18"
          fontWeight="900"
          letterSpacing="5"
        >
          BOSTON CELTICS
        </text>

        {/* 3. Duela de madera completa (940 x 500) */}
        <rect x="40" y="45" width="940" height="500" fill="#E8D1A0" />
        <rect x="40" y="45" width="940" height="500" fill="url(#celticsParquet)" />

        {/* 4. Contorno perimetral blanco reglamentario */}
        <rect
          x="40"
          y="45"
          width="940"
          height="500"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* ================= TEXTOS HORIZONTALES TD GARDEN ================= */}
        <g className="pointer-events-none select-none font-sans">
          {/* 1. Superior Izquierda (arriba, a la izquierda de mitad de cancha) */}
          <g transform="translate(360, 95)">
            {/* Cuadrado verde TD */}
            <rect x="-14" y="-12" width="28" height="24" rx="4" fill="#007A33" />
            <text
              x="0"
              y="1"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontSize="13"
              fontWeight="900"
              letterSpacing="0.5"
            >
              TD
            </text>

            {/* Texto GARDEN */}
            <text
              x="22"
              y="1"
              dominantBaseline="middle"
              fill="#007A33"
              fontSize="17"
              fontWeight="900"
              letterSpacing="3"
            >
              GARDEN
            </text>
          </g>

          {/* 2. Inferior Derecha (abajo, a la derecha de mitad de cancha) */}
          <g transform="translate(580, 495)">
            {/* Cuadrado verde TD */}
            <rect x="-14" y="-12" width="28" height="24" rx="4" fill="#007A33" />
            <text
              x="0"
              y="1"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontSize="13"
              fontWeight="900"
              letterSpacing="0.5"
            >
              TD
            </text>

            {/* Texto GARDEN */}
            <text
              x="22"
              y="1"
              dominantBaseline="middle"
              fill="#007A33"
              fontSize="17"
              fontWeight="900"
              letterSpacing="3"
            >
              GARDEN
            </text>
          </g>
        </g>

        {/* 5. Mitad de cancha y círculo central */}
        <line x1="510" y1="45" x2="510" y2="545" stroke="#FFFFFF" strokeWidth="3" />

        <image
          href="https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg"
          x={420}
          y={205}
          width="180"
          height="180"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none select-none opacity-90"
        />

        {/* Círculo central exterior (radio 60) */}
        {/* <circle cx="510" cy="295" r="60" fill="none" stroke="#FFFFFF" strokeWidth="3" /> */}

        {/* Círculo interior restringido (radio 20) */}
        <circle cx="510" cy="295" r="20" fill="none" stroke="#FFFFFF" strokeWidth="2" />

        {/* ================= CANCHA IZQUIERDA (OFENSIVA / TIROS) ================= */}
        {/* Zona pintada */}
        <rect x="40" y="215" width="190" height="160" fill="#007A33" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="230" y1="215" x2="230" y2="375" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* Semicírculo tiro libre */}
        <path d="M 230 235 A 60 60 0 0 0 230 355" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6,6" />
        <path d="M 230 235 A 60 60 0 0 1 230 355" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* Tablero, Aro y No-Carga */}
        <line x1="80" y1="265" x2="80" y2="325" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="77" y="285" width="3" height="20" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="80" y1="295" x2="85" y2="295" stroke="#ea580c" strokeWidth="3" />
        <circle cx="92.5" cy="295" r="7.5" fill="none" stroke="#ea580c" strokeWidth="2.5" />
        <path d="M 92.5 255 A 40 40 0 0 1 92.5 335" fill="none" stroke="#FFFFFF" strokeWidth="2" />

        {/* Línea de 3 puntos */}
        <line x1="40" y1="75" x2="180" y2="75" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="40" y1="515" x2="180" y2="515" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M 180 75 A 237.5 237.5 0 0 1 180 515" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* ================= CANCHA DERECHA (ESPEJO REGLAMENTARIO) ================= */}
        {/* Zona pintada rival */}
        <rect x="790" y="215" width="190" height="160" fill="#007A33" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="790" y1="215" x2="790" y2="375" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* Semicírculo tiro libre rival */}
        <path d="M 790 235 A 60 60 0 0 1 790 355" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6,6" />
        <path d="M 790 235 A 60 60 0 0 0 790 355" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* Tablero y Aro rival */}
        <line x1="940" y1="265" x2="940" y2="325" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="940" y="285" width="3" height="20" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="940" y1="295" x2="935" y2="295" stroke="#ea580c" strokeWidth="3" />
        <circle cx="927.5" cy="295" r="7.5" fill="none" stroke="#ea580c" strokeWidth="2.5" />
        <path d="M 927.5 255 A 40 40 0 0 0 927.5 335" fill="none" stroke="#FFFFFF" strokeWidth="2" />

        {/* Línea de 3 puntos rival */}
        <line x1="980" y1="75" x2="840" y2="75" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="980" y1="515" x2="840" y2="515" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M 840 75 A 237.5 237.5 0 0 0 840 515" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* ================= 6. TIROS EN CANCHA ================= */}
        {filteredShots.map((shot) => {
          // locY es la distancia al aro (hacia la derecha: eje X)
          // locX es el desplazamiento lateral (eje Y)
          const cx = shot.locY + 92.5;
          const cy = shot.locX + 295;
          const isMade = shot.eventType === "Made Shot";
          const tooltip = `${shot.playerName} - ${shot.actionType} (${isMade ? "Made" : "Missed"})`;

          if (isMade) {
            return (
              <circle
                key={shot.id}
                cx={cx}
                cy={cy}
                r={5}
                className="cursor-pointer transition-all duration-150 hover:stroke-white hover:stroke-[2.5]"
                fill="#FDB927"
                stroke="#111827"
                strokeWidth="1.2"
              >
                <title>{tooltip}</title>
              </circle>
            );
          }

          return (
            <path
              key={shot.id}
              d={`M ${cx - 4} ${cy - 4} L ${cx + 4} ${cy + 4} M ${cx + 4} ${cy - 4} L ${cx - 4} ${cy + 4}`}
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-150 hover:stroke-white hover:stroke-[3.5]"
            >
              <title>{tooltip}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
};

export default BasketballCourt;