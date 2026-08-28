const STUDENTS: [number, number][] = [
  [70, 70], [55, 140], [95, 200], [60, 260], [110, 320], [75, 380],
];
const BUSINESSES: [number, number][] = [
  [420, 90], [450, 160], [410, 230], [455, 300], [415, 360],
];
const MATCHES: [number, number][] = [
  [0, 0], [1, 1], [2, 1], [3, 3], [4, 3], [5, 4], [2, 2], [0, 2],
];

export function StairsLifeVisual() {
  return (
    <svg
      className="visualSvg"
      viewBox="0 0 500 440"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Abstract diagram representing StairsLife matching students with small businesses"
      style={{ width: "100%", height: "100%" }}
    >
      <g style={{ stroke: "var(--color-accent-text)", opacity: 0.32 }} strokeWidth={1}>
        {MATCHES.map(([a, b], i) => (
          <line
            key={i}
            x1={STUDENTS[a][0]}
            y1={STUDENTS[a][1]}
            x2={BUSINESSES[b][0]}
            y2={BUSINESSES[b][1]}
          />
        ))}
      </g>

      <g style={{ fill: "var(--color-ink-soft)" }}>
        {STUDENTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 6 : 4} />
        ))}
      </g>

      <g style={{ fill: "var(--color-accent)" }}>
        {BUSINESSES.map(([x, y], i) => (
          <rect key={i} x={x - 5} y={y - 5} width={10} height={10} rx={2} />
        ))}
      </g>

      <text
        x="70"
        y="30"
        style={{
          font: "500 11px var(--font-mono)",
          letterSpacing: "0.16em",
          fill: "var(--color-ink-faint)",
        }}
      >
        STUDENTS
      </text>
      <text
        x="392"
        y="55"
        style={{
          font: "500 11px var(--font-mono)",
          letterSpacing: "0.16em",
          fill: "var(--color-ink-faint)",
        }}
      >
        UMKM
      </text>
    </svg>
  );
}
