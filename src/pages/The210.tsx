import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import ProgressionChart from '../components/ProgressionChart';
import { Reveal, Stagger, StaggerItem } from '../components/Motion';
import { ArrowRight, Info } from '../components/Icons';
import { knockFacts, milestones, records } from '../data/content';

export default function The210() {
  return (
    <div className="page">
      <PageHead
        number="06"
        module="Career · ODI"
        title="The 210"
        tags={['Chattogram', '10.12.2022']}
        lede="He was in the side because Rohit Sharma was injured. By the 36th over he had 210 from 131 balls, the fastest double century in the history of ODI cricket, and the youngest one ever made. India finished on 409 and won by 227."
        note={
          <>
            <b>Innings</b>
            210 (131) · 24 fours · 10 sixes · SR 160.31
            <br />
            Player of the Match
          </>
        }
      />

      <section className="wrap">
        <div className="knock-hero">
          <div>
            <Reveal>
              <span className="eyebrow eyebrow--accent">
                <i className="dot" />
                3rd ODI · Bangladesh vs India
              </span>
            </Reveal>
            <div className="knock-hero__num display">
              210<sup>runs</sup>
            </div>
          </div>
          <Reveal delay={0.08}>
            <div className="knock-hero__meta">
              {knockFacts.slice(0, 6).map((fact) => (
                <div className="knock-hero__row" key={fact.label}>
                  <span>{fact.label}</span>
                  <span>{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- shape */}
      <section className="section wrap" style={{ paddingTop: 'clamp(40px, 5vw, 72px)' }}>
        <div className="index__head">
          <div>
            <Reveal>
              <span className="marker">
                <span>01</span>
                <span>The shape of it</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-md" style={{ marginTop: 16 }}>
                Patient for 49 balls.
                <br />
                Merciless for 82.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="body-copy" style={{ maxWidth: '34ch', fontSize: '0.86rem' }}>
              A first fifty in 49 balls, a maiden hundred in 85, then 110 runs
              from the next 46. The curve bends exactly where you would want it
              to.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="chart-card">
            <div className="chart-head">
              <h3>Cumulative runs, ball by ball</h3>
              <span>Chattogram · 10 December 2022</span>
            </div>
            <div className="chart-wrap">
              <ProgressionChart />
            </div>
            <p className="chart-caption">
              The curve is reconstructed from the verified milestone splits — 50
              off 49, 100 off 85, 150 off 103, 200 off 126, out for 210 off 131.
              Intermediate points are interpolated to show tempo, not a
              ball-by-ball record.
            </p>
          </div>
        </Reveal>

        <div className="milestones">
          {milestones.map((milestone, index) => (
            <div className="milestone" key={milestone.runs}>
              <span className="milestone__run">
                {milestone.runs}
                <span style={{ fontSize: '0.35em', letterSpacing: '0.1em', marginLeft: 4 }}>
                  RUNS
                </span>
              </span>
              <span className="milestone__balls">
                {milestone.balls} balls · {milestone.label}
              </span>
              <p className="milestone__note">{milestone.note}</p>
              <span
                className="tag"
                style={{ alignSelf: 'flex-start', marginTop: 8 }}
              >
                {index === 3 ? 'World record at the time' : `Ball ${milestone.balls}`}
              </span>
            </div>
          ))}
        </div>

        <div className="data-note">
          <Info />
          <span>
            Two hundred in 126 balls was the fastest in men’s ODIs when he made
            it. In 2026 Shubman Gill and Harry Brook each went past that mark, so
            this archive lists the record as held from December 2022 to 2026
            rather than claiming it today.
          </span>
        </div>
      </section>

      {/* ------------------------------------------------------------ records */}
      <section className="section wrap" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="index__head">
          <div>
            <Reveal>
              <span className="marker">
                <span>02</span>
                <span>What fell with it</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-md" style={{ marginTop: 16 }}>
                Seven lines
                <br />
                in the book.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="body-copy" style={{ maxWidth: '32ch', fontSize: '0.86rem' }}>
              The innings rewrote records that had stood for years, and created a
              few that had never existed.
            </p>
          </Reveal>
        </div>

        <Stagger className="records">
          {records.map((record, index) => (
            <StaggerItem key={record.title}>
              <div className="record">
                <span className="record__no">{String(index + 1).padStart(2, '0')}</span>
                <span className="record__title">{record.title}</span>
                <span className="record__detail">{record.detail}</span>
                <span className="record__status" data-status={record.status}>
                  {record.statusLabel}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------------------------------------------------------- scorecard */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="split" style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
          <div>
            <Reveal>
              <span className="marker">
                <span>03</span>
                <span>The match</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-md" style={{ marginTop: 16 }}>
                A 290-run stand,
                <br />
                and a 227-run win.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="body-copy">
              Kishan and Virat Kohli put on 290 for the second wicket at better
              than a run a ball. Kohli made 113 from 91 — his first ODI hundred
              since 2019 — while Kishan kept accelerating. Bangladesh were bowled
              out for 182 inside 35 overs.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="scorecard-strip">
            <div>
              <span className="mini-stat__value">409/8</span>
              <span className="mini-stat__label">India · 50 overs</span>
              <span className="mini-stat__note">
                Kishan 210 (131), Kohli 113 (91), Washington Sundar 37 (27)
              </span>
            </div>
            <div>
              <span className="mini-stat__value">182</span>
              <span className="mini-stat__label">Bangladesh · 34 overs</span>
              <span className="mini-stat__note">
                India won by 227 runs — the largest margin of the series
              </span>
            </div>
            <div>
              <span className="mini-stat__value">290</span>
              <span className="mini-stat__label">2nd-wicket partnership</span>
              <span className="mini-stat__note">
                Kishan and Kohli, the platform for everything after
              </span>
            </div>
          </div>
        </Reveal>

        <div className="closing" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
          <Reveal>
            <p className="closing__text">
              Next: the phase-by-phase T20I file.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="btn" to="/t20i">
              Chapter 07 — T20I Hub
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
