import type { PiniaPluginContext } from "pinia";

export function persistPlugin({ store }: PiniaPluginContext) {
  const key = `pinia:${store.$id}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      store.$patch(JSON.parse(saved));
    } catch {
      // ignore
    }
  }

  store.$subscribe((_mutation, state) => {
    localStorage.setItem(key, JSON.stringify(state));
  });
}