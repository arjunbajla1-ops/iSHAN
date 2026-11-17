import { motion, useReducedMotion } from 'framer-motion';
import { milestones, progression } from '../data/content';

const W = 780;
const H = 320;
const PAD = { top: 30, right: 24, bottom: 40, left: 44 };

const maxBalls = 131;
const maxRuns = 210;

const x = (balls: number) =>
  PAD.left + (balls / maxBalls) * (W - PAD.left - PAD.right);
const y = (runs: number) =>
  H - PAD.bottom - (runs / maxRuns) * (H - PAD.top - PAD.bottom);

/** Catmull-Rom → cubic Bezier, so the line breathes without lying too much. */
const smoothPath = (points: Array<[number, number]>) => {
  if (points.length < 2) return '';
  let d = `M ${x(points[0][0]).toFixed(1)} ${y(points[0][1]).toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = x(p1[0]) + (x(p2[0]) - x(p0[0])) / 6;
    const c1y = y(p1[1]) + (y(p2[1]) - y(p0[1])) / 6;
    const c2x = x(p2[0]) - (x(p3[0]) - x(p1[0])) / 6;
    const c2y = y(p2[1]) - (y(p3[1]) - y(p1[1])) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x(p2[0]).toFixed(1)} ${y(p2[1]).toFixed(1)}`;
  }
  return d;
};

const linePath = smoothPath(progression);
const areaPath = `${linePath} L ${x(maxBalls).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

const yTicks = [0, 50, 100, 150, 200];
const xTicks = [0, 25, 50, 75, 100, 125];

export default function ProgressionChart() {
  const reduced = useReducedMotion();

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Cumulative runs by ball faced: 50 off 49 balls, 100 off 85, 150 off 103, 200 off 126, out for 210 off 131."
    >
      {/* horizontal grid */}
      {yTicks.map((tick) => (
        <g key={`y-${tick}`}>
          <line
            className="chart__grid"
            x1={PAD.left}
            x2={W - PAD.right}
            y1={y(tick)}
            y2={y(tick)}
          />
          <text className="chart__axis" x={PAD.left - 10} y={y(tick) + 3} textAnchor="end">
            {tick}
          </text>
        </g>
      ))}

      {/* vertical grid */}
      {xTicks.map((tick) => (
        <g key={`x-${tick}`}>
          <line
            className="chart__grid"
            x1={x(tick)}
            x2={x(tick)}
            y1={PAD.top}
            y2={H - PAD.bottom}
            strokeDasharray="2 5"
            opacity={0.7}
          />
          <text
            className="chart__sub"
            x={x(tick)}
            y={H - PAD.bottom + 18}
            textAnchor="middle"
          >
            {tick}
          </text>
        </g>
      ))}
      <text
        className="chart__sub"
        x={W - PAD.right}
        y={H - PAD.bottom + 32}
        textAnchor="end"
      >
        balls faced
      </text>

      {/* area */}
      <motion.path
        className="chart__area"
        d={areaPath}
        initial={reduced ? { opacity: 0.055 } : { opacity: 0 }}
        whileInView={{ opacity: 0.055 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.9 }}
      />

      {/* the innings */}
      <motion.path
        className="chart__path"
        d={linePath}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* milestones */}
      {milestones.map((milestone, index) => {
        const cx = x(milestone.balls);
        const cy = y(milestone.runs);
        const anchor = cx > W - 120 ? 'end' : cx < 90 ? 'start' : 'middle';
        return (
          <motion.g
            key={milestone.runs}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.75 + index * 0.42 }}
          >
            <circle className="chart__dot chart__dot--solid" cx={cx} cy={cy} r="3.6" />
            <circle
              cx={cx}
              cy={cy}
              r="8"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.18"
            />
            <text
              className="chart__label"
              x={cx}
              y={cy - 15}
              textAnchor={anchor}
              style={{ fontWeight: 500 }}
            >
              {milestone.runs}
            </text>
            <text
              className="chart__sub"
              x={cx}
              y={cy - 5}
              textAnchor={anchor}
            >
              {milestone.balls} balls
            </text>
          </motion.g>
        );
      })}

      {/* end of innings */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <circle className="chart__dot" cx={x(131)} cy={y(210)} r="4" />
        <text
          className="chart__label"
          x={x(131)}
          y={y(210) - 14}
          textAnchor="end"
          style={{ fontSize: 11, fontWeight: 500 }}
        >
          210
        </text>
        <text className="chart__sub" x={x(131)} y={y(210) - 4} textAnchor="end">
          out, 36th over
        </text>
      </motion.g>
    </svg>
  );
}
