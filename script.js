const fs = require("fs");
const path = require("path");

// Path to the folder you want to read
const folderPath = path.join(__dirname, "src/hooks/stories");

fs.readdir(folderPath, (err, files) => {
    if (err) {
        return console.error("Unable to read folder:", err);
    }

    // Filter only files (ignore subfolders)
    const fileArray = files.filter((file) => {
        const filePath = path.join(folderPath, file);
        return filePath;
    });

    console.log(fileArray);
});

const hooks = [
    "useArray.ts",
    "useAsync.ts",
    "useBoolean.ts",
    "useClickOutside.ts",
    "useClipboardHistory.ts",
    "useCookie.ts",
    "useCopyToClipboard.ts",
    "useCounter.ts",
    "useDarkMode.ts",
    "useDebounce.ts",
    "useDebouncedCallback.ts",
    "useDrag.ts",
    "useEventCallback.ts",
    "useEventListener.ts",
    "useFetch.ts",
    "useFocus.ts",
    "useFormState.ts",
    "useGeoLocation.ts",
    "useHover.ts",
    "useIdle.ts",
    "useIndexedDB.ts",
    "useInput.ts",
    "useIntersectionObserver.ts",
    "useInterval.ts",
    "useLocalStorage.ts",
    "useLongPress.ts",
    "useMap.ts",
    "useMergeState.ts",
    "useMousePosition.ts",
    "useOnlineStatus.ts",
    "usePersistedState.ts",
    "usePortal.ts",
    "usePreferredLanguage.ts",
    "usePrevious.ts",
    "usePreviousDistinct.ts",
    "useRafInterval.ts",
    "useRafState.ts",
    "useReducerWithLogger.ts",
    "useRequestAnimationFrame.ts",
    "useSSE.ts",
    "useScrollPosition.ts",
    "useSessionStorage.ts",
    "useThrottle.ts",
    "useThrottledCallback.ts",
    "useTimeout.ts",
    "useToggle.ts",
    "useToggleSet.ts",
    "useURLSearchParams.ts",
    "useUndoRedo.ts",
    "useUpdateEffect.ts",
    "useVisibilityChange.ts",
    "useWebSocket.ts",
    "useWhyDidYouUpdate.ts",
    "useWindowSize.ts",
];
