import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import BatCursor from './components/BatCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Biography from './pages/Biography';
import The210 from './pages/The210';
import ChapterStub from './pages/ChapterStub';
import NotFound from './pages/NotFound';
import { chapterList } from './data/chapters';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function PageFrame({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.main
      id="main"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: reduced ? 0.2 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <Footer />
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    const chapter = chapterList.find((item) => item.slug === location.pathname);
    document.title = chapter
      ? `${chapter.no} · ${chapter.title} — Ishan Kishan | by Arjun`
      : 'Not found — Ishan Kishan | by Arjun';
  }, [location.pathname]);

  return (
    <>
      <Loader />
      <BatCursor />
      <ScrollProgress />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <PageFrame key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/biography" element={<Biography />} />
            <Route path="/the-210" element={<The210 />} />
            {chapterList
              .filter((chapter) => !chapter.built)
              .map((chapter) => (
                <Route
                  key={chapter.slug}
                  path={chapter.slug}
                  element={<ChapterStub chapter={chapter} />}
                />
              ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageFrame>
      </AnimatePresence>
    </>
  );
}
