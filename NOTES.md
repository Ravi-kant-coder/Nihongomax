Frontend Structure and conventions

Frontend/
├── app/ # App Router layout and routes
│ └── layout.tsx
│ └── page.tsx
├── components/ # Reusable UI components
│ └── ui/
│ └── layout/
│ └── Wall.tsx
├── features/ # Feature-based folders (auth, feed, etc.)
│ └── auth/
│ └── AuthForm.tsx
├── hooks/ # Custom React hooks
│ └── useUser.ts
├── lib/ # Utilities, helpers, DB client
│ └── db.ts
│ └── formatDate.ts
├── context/ # React context providers
│ └── ThemeContext.tsx
├── public/ # Static assets (served from root URL)
│ └── japanese.svg
├── styles/ # Global styles and Tailwind setup
│ └── globals.css
├── types/ # TypeScript interfaces and types
│ └── user.d.ts
├── middleware.ts # Next.js middleware
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── next.config.js
└── NOTES.md # You're reading it!

---

## 🧱 Naming Conventions

- ✅ **Folders:** kebab-case (`dark-mode-toggle`)
- ✅ **Component files:** PascalCase (`Wall.tsx`, `ThemeToggle.tsx`)
- ✅ **Helper functions and hooks:** camelCase (`formatDate.ts`, `useUser.ts`)
- ✅ **MongoDB collections:** snake_case (`user_posts`)
- ✅ **Routes:** folder-based routing in `app/`

---

## 🧰 Tech Stack Decisions

- **Next.js** with App Router
- **Tailwind CSS** for styling (`darkMode: 'class'`)
- **next-themes** for dark/light theme management
- **MongoDB** as the database
- **Mongoose** for MongoDB schema management
- **WebSockets** for real-time updates (e.g., Wall feed)
- **ShadCN UI** for ready-to-use UI components
- **Lucide React** for icons
- **Framer Motion** for animations
- **Bcrypt** for password hashing
- **dotenv** for managing environment variables

---

## 💡 UI/UX Design Principles

- "📘 One Class per Page" structure
- Facebook-like **real-time feed (Wall)** with infinite scroll
- Responsive layout with Tailwind breakpoints
- Theme toggle (dark/light) with persistence
- Easy-to-read Japanese content layout
- Clean animations using Framer Motion

---

## 🧪 Development Notes

- `@/` alias maps to `Frontend/*` (set in `jsconfig.json`)
- Images from `public/` should be used with `/filename.svg` (not via `@/public`)
- Keep global styles in `styles/globals.css`
- Use `useEffect()` to avoid hydration mismatches in client-only features

---

## 📝 To-Do List

- [ ] Add fallback image in `Wall.tsx` if `mediaURL` is missing
- [ ] Implement auth context for global user state
- [ ] Add loading skeletons for better UX
- [ ] Handle 404 routes in `app/not-found.tsx`
- [ ] Set up environment variable checker

---

## 🔗 Useful References

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [next-themes Docs](https://github.com/pacocoursey/next-themes)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [MongoDB Change Streams](https://www.mongodb.com/docs/manual/changeStreams/)
- [Next.js App Router Docs](https://nextjs.org/docs/app)

---

## ✍️ Notes Section

Use this section to jot down any ideas, bug observations, or naming questions.
