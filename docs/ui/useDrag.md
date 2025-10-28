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
      onTouchStart={handleMouseDown}
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
| `handleMouseDown`| `(event) => void`          | Attach to draggable element's `onMouseDown` **and** `onTouchStart`.   |

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

    // Mouse and touch move handler
    const handlePointerMove = useCallback((event: MouseEvent | TouchEvent) => {
        let clientX: number, clientY: number;
        if ("touches" in event && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else if ("clientX" in event) {
            clientX = event.clientX;
            clientY = event.clientY;
        } else {
            return;
        }
        setPosition({
            x: clientX - startPos.current.x,
            y: clientY - startPos.current.y,
        });
    }, []);

    // Mouse and touch up/end handler to stop dragging
    const handlePointerUp = useCallback(() => {
        setDragging(false);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", handlePointerUp);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", handlePointerUp);
    }, [handlePointerMove]);

    // Mouse down/touch start handler to start dragging
    const handleMouseDown = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            setDragging(true);
            let clientX: number, clientY: number;
            if (
                "touches" in event &&
                (event as React.TouchEvent).touches.length > 0
            ) {
                clientX = (event as React.TouchEvent).touches[0].clientX;
                clientY = (event as React.TouchEvent).touches[0].clientY;
            } else if ("clientX" in event) {
                clientX = (event as React.MouseEvent).clientX;
                clientY = (event as React.MouseEvent).clientY;
            } else {
                return;
            }
            startPos.current = {
                x: clientX - position.x,
                y: clientY - position.y,
            };
            window.addEventListener("mousemove", handlePointerMove);
            window.addEventListener("mouseup", handlePointerUp);
            window.addEventListener("touchmove", handlePointerMove, {
                passive: false,
            });
            window.addEventListener("touchend", handlePointerUp);
        },
        [handlePointerMove, handlePointerUp, position]
    );

    return { dragging, position, handleMouseDown };
}
```

## 💡 Notes

- Tracks drag state and position.
- Attach `handleMouseDown` to both `onMouseDown` and `onTouchStart` for mobile support.

## 🧾 Type Definition

```tsx
type UseDragResult = {
  dragging: boolean;
  position: { x: number; y: number };
  handleMouseDown: (event: React.MouseEvent | React.TouchEvent) => void;
};
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🖱️🟦 Drag support | Tracks drag and position on mouse and touch devices |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
