---
title: useFocus
outline: deep
---

# useFocus

A React hook for managing focus state and programmatically focusing or blurring an element.

---

## ✨ Overview

`useFocus` provides imperative methods to focus or blur an element, and tracks its focus state.

---

## 📦 Import

```tsx
import { useFocus } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useFocus } from 'react-hookstack';

function Example() {
  const { ref, focus, blur, isFocused } = useFocus<HTMLInputElement>();

  return (
    <div>
      <input ref={ref} placeholder="Focus me" />
      <button onClick={focus}>Focus</button>
      <button onClick={blur}>Blur</button>
      <p>{isFocused ? "Focused" : "Not Focused"}</p>
    </div>
  );
}
```

## 🧩 API Reference

`useFocus<T>(): { ref, focus, blur, isFocused }`

### Returns

| Property    | Type                       | Description                    |
| ----------- | -------------------------- | ------------------------------ |
| `ref`       | `React.RefObject<T>`       | Attach to target element.      |
| `focus`     | `() => void`               | Focus the element.             |
| `blur`      | `() => void`               | Blur the element.              |
| `isFocused` | `boolean`                  | True if element is focused.    |

## ⚙️ Implementation

```tsx
export function useFocus<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const isFocused = useRef<boolean>(false);

    const focus = useCallback(() => {
        if (ref.current) {
            ref.current.focus();
            isFocused.current = true;
        }
    }, []);

    const blur = useCallback(() => {
        if (ref.current) {
            ref.current.blur();
            isFocused.current = false;
        }
    }, []);

    return { ref, focus, blur, isFocused: isFocused.current };
}
```

## 💡 Notes

- Imperative API for focus/blur.
- Tracks focus state internally.

## 🧾 Type Definition

```tsx
type UseFocusResult<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  focus: () => void;
  blur: () => void;
  isFocused: boolean;
};
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🔍 Focus control| Programmatic focus/blur   |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
