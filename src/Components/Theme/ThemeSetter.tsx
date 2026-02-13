const themeScript = `
  (function() {
    try {
      var local = localStorage.getItem('theme');
      var support = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (local === 'dark' || (!local && support)) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {}
  })();
`;

export default function ThemeSetter() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }}></script>;
}
