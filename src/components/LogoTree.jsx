export default function LogoTree({ size, color = '#C8A34D', className = '' }) {
  return (
    <svg
      width={size ?? '100%'}
      height={size ? size * 1.09 : undefined}
      viewBox="0 0 160 175"
      className={className}
      style={size ? undefined : { height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ═══ GALHOS ════════════════════════════════════════════ */}
      <g stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Tronco principal */}
        <path d="M80,155 L80,118" strokeWidth="7"/>

        {/* Galhos principais E/D */}
        <path d="M80,131 Q66,117 52,104" strokeWidth="4.5"/>
        <path d="M80,131 Q94,117 108,104" strokeWidth="4.5"/>
        {/* Centro continua pra cima */}
        <path d="M80,118 Q80,103 80,88" strokeWidth="3.5"/>

        {/* 2° nível — esquerda (52,104) */}
        <path d="M52,104 Q39,91 29,77" strokeWidth="3"/>
        <path d="M52,104 Q49,89 46,75" strokeWidth="2.5"/>
        <path d="M52,104 Q58,91 64,79" strokeWidth="2.5"/>
        {/* 2° nível — direita (108,104) */}
        <path d="M108,104 Q121,91 131,77" strokeWidth="3"/>
        <path d="M108,104 Q111,89 114,75" strokeWidth="2.5"/>
        <path d="M108,104 Q102,91 96,79" strokeWidth="2.5"/>
        {/* 2° nível — centro (80,88) */}
        <path d="M80,88 Q70,75 62,63" strokeWidth="2.5"/>
        <path d="M80,88 Q80,74 80,61" strokeWidth="2.5"/>
        <path d="M80,88 Q90,75 98,63" strokeWidth="2.5"/>

        {/* 3° nível — extremo esquerdo (29,77) */}
        <path d="M29,77 Q22,65 17,54" strokeWidth="2"/>
        <path d="M29,77 Q27,63 26,51" strokeWidth="2"/>
        {/* 3° nível — esq-médio (46,75) */}
        <path d="M46,75 Q40,63 37,51" strokeWidth="2"/>
        <path d="M46,75 Q44,62 44,50" strokeWidth="2"/>
        {/* 3° nível — esq-interno (64,79) */}
        <path d="M64,79 Q58,67 53,55" strokeWidth="2"/>
        <path d="M64,79 Q63,66 62,54" strokeWidth="2"/>
        {/* 3° nível — extremo direito (131,77) */}
        <path d="M131,77 Q138,65 143,54" strokeWidth="2"/>
        <path d="M131,77 Q133,63 134,51" strokeWidth="2"/>
        {/* 3° nível — dir-médio (114,75) */}
        <path d="M114,75 Q120,63 123,51" strokeWidth="2"/>
        <path d="M114,75 Q116,62 116,50" strokeWidth="2"/>
        {/* 3° nível — dir-interno (96,79) */}
        <path d="M96,79 Q102,67 107,55" strokeWidth="2"/>
        <path d="M96,79 Q97,66 98,54" strokeWidth="2"/>
        {/* 3° nível — centro-esq (62,63) */}
        <path d="M62,63 Q56,51 53,40" strokeWidth="1.8"/>
        <path d="M62,63 Q60,50 59,38" strokeWidth="1.8"/>
        {/* 3° nível — centro-cima (80,61) */}
        <path d="M80,61 Q74,49 71,37" strokeWidth="1.8"/>
        <path d="M80,61 Q80,48 80,35" strokeWidth="1.8"/>
        <path d="M80,61 Q86,49 89,37" strokeWidth="1.8"/>
        {/* 3° nível — centro-dir (98,63) */}
        <path d="M98,63 Q104,51 107,40" strokeWidth="1.8"/>
        <path d="M98,63 Q100,50 101,38" strokeWidth="1.8"/>
      </g>

      {/* ═══ FOLHAS ════════════════════════════════════════════ */}
      <g fill={color}>
        {/* — Extremo esquerdo — */}
        <ellipse cx="12" cy="50" rx="6.5" ry="3.2" transform="rotate(-50,12,50)"/>
        <ellipse cx="18" cy="46" rx="6.5" ry="3.2" transform="rotate(-30,18,46)"/>
        <ellipse cx="22" cy="54" rx="6"   ry="3"   transform="rotate(-65,22,54)"/>
        <ellipse cx="22" cy="47" rx="6.5" ry="3.2" transform="rotate(-45,22,47)"/>
        <ellipse cx="28" cy="44" rx="6"   ry="3"   transform="rotate(-25,28,44)"/>
        <ellipse cx="30" cy="51" rx="6"   ry="3"   transform="rotate(-55,30,51)"/>

        {/* — Esquerda médio — */}
        <ellipse cx="33" cy="48" rx="6.5" ry="3.2" transform="rotate(-40,33,48)"/>
        <ellipse cx="38" cy="44" rx="6.5" ry="3.2" transform="rotate(-25,38,44)"/>
        <ellipse cx="41" cy="51" rx="6"   ry="3"   transform="rotate(-50,41,51)"/>
        <ellipse cx="40" cy="46" rx="6"   ry="3"   transform="rotate(-35,40,46)"/>
        <ellipse cx="46" cy="43" rx="6"   ry="3"   transform="rotate(-20,46,43)"/>
        <ellipse cx="47" cy="50" rx="6"   ry="3"   transform="rotate(-45,47,50)"/>

        {/* — Esquerda interno — */}
        <ellipse cx="49" cy="51" rx="6"   ry="3"   transform="rotate(-30,49,51)"/>
        <ellipse cx="55" cy="48" rx="6"   ry="3"   transform="rotate(-15,55,48)"/>
        <ellipse cx="57" cy="55" rx="6"   ry="3"   transform="rotate(-45,57,55)"/>
        <ellipse cx="58" cy="50" rx="6"   ry="3"   transform="rotate(-30,58,50)"/>
        <ellipse cx="64" cy="47" rx="6"   ry="3"   transform="rotate(-15,64,47)"/>
        <ellipse cx="63" cy="55" rx="6"   ry="3"   transform="rotate(-40,63,55)"/>

        {/* — Centro-esquerda — */}
        <ellipse cx="49" cy="37" rx="6"   ry="3"   transform="rotate(-45,49,37)"/>
        <ellipse cx="55" cy="33" rx="6"   ry="3"   transform="rotate(-30,55,33)"/>
        <ellipse cx="57" cy="40" rx="6"   ry="3"   transform="rotate(-55,57,40)"/>
        <ellipse cx="56" cy="35" rx="5.5" ry="2.8" transform="rotate(-38,56,35)"/>
        <ellipse cx="61" cy="31" rx="5.5" ry="2.8" transform="rotate(-20,61,31)"/>

        {/* — Centro topo (coroa) — */}
        <ellipse cx="67" cy="33" rx="6"   ry="3"   transform="rotate(-20,67,33)"/>
        <ellipse cx="73" cy="28" rx="6.5" ry="3.2" transform="rotate(-10,73,28)"/>
        <ellipse cx="71" cy="37" rx="5.5" ry="2.8" transform="rotate(-30,71,37)"/>
        <ellipse cx="77" cy="25" rx="6.5" ry="3.2" transform="rotate(-5,77,25)"/>
        <ellipse cx="80" cy="24" rx="7"   ry="3.5" transform="rotate(0,80,24)"/>
        <ellipse cx="83" cy="25" rx="6.5" ry="3.2" transform="rotate(5,83,25)"/>
        <ellipse cx="89" cy="28" rx="6.5" ry="3.2" transform="rotate(10,89,28)"/>
        <ellipse cx="93" cy="33" rx="6"   ry="3"   transform="rotate(20,93,33)"/>
        <ellipse cx="89" cy="37" rx="5.5" ry="2.8" transform="rotate(30,89,37)"/>

        {/* — Centro-direita — */}
        <ellipse cx="99" cy="35" rx="5.5" ry="2.8" transform="rotate(38,99,35)"/>
        <ellipse cx="105" cy="31" rx="6"  ry="3"   transform="rotate(20,105,31)"/>
        <ellipse cx="103" cy="37" rx="5.5" ry="2.8" transform="rotate(55,103,37)"/>
        <ellipse cx="107" cy="33" rx="6"  ry="3"   transform="rotate(30,107,33)"/>
        <ellipse cx="111" cy="40" rx="6"  ry="3"   transform="rotate(45,111,40)"/>

        {/* — Direita interno — */}
        <ellipse cx="97"  cy="51" rx="6"   ry="3"   transform="rotate(30,97,51)"/>
        <ellipse cx="101" cy="47" rx="6"   ry="3"   transform="rotate(15,101,47)"/>
        <ellipse cx="96"  cy="55" rx="6"   ry="3"   transform="rotate(40,96,55)"/>
        <ellipse cx="103" cy="48" rx="6"   ry="3"   transform="rotate(30,103,48)"/>
        <ellipse cx="108" cy="50" rx="6"   ry="3"   transform="rotate(15,108,50)"/>
        <ellipse cx="109" cy="56" rx="6"   ry="3"   transform="rotate(45,109,56)"/>

        {/* — Direita médio — */}
        <ellipse cx="113" cy="46" rx="6"   ry="3"   transform="rotate(20,113,46)"/>
        <ellipse cx="117" cy="43" rx="6.5" ry="3.2" transform="rotate(35,117,43)"/>
        <ellipse cx="112" cy="51" rx="6"   ry="3"   transform="rotate(45,112,51)"/>
        <ellipse cx="119" cy="47" rx="6"   ry="3"   transform="rotate(35,119,47)"/>
        <ellipse cx="124" cy="44" rx="6.5" ry="3.2" transform="rotate(25,124,44)"/>
        <ellipse cx="120" cy="51" rx="6"   ry="3"   transform="rotate(50,120,51)"/>

        {/* — Extremo direito — */}
        <ellipse cx="130" cy="47" rx="6.5" ry="3.2" transform="rotate(45,130,47)"/>
        <ellipse cx="135" cy="44" rx="6.5" ry="3.2" transform="rotate(30,135,44)"/>
        <ellipse cx="130" cy="52" rx="6"   ry="3"   transform="rotate(55,130,52)"/>
        <ellipse cx="138" cy="47" rx="6"   ry="3"   transform="rotate(50,138,47)"/>
        <ellipse cx="144" cy="47" rx="6.5" ry="3.2" transform="rotate(35,144,47)"/>
        <ellipse cx="142" cy="54" rx="6"   ry="3"   transform="rotate(65,142,54)"/>
      </g>

      {/* ═══ CASA ══════════════════════════════════════════════ */}
      <g fill={color}>
        {/* Chaminé/tronco baixo */}
        <rect x="76" y="142" width="8" height="14" rx="1"/>
        {/* Telhado triangular */}
        <path d="M44,164 L80,143 L116,164 Z"/>
        {/* Janela esquerda */}
        <rect x="55" y="152" width="9" height="7" rx="1" fill="white" opacity="0.22"/>
        {/* Janela direita */}
        <rect x="96" y="152" width="9" height="7" rx="1" fill="white" opacity="0.22"/>
        {/* Base do telhado */}
        <rect x="44" y="163" width="72" height="3.5" rx="1"/>
      </g>
    </svg>
  )
}
