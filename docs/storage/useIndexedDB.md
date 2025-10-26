---
title: useIndexedDB
outline: deep
---

# useIndexedDB

A React hook for interacting with IndexedDB in the browser.

---

## ✨ Overview

`useIndexedDB` provides a simple interface to open a database and perform basic operations  
like adding, retrieving, and deleting data.

---

## 📦 Import

```tsx
import { useIndexedDB } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useIndexedDB } from 'react-hookstack';

const { db, addItem, getItem } = useIndexedDB("myDatabase");
await addItem("users", { id: 1, name: "John" });
const user = await getItem("users", 1);
```

## 🧩 API Reference

`useIndexedDB(dbName: string): IndexedDBHook | null`

### Parameters

| Parameter      | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `dbName`       | string | The name of the IndexedDB database.         |

### Returns

| Property      | Type                                   | Description                      |
| ------------- | -------------------------------------- | -------------------------------- |
| `db`          | IDBDatabase \| null                    | The database instance.           |
| `addItem`     | `(storeName: string, value: any) => Promise<IDBValidKey>` | Add item to store.              |
| `getItem`     | `(storeName: string, key: IDBValidKey) => Promise<any>`   | Get item from store.            |
| `deleteItem`  | `(storeName: string, key: IDBValidKey) => Promise<void>`  | Delete item from store.         |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

interface IndexedDBHook {
    db: IDBDatabase | null;
    addItem: (storeName: string, value: any) => Promise<IDBValidKey>;
    getItem: (storeName: string, key: IDBValidKey) => Promise<any>;
    deleteItem: (storeName: string, key: IDBValidKey) => Promise<void>;
}

export function useIndexedDB(dbName: string): IndexedDBHook | null {
    const [db, setDb] = useState<IDBDatabase | null>(null);

    useEffect(() => {
        if (!dbName) return;

        const request = indexedDB.open(dbName);

        request.onupgradeneeded = (event) => {
            const database = request.result;
            if (!database.objectStoreNames.contains("defaultStore")) {
                database.createObjectStore("defaultStore", {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        };

        request.onsuccess = () => setDb(request.result);
        request.onerror = (event) =>
            console.error("IndexedDB error:", request.error);
    }, [dbName]);

    const addItem = (storeName: string, value: any) =>
        new Promise<IDBValidKey>((resolve, reject) => {
            if (!db) return reject("DB not initialized");
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.add(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

    const getItem = (storeName: string, key: IDBValidKey) =>
        new Promise<any>((resolve, reject) => {
            if (!db) return reject("DB not initialized");
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

    const deleteItem = (storeName: string, key: IDBValidKey) =>
        new Promise<void>((resolve, reject) => {
            if (!db) return reject("DB not initialized");
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });

    if (!db) return null;

    return { db, addItem, getItem, deleteItem };
}
```

## 💡 Notes

- Automatically creates a default store if needed.
- Handles async operations with Promises.

## 🧾 Type Definition

```tsx
interface IndexedDBHook {
  db: IDBDatabase | null;
  addItem: (storeName: string, value: any) => Promise<IDBValidKey>;
  getItem: (storeName: string, key: IDBValidKey) => Promise<any>;
  deleteItem: (storeName: string, key: IDBValidKey) => Promise<void>;
}
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 IndexedDB    | Browser database support          |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
