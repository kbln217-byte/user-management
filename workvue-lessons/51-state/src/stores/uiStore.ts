import { defineStore } from "pinia";
import { useTodoStore } from "./todoStore";

export type Filter = "all" | "active" | "done";

export const useUiStore = defineStore("ui", {
  state: () => ({
   filter: "all" as Filter,
  }),

  getters: {
    filteredTodos(state) {
        const todoStore = useTodoStore() ;
      if (state.filter === "active") return todoStore.todos.filter((t) => !t.done);
      if (state.filter === "done") return todoStore.todos.filter((t) => t.done);
      return todoStore.todos;
    },
  },

  actions:{
    setFilter(filter: Filter) {
        this.filter = filter;
    },
  }

});