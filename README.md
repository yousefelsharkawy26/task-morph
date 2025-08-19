## 📂 Project Structure

```plaintext
D:.
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts

📂 public
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt

📂 src
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   │
│   ├── 📂 components
│   │   ├── AddTaskForm.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── TaskBoard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskColumn.tsx
│   │   ├── TaskDetailsDialog.tsx
│   │   ├── ThemeToggle.tsx
│   │   │
│   │   └── 📂 ui
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── table.tsx
│   │       └── ...
│   │
│   ├── 📂 hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useTheme.ts
│   │
│   ├── 📂 lib
│   │   └── utils.ts
│   │
│   └── 📂 pages
│       ├── Index.tsx
│       └── NotFound.tsx
