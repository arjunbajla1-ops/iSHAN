import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PageHead from '../components/PageHead';
import { ImageReveal, Reveal } from '../components/Motion';
import { ArrowRight } from '../components/Icons';
import { profile, timeline } from '../data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Biography() {
  const reduced = useReducedMotion();

  return (
    <div className="page">
      <PageHead
        number="02"
        module="Core & Story"
        title="Biography"
        tags={['Patna · 1998', 'Left-hand bat', 'No. 32']}
        lede="Patna to Jharkhand, a Ranji record at eighteen, seven seasons in Mumbai, and a wicketkeeping gloves-and-bat story that arrived in India colours in 2021. The short version: he was always in a hurry."
        note={
          <>
            <b>Verified</b>
            Career figures checked against ESPNcricinfo and Wikipedia,
            current to 1 November 2026.
          </>
        }
      />

      <section className="wrap bio-intro">
        <figure className="bio-portrait">
          <div className="bio-portrait__frame">
            <ImageReveal
              src="/images/ishan-nets.jpg"
              alt="Ishan Kishan lofting a shot in the nets, wearing India blue"
              objectPosition="50% 20%"
              priority
            />
          </div>
          <figcaption>
            <span>The short-arm pull · Practice, 2026</span>
            <span>Frame 002</span>
          </figcaption>
        </figure>

        <div>
          <Reveal>
            <span className="marker">
              <span>01</span>
              <span>The profile</span>
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-md" style={{ marginTop: 16 }}>
              Five foot six.
              <br />
              No backward step.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 22 }}>
              <p className="body-copy">
                Ishan Pranav Kumar Pandey Kishan was born in Patna on 18 July
                1998. His family’s village is Goridiha, in the Daudnagar block of
                Aurangabad district; his father, Pranav Kumar Pandey, is a
                builder. The cricket came early and the geography came with it —
                registration friction between Bihar and the BCCI sent a teenage
                Kishan across the state line to Jharkhand, where he has played
                ever since.
              </p>
              <p className="body-copy">
                He keeps wicket, bats left-handed, bowls the occasional leg break
                or off break, and wears <strong>No. 32</strong> for India. What
                the numbers do not show is the method: he stands deep in the
                crease, uses the crease’s full width, and hits the ball in front
                of square from the first over — a strike-rate-first batter with a
                wicketkeeper’s eye for angles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="facts">
              {[
                ['Full name', profile.fullName],
                ['Born', `${profile.born} — ${profile.birthplace}`],
                ['Family', `${profile.father}; mother ${profile.mother}`],
                ['Height', profile.height],
                ['Role', `${profile.role} · ${profile.batting}`],
                ['Bowling', profile.bowling],
                ['Jersey', `${profile.jersey} (India, IPL)`],
                ['Teams', profile.teams],
              ].map(([label, value]) => (
                <div className="fact" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- timeline */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="split" style={{ alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 32px)' }}>
            <Reveal>
              <span className="marker">
                <span>02</span>
                <span>The timeline</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg" style={{ marginTop: 16 }}>
                Twelve
                <br />
                turning
                <br />
                points.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-copy" style={{ marginTop: 18, maxWidth: '30ch', fontSize: '0.85rem' }}>
                From a state switch in 2013 to a world title in 2026. Scroll the
                line.
              </p>
            </Reveal>
          </div>

          <div className="timeline">
            {timeline.map((entry, index) => (
              <motion.article
                className="timeline__item"
                key={`${entry.year}-${entry.title}`}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
                transition={{ duration: 0.85, delay: index < 2 ? index * 0.08 : 0, ease: EASE }}
              >
                <span className="timeline__dot" aria-hidden="true">
                  <motion.i
                    className="timeline__dot-inner"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </span>
                <span className="timeline__year">{entry.year}</span>
                <div className="timeline__body">
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                  {entry.tag ? <span className="tag timeline__tag">{entry.tag}</span> : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- pause */}
      <section className="wrap">
        <div className="pause-block">
          <div>
            <Reveal>
              <span className="marker">
                <span>03</span>
                <span>The pause</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-md" style={{ marginTop: 16 }}>
                The year he
                <br />
                stepped away.
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.08}>
              <p className="body-copy">
                In late 2023, after a World Cup final and a run of warm benches,
                Kishan took a break from the game. He has since described that
                period as <strong>“depressing”</strong> — the specific fatigue of
                performing and still not playing — and credits a turn to
                spirituality, and specifically the Bhagavad Gita, with helping him
                rebuild. His father has spoken publicly about how low he had
                been.
              </p>
              <p className="body-copy">
                He came back to domestic cricket, was made Jharkhand captain in
                October 2024, and rebuilt the white-ball innings from the ground
                up. The archive records this without euphemism: the pause is part
                of the career, not an interruption to it.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <blockquote className="pause-block__quote" style={{ marginTop: 28 }}>
                “depressing”
                <span>Ishan Kishan, on the 2023 period</span>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- beyond */}
      <section className="wrap section">
        <div className="thesis">
          <Reveal>
            <span className="marker">
              <span>04</span>
              <span>Beyond the gloves</span>
            </span>
          </Reveal>
          <div>
            <Reveal delay={0.05}>
              <h2 className="h-md">Patna, still.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ marginTop: 20, display: 'grid', gap: 20 }}>
                <p className="body-copy">
                  He is a builder’s son who became a record-holder, and the two
                  facts sit close together in how he talks about the game. Family
                  is public and constant: his parents are at the centre of the
                  story, and the village in Aurangabad district is where the
                  archive begins.
                </p>
                <p className="body-copy">
                  In 2025 he signed a short-term Nottinghamshire contract and made
                  87 on debut at Trent Bridge, taking a catch off his first ball
                  behind the stumps. In 2026 he won a T20 World Cup, led Jharkhand
                  to a first Syed Mushtaq Ali Trophy, and ended a three-year wait
                  for an ODI hundred with 125 from 79 balls in Lucknow. The full
                  record lives in the chapters ahead.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="closing" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
          <Reveal>
            <p className="closing__text">
              Next: the innings that changed the record book.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="btn btn--accent" to="/the-210">
              Chapter 06 — The 210
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
