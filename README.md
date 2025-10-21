# ⚡ React Hookstack

[![build](https://img.shields.io/github/actions/workflow/status/Shakir-Afridi/react-handyhooks/.github/workflows/public.yml?branch=dev)](https://github.com/Shakir-Afridi/react-handyhooks/actions)
[![license](https://img.shields.io/github/license/Shakir-Afridi/react-handyhooks)](LICENSE)
[![issues](https://img.shields.io/github/issues/Shakir-Afridi/react-handyhooks)](https://github.com/Shakir-Afridi/react-handyhooks/issues)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/React-19+-61dafb?logo=react)](https://react.dev/)
![Coverage](https://img.shields.io/badge/Coverage-93%25-brightgreen)

A lightweight and powerful collection of reusable **React hooks** designed to simplify state management, event handling, and UI logic in your React apps.

---

## 🚀 Features

- 🧠 **Smart utilities** — abstract common React logic into reusable hooks  
- 🪶 **Lightweight** — zero external dependencies  
- ⚙️ **TypeScript support** — fully typed API  
- 🧩 **Composable** — integrate easily into existing code  
- 🔧 **Framework agnostic** — works with any React setup (Vite, CRA, Next.js, etc.)

---

## 📘 Storybook

Explore all hooks interactively on Storybook:  
👉 [Live Demo](https://shakir-afridi.github.io/react-handyhooks/)

## 📦 Installation

Once published to npm:

```bash
npm install react-handyhooks
# or
yarn add react-handyhooks
```

## If you’re developing locally and want to test it

```bash
# Inside react-handyhooks/
npm link

# In your target React project:
npm link react-handyhooks
```

## 🧠 Available Hooks

| Hook Name               | Description                        |
|-------------------------|------------------------------------|
| useArray                | Manage array state easily          |
| useAsync                | Handle async operations            |
| useBoolean              | Manage boolean state               |
| useClickOutside         | Detect clicks outside element      |
| useCopyToClipboard      | Copy text to clipboard             |
| useCounter              | Simple counter hook                |
| useDarkMode             | Detect dark mode preference        |
| useDebounce             | Debounce changing values           |
| useDeviceOrientation    | Track device orientation           |
| useEventListener        | Attach event listener safely       |
| useFocus                | Manage element focus               |
| useFormState            | Manage form state                  |
| useHover                | Track hover state                  |
| useInput                | Manage input value                 |
| useInterval             | Set up recurring interval          |
| useLocalStorage         | Sync state with localStorage       |
| useMap                  | Manage Map state                   |
| useMediaQuery           | Listen to CSS media query          |
| useOnlineStatus         | Detect online/offline status       |
| usePrevious             | Get previous value                 |
| useRafState             | State synced with requestAnimationFrame |
| useSessionStorage       | Sync state with sessionStorage     |
| useThrottle             | Throttle changing values           |
| useTimeout              | Execute callback after delay       |
| useToggle               | Toggle boolean state               |
| useUpdateEffect         | Run effect except first render     |
| useWindowSize           | Track window size                  |

## 🧩 Example Usage

```bash
import React from "react";
import { useToggle } from "react-handyhooks";

export const Example = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? "Hide" : "Show"} Details
      </button>

      {isOpen && <p>Here are the details...</p>}
    </div>
  );
};
```

## Development

```bash
git clone https://github.com/Shakir-Afridi/react-handyhooks.git
cd react-handyhooks
npm install
```

## Start development mode

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## To test it in another project locally

```bash
npm link
# then in your test project:
npm link react-handyhooks
```

## 🧾 License

This project is licensed under the [MIT License](./LICENSE).

## 💡 Contributing

Contributions are welcome!
If you’d like to add new hooks or fix bugs, please open an issue or submit a pull request.

```bash
# Fork & clone
git clone https://github.com/Shakir-Afridi/react-handyhooks.git

# Create a feature branch
git checkout -b feature/my-new-hook

# Commit changes
git commit -m "feat: add useXYZ hook"

# Push & open PR
git push origin feature/my-new-hook
```

## 👨‍💻 Author

React Hookstack — maintained by passionate open-source developers who believe in clean, reusable React logic

## ⭐ Support

If you find this library useful, please give it a star ⭐ on GitHub —
it helps others discover and support the project!
