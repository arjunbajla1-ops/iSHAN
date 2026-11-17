import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Reveal } from '../components/Motion';
import type { Chapter } from '../data/chapters';
import { chapterList, modules, nextBuiltChapter } from '../data/chapters';

export default function ChapterStub({ chapter }: { chapter: Chapter }) {
  const moduleName = modules.find((m) => m.moduleNo === chapter.module)?.name ?? '';
  const siblings = chapterList.filter((c) => c.module === chapter.module);
  const next = nextBuiltChapter(chapter.slug);
  const complete = chapterList.filter((c) => c.built).length;

  return (
    <div className="stub">
      <div className="wrap stub__inner">
        <div>
          <Reveal>
            <span className="eyebrow">
              <i className="dot" />
              {moduleName} · Chapter {chapter.no} of 22
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="stub__title">{chapter.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="stub__desc">
              {chapter.desc} This page is designed and reserved; its content is
              being verified and set in the next batch of the build.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="hero__actions" style={{ marginTop: 26 }}>
              <Link className="btn btn--accent" to={next.slug}>
                Read chapter {next.no} — {next.navTitle}
                <ArrowRight />
              </Link>
              <Link className="ulink" to="/">
                Back to the index
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="stub__card">
            <h3>In this module</h3>
            <ul className="stub__list">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <span>
                    {sibling.no} — {sibling.title}
                  </span>
                  <span>{sibling.built ? 'Live' : 'Draft'}</span>
                </li>
              ))}
            </ul>
            <div className="progress-mini">
              <i style={{ transform: `scaleX(${complete / chapterList.length})` }} />
            </div>
            <p
              className="body-copy"
              style={{ marginTop: 12, fontSize: '0.72rem', letterSpacing: '0.04em' }}
            >
              Archive progress · {complete} of {chapterList.length} chapters live
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
