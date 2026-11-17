import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  CharReveal,
  Counter,
  ImageReveal,
  Marquee,
  Reveal,
  Stagger,
  StaggerItem,
} from '../components/Motion';
import { ArrowDown, ArrowRight } from '../components/Icons';
import { chapterList, modules } from '../data/chapters';
import { heroStats } from '../data/content';

const entryDelay = () => {
  if (typeof window === 'undefined') return 0;
  return window.sessionStorage.getItem('ik-loaded') === 'true' ? 0.05 : 0.3;
};

export default function Home() {
  const reduced = useReducedMotion();
  const enter = reduced ? 0 : entryDelay();
  const bandRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <div className="home">
      {/* ---------------------------------------------------------------- hero */}
      <section className="hero">
        <div className="hero__grid wrap">
          <div className="hero__copy">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: enter, ease: [0.16, 1, 0.3, 1] }}
            >
              <i className="dot" />
              Fan archive · India No. 32
            </motion.span>

            <h1 className="hero__title h-xl display">
              <span className="line">
                <CharReveal text="Ishan" delay={enter + 0.05} />
              </span>
              <span className="line">
                <CharReveal text="Kishan" delay={enter + 0.18} />
              </span>
            </h1>

            <Reveal delay={enter + 0.55} y={16}>
              <p className="hero__sub">
                The Pocket Dynamo — <em>a fan archive by Arjun.</em> Twenty-two
                chapters on the wicketkeeper from Patna who made 210 in
                Chattogram.
              </p>
            </Reveal>

            <Reveal delay={enter + 0.65} y={14}>
              <div className="hero__meta">
                <span>Patna, 1998</span>
                <span>Wicketkeeper · LHB</span>
                <span>5 ft 6 in</span>
              </div>
            </Reveal>

            <Reveal delay={enter + 0.75} y={14}>
              <div className="hero__actions">
                <Link className="btn btn--accent" to="/biography">
                  Begin the story
                  <ArrowRight />
                </Link>
                <Link className="ulink" to="/the-210">
                  Jump to the 210
                </Link>
              </div>
            </Reveal>
          </div>

          <figure className="hero__figure">
            <div className="hero__portrait">
              <span className="hero__stamp">
                <i />
                Frame 001
              </span>
              <ImageReveal
                src="/images/ishan-hero.webp"
                alt="Ishan Kishan batting for India in blue, mid-shot, during the 2026 T20 World Cup"
                objectPosition="56% 32%"
                priority
                delay={enter + 0.15}
                className="hero__portrait-inner"
              />
            </div>
            <motion.figcaption
              className="hero__caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: enter + 0.9 }}
            >
              <span>India vs Namibia · T20 World Cup, 2026</span>
              <span>No. 32</span>
            </motion.figcaption>
          </figure>
        </div>

        <div className="wrap">
          <div className="hero__scroll">
            <ArrowDown />
            Scroll — the archive begins below
          </div>
        </div>

        <Marquee
          items={['ISHAN KISHAN', '210', 'POCKET DYNAMO', 'JHARKHAND', 'NO. 32']}
          seconds={52}
          ariaLabel="Ishan Kishan, 210, Pocket Dynamo, Jharkhand, number 32"
        />
      </section>

      {/* ------------------------------------------------------------- thesis */}
      <section className="section wrap">
        <div className="thesis">
          <Reveal>
            <span className="marker">
              <span>01</span>
              <span>The thesis</span>
            </span>
          </Reveal>
          <div>
            <Reveal delay={0.05}>
              <h2 className="thesis__text">
                A pocket-sized hurricane from Patna who turned a maiden ODI
                hundred into <span className="u">210</span> — and made the record
                book a footnote.
              </h2>
            </Reveal>
            <div className="thesis__aside" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
              <Reveal delay={0.15}>
                <p>
                  This is not a highlight reel. It is an archive: the state
                  switch to Jharkhand, a Ranji 273 at eighteen, seven years in
                  Mumbai, a world title in 2026, and the quieter year in between
                  that he has spoken about with unusual honesty.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p>
                  Every number here is checked against ESPNcricinfo and
                  Wikipedia, current to 1 November 2026. Where a record has since
                  been broken, the archive says so.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- stat counters */}
      <section className="wrap" aria-label="Featured statistics">
        <div className="stats-band">
          {heroStats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat__value num">
                <Counter value={stat.value} />
                <sup>{stat.sup}</sup>
              </div>
              <div className="stat__label">{stat.label}</div>
              <p className="stat__note">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- chapter index */}
      <section className="section wrap">
        <div className="index__head">
          <div>
            <Reveal>
              <span className="marker">
                <span>02</span>
                <span>The archive</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-md" style={{ marginTop: 18 }}>
                Twenty-two chapters,
                <br />
                in four movements.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="body-copy" style={{ maxWidth: '32ch', fontSize: '0.86rem' }}>
              Story, career, data, media. Open the index from any page, or walk
              the chapters in order.
            </p>
          </Reveal>
        </div>

        <div>
          {modules.map((module) => (
            <div className="index__module" key={module.moduleNo}>
              <div className="index__module-head">
                <span>{module.no}</span>
                <h3>{module.name}</h3>
              </div>
              <Stagger>
                {chapterList
                  .filter((chapter) => chapter.module === module.moduleNo)
                  .map((chapter) => (
                    <StaggerItem key={chapter.slug}>
                      <Link
                        to={chapter.slug}
                        className="index__row"
                        data-soon={!chapter.built}
                      >
                        <span className="index__no">{chapter.no}</span>
                        <span className="index__title">{chapter.title}</span>
                        <span className="index__desc">
                          {chapter.built ? chapter.desc : `${chapter.desc} · soon`}
                        </span>
                        <ArrowRight className="index__arrow" />
                      </Link>
                    </StaggerItem>
                  ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ feature fragment */}
      <Link className="feature-band" to="/the-210" ref={bandRef} aria-label="Chapter 06 — The 210">
        <div className="feature-band__media">
          <motion.img
            src="/images/ishan-srh.webp"
            alt="Ishan Kishan batting in Sunrisers Hyderabad colours"
            loading="lazy"
            decoding="async"
            style={reduced ? undefined : { y: bandY, scale: 1.16 }}
          />
        </div>
        <div className="feature-band__content wrap" style={{ paddingInline: 'var(--gutter)' }}>
          <p className="feature-band__note">
            Youngest man ever to score an ODI double century. Twenty-four years,
            145 days.
          </p>
          <p className="feature-band__meta">
            Chattogram · 10.12.2022
            <br />
            210 from 131 balls
          </p>
        </div>
      </Link>

      {/* ------------------------------------------------------------- closing */}
      <section className="section wrap">
        <div className="closing">
          <Reveal>
            <p className="closing__text">
              Start at the beginning: a boy in Patna, and a state line he had to
              cross.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="btn" to="/biography">
              Chapter 02 — Biography
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
        <p
          className="body-copy"
          style={{ marginTop: 36, maxWidth: '52ch', fontSize: '0.78rem' }}
        >
          A note on images: photographs in this archive are gathered from public
          editorial sources for fan, non-commercial use. Rights remain with their
          photographers and publishers.
        </p>
      </section>
    </div>
  );
}
