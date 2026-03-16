import { defineStore } from "pinia";

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export const useTodoStore = defineStore("todo", {
  state: () => ({
    //状態管理
    todos: [] as Todo[],
    filter: "all" as "all" | "active" | "done",
  }),

  getters: {
        remainingCount(state) {
      return state.todos.filter((t) => !t.done).length;
    },
        doneCount(state) {
      return state.todos.filter((t) => t.done).length;
    },

  },

  actions: {
    add(title: string) {
      const t = title.trim();
      if (t.length >= 20){
        console.log("20字以内で入力してください");
        alert("20字以内で入力してください");
        return
      }
      if (!t) return;
      this.todos.push({ id: Date.now(), title: t, done: false });

    },

    toggle(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) todo.done = !todo.done;
    },
    remove(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    setFilter(filter: "all" | "active" | "done") {
      this.filter = filter;
    },
  },
});