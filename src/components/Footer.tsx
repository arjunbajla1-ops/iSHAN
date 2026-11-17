import { Link } from 'react-router-dom';
import { ArrowUp, BatIcon, GitHub, Instagram, XSocial, YouTube } from './Icons';
import { Marquee } from './Motion';

export default function Footer() {
  const backToTop = () => {
    window.dispatchEvent(new Event('ik:swing'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <Marquee
        items={['ISHAN KISHAN', '210', 'POCKET DYNAMO', 'NO. 32', 'BY ARJUN']}
        className="marquee--accent"
        seconds={64}
        ariaLabel="Ishan Kishan, 210, pocket dynamo, number 32, by Arjun"
      />
      <div className="wrap">
        <div className="footer__grid" style={{ paddingTop: 'clamp(40px, 5vw, 64px)' }}>
          <div>
            <p className="footer__statement">
              A fan archive,
              <br />
              built with care
              <br />
              in Patna’s shadow.
            </p>
            <p
              className="body-copy"
              style={{ marginTop: 18, fontSize: '0.82rem', maxWidth: '34ch' }}
            >
              Story, data and image on India’s No. 32. Every figure checked
              against ESPNcricinfo and Wikipedia, current to 1 November 2026.
            </p>
          </div>

          <div className="footer__col">
            <h4>Chapters</h4>
            <ul>
              <li>
                <Link to="/biography">02 — Biography</Link>
              </li>
              <li>
                <Link to="/the-210">06 — The 210</Link>
              </li>
              <li>
                <Link to="/ipl">09 — IPL Journey</Link>
              </li>
              <li>
                <Link to="/records">16 — Records</Link>
              </li>
              <li>
                <Link to="/fan-zone">22 — Fan Zone</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Sources</h4>
            <ul>
              <li>
                <a
                  href="https://www.espncricinfo.com/cricketers/ishan-kishan-720471"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ESPNcricinfo
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Ishan_Kishan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <a
                  href="https://www.bcci.tv"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  BCCI
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            Crafted with <span className="accent">♥</span> by Arjun — fan-made,
            not affiliated with BCCI / ICC
          </span>
          <div className="footer__socials">
            <a
              className="icon-btn"
              href="https://www.instagram.com/ishankishan23/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ishan Kishan on Instagram"
            >
              <Instagram />
            </a>
            <a
              className="icon-btn"
              href="https://x.com/BCCI"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="BCCI on X"
            >
              <XSocial />
            </a>
            <a
              className="icon-btn"
              href="https://www.youtube.com/@BCCI"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="BCCI on YouTube"
            >
              <YouTube />
            </a>
            <a
              className="icon-btn"
              href="https://github.com/arjunbajla1-ops"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Arjun on GitHub"
            >
              <GitHub />
            </a>
          </div>
          <button type="button" className="to-top" onClick={backToTop}>
            <BatIcon style={{ width: 12, height: 16 }} />
            Back to top
            <ArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
