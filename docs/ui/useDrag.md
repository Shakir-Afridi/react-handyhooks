---
title: useDrag
outline: deep
---

# useDrag

A React hook for handling dragging behavior and tracking position.

---

## ✨ Overview

`useDrag` tracks whether dragging is active and the current position relative to the drag start. Useful for draggable UI elements.

---

## 📦 Import

```tsx
import { useDrag } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useDrag } from 'react-hookstack';

function Example() {
  const { dragging, position, handleMouseDown } = useDrag();

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'grab'
      }}
    >
      Drag me!
    </div>
  );
}
```

## 🧩 API Reference

`useDrag(): { dragging, position, handleMouseDown }`

### Returns

| Property         | Type                       | Description                    |
| ---------------- | -------------------------- | ------------------------------ |
| `dragging`       | `boolean`                  | True if dragging is active.    |
| `position`       | `{ x: number; y: number }` | Current drag offset.           |
| `handleMouseDown`| `(event) => void`          | Attach to draggable element.   |

## ⚙️ Implementation

```tsx
export function useDrag() {
    // State to track whether dragging is in progress
    const [dragging, setDragging] = useState<boolean>(false);

    // State to track current position
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    // Ref to store initial positions for calculations
    const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Mouse move handler
    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            setPosition({
                x: event.clientX - startPos.current.x,
                y: event.clientY - startPos.current.y,
            });
        },
        [] // removed dragging from dependencies
    );

    // Mouse up handler to stop dragging
    const handleMouseUp = useCallback(() => {
        setDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    // Mouse down handler to start dragging
    const handleMouseDown = useCallback(
        (event: React.MouseEvent) => {
            setDragging(true);
            startPos.current = {
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            };
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        },
        [handleMouseMove, handleMouseUp, position]
    );

    return { dragging, position, handleMouseDown };
}
```

## 💡 Notes

- Tracks drag state and position.
- Attach `handleMouseDown` to any draggable element.

## 🧾 Type Definition

```tsx
type UseDragResult = {
  dragging: boolean;
  position: { x: number; y: number };
  handleMouseDown: (event: React.MouseEvent) => void;
};
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🖱️ Drag support | Tracks drag and position  |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
