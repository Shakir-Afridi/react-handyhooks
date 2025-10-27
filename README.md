# ⚡ React Hookstack

[![license](https://img.shields.io/github/license/Shakir-Afridi/react-handyhooks)](LICENSE)
[![issues](https://img.shields.io/github/issues/Shakir-Afridi/react-handyhooks)](https://github.com/Shakir-Afridi/react-handyhooks/issues)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/React-19+-61dafb?logo=react)](https://react.dev/)

A lightweight and powerful collection of reusable **React hooks** designed to simplify state management, event handling, and UI logic in your React apps.

---

## 🚀 Features

- 🧠 **Smart utilities** — abstract common React logic into reusable hooks  
- 🪶 **Lightweight** — fast, efficient, and easy to integrate
- ⚙️ **TypeScript support** — fully typed API  
- 🧩 **Composable** — integrate easily into existing code  
- 🔧 **Framework agnostic** — works with any React setup (Vite, CRA, Next.js, etc.)

---

📘 Documentation

Comprehensive documentation is available here

👉 [Documentation](https://shakir-afridi.github.io/react-handyhooks/docs)

---

## 📘 Storybook

Explore all hooks interactively on Storybook:  
👉 [Live Demo](https://shakir-afridi.github.io/react-handyhooks/storybook)

## 📦 Installation

Once published to npm:

```bash
npm install react-hookstack
# or
yarn add react-hookstack
```

## If you’re developing locally and want to test it

```bash
# Inside react-hookstack/
npm link

# In your target React project:
npm link react-hookstack
```

## 🧠 Available Hooks

| Hook Name               | Description                                      |
|-------------------------|--------------------------------------------------|
| useArray                | Manage array state easily                        |
| useAsync                | Handle async operations                          |
| useBoolean              | Manage boolean state                             |
| useClickOutside         | Detect clicks outside element                    |
| useClipboardHistory     | Keep track of copied clipboard values            |
| useCookie               | Read and write browser cookies                   |
| useCopyToClipboard      | Copy text to clipboard                           |
| useCounter              | Simple counter hook                              |
| useDarkMode             | Detect dark mode preference                      |
| useDebounce             | Debounce changing values                         |
| useDebouncedCallback    | Debounced function execution                     |
| useDrag                 | Handle drag events                               |
| useEventCallback        | Stable event callback function                   |
| useEventListener        | Attach event listener safely                     |
| useFetch                | Fetch data with state management                 |
| useFocus                | Manage element focus                             |
| useFormState            | Manage form state                                |
| useGeoLocation          | Get user's geographic location                   |
| useHover                | Track hover state                                |
| useIdle                 | Detect user inactivity                           |
| useIndexedDB            | Interact with IndexedDB storage                  |
| useInput                | Manage input value                               |
| useIntersectionObserver | Observe element visibility in viewport           |
| useInterval             | Set up recurring interval                        |
| useLocalStorage         | Sync state with localStorage                     |
| useLongPress            | Detect long press actions                        |
| useMap                  | Manage Map state                                 |
| useMergeState           | Merge object state updates                       |
| useMousePosition        | Track mouse cursor position                      |
| useOnlineStatus         | Detect online/offline status                     |
| usePersistedState       | Persist state in storage                         |
| usePortal               | Render element in React portal                   |
| usePreferredLanguage    | Get user's preferred language                    |
| usePrevious             | Get previous value                               |
| usePreviousDistinct     | Get previous distinct value                      |
| useRafInterval          | Interval synced with requestAnimationFrame       |
| useRafState             | State synced with requestAnimationFrame          |
| useReducerWithLogger    | Reducer with state change logging                |
| useRequestAnimationFrame| Execute function every animation frame           |
| useSSE                  | Handle Server-Sent Events                        |
| useScrollPosition       | Track scroll position                            |
| useSessionStorage       | Sync state with sessionStorage                   |
| useThrottle             | Throttle changing values                         |
| useThrottledCallback    | Throttled function execution                     |
| useTimeout              | Execute callback after delay                     |
| useToggle               | Toggle boolean state                             |
| useToggleSet            | Toggle values in a set                           |
| useURLSearchParams      | Read and update URL search parameters            |
| useUndoRedo             | Undo and redo state changes                      |
| useUpdateEffect         | Run effect except first render                   |
| useVisibilityChange     | Detect page visibility changes                   |
| useWebSocket            | Handle WebSocket connection                      |
| useWhyDidYouUpdate      | Debug component re-renders                       |
| useWindowSize           | Track window size                                |

## 🧩 Example Usage

```bash
import React from "react";
import { useToggle } from "react-hookstack";

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

If you find this library useful, please give it a star ⭐ on [GitHub](https://shakir-afridi.github.io/react-handyhooks/storybook) —
it helps others discover and support the project!

## Keywords

- **react**
- **hooks**
- **react-hooks**
- **custom-hooks**
- **typescript**
- **state-management**
- **utility-hooks**
- **ui-hooks**
- **performance-hooks**
- **browser-hooks**
- **frontend**
- **react-library**

### Hooks

- **useArray**
- **useAsync**
- **useBoolean**
- **useClickOutside**
- **useClipboardHistory**
- **useCookie**
- **useCopyToClipboard**
- **useCounter**
- **useDarkMode**
- **useDebounce**
- **useDebouncedCallback**
- **useDrag**
- **useEventCallback**
- **useEventListener**
- **useFetch**
- **useFocus**
- **useFormState**
- **useGeoLocation**
- **useHover**
- **useIdle**
- **useIndexedDB**
- **useInput**
- **useIntersectionObserver**
- **useInterval**
- **useLocalStorage**
- **useLongPress**
- **useMap**
- **useMergeState**
- **useMousePosition**
- **useOnlineStatus**
- **usePersistedState**
- **usePortal**
- **usePreferredLanguage**
- **usePrevious**
- **usePreviousDistinct**
- **useRafInterval**
- **useRafState**
- **useReducerWithLogger**
- **useRequestAnimationFrame**
- **useSSE**
- **useScrollPosition**
- **useSessionStorage**
- **useThrottle**
- **useThrottledCallback**
- **useTimeout**
- **useToggle**
- **useToggleSet**
- **useURLSearchParams**
- **useUndoRedo**
- **useUpdateEffect**
- **useVisibilityChange**
- **useWebSocket**
- **useWhyDidYouUpdate**
- **useWindowSize**
