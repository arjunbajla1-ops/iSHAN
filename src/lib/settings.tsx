import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type Settings = {
  theme: Theme;
  trail: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleTrail: () => void;
};

const SettingsContext = createContext<Settings | null>(null);

const readTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('ik-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const readTrail = (): boolean => {
  if (typeof window === 'undefined') return true;
  const stored = window.localStorage.getItem('ik-trail');
  if (stored === 'off') return false;
  if (stored === 'on') return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [trail, setTrail] = useState<boolean>(readTrail);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0E0E0E' : '#FAFAF8');
    window.localStorage.setItem('ik-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('ik-trail', trail ? 'on' : 'off');
  }, [trail]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  );
  const toggleTrail = useCallback(() => setTrail((t) => !t), []);

  const value = useMemo(
    () => ({ theme, trail, setTheme, toggleTheme, toggleTrail }),
    [theme, trail, toggleTheme, toggleTrail],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
