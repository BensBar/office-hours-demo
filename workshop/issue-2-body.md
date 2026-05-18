# Add dark mode toggle in header

Users want a dark mode for the TODO app. Add a toggle in the header that switches between light and dark themes.

## Acceptance criteria

- A toggle (button or switch) appears in `src/Header.jsx`, on the right side of the nav
- Clicking it flips the app between light and dark themes
- Use the existing `ThemeContext` in `src/ThemeContext.jsx` — do not introduce a new state store
- Theme choice persists across page reloads (localStorage is fine)
- Dark mode updates the CSS variables in `src/index.css` (`--bg`, `--fg`, `--muted`, `--accent`)
- The toggle has an accessible label and works with keyboard

## Notes

- `ThemeProvider` is defined but not yet wired into the app — you'll need to wrap `<App />` with it in `src/main.jsx`.
- Use `prefers-color-scheme` as the initial default if no choice is saved.

> **Workshop note:** this issue is intended to be assigned to Copilot coding agent during Catalyst 2.0 Session 1, Lab 2.
