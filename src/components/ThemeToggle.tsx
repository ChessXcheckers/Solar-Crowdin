
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-gold-500/20 flex items-center justify-center">
        <div className="w-5 h-5 bg-brand-gold-500/20 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="
        w-10 h-10 rounded-lg bg-brand-surface border border-brand-gold-500/20 
        flex items-center justify-center transition-all duration-300 
        hover:bg-brand-gold-500/10 hover:border-brand-gold-500/40
        hover:scale-105 active:scale-95
      "
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-brand-gold-500 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Moon className="w-5 h-5 text-brand-gold-500 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
