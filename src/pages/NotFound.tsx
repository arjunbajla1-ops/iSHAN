import { Link } from 'react-router-dom';
import { BatIcon } from '../components/Icons';

export default function NotFound() {
  return (
    <div className="stub">
      <div className="wrap stub__inner">
        <div>
          <span className="eyebrow">
            <i className="dot" />
            Off the edge
          </span>
          <h1 className="stub__title">404</h1>
          <p className="stub__desc">
            This ball went somewhere else. The archive is intact — start again
            from the top.
          </p>
          <div className="hero__actions" style={{ marginTop: 26 }}>
            <Link className="btn" to="/">
              Return home
            </Link>
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center', color: 'var(--line-strong)' }}>
          <BatIcon style={{ width: 120, height: 170, transform: 'rotate(18deg)' }} />
        </div>
      </div>
    </div>
  );
}
