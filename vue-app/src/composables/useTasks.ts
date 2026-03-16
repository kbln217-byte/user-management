import { ref, computed, watch } from "vue";

export type Task = { id: number; title: string; done: boolean };
export type Filter = "all" | "active" | "done";

const STORAGE_KEY = "tasks";

/**
 * tasksに関する状態と操作をまとめた composable
 */
export function useTasks() {
    // state
    const tasks = ref<Task[]>([
        { id: 1, title: "task1", done: false },
        { id: 2, title: "task2", done: true },
    ]);

    const newTitle = ref("");
    const filter = ref<Filter>("all");

    // 起動時に復元（tasksが定義された後）
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw) as Task[];
            if (Array.isArray(parsed)) tasks.value = parsed;
        } catch {
            // 壊れてても落とさない（学習用は無視でOK）
        }
    }

    // computed（派生状態）
    const doneCount = computed(() => tasks.value.filter((t) => t.done).length);
    const activeCount = computed(() => tasks.value.length - doneCount.value);
    const cleanTaskCount = computed(() => tasks.value.filter((t) => t.title.includes("掃除")).length);
    //掃除に絞りたいときは
    //    const cleanTaskCount = computed(() => tasks.value.filter((t) => t.title === "掃除").length);

    const filteredTasks = computed(() => {
        if (filter.value === "active") return tasks.value.filter((t) => !t.done);
        if (filter.value === "done") return tasks.value.filter((t) => t.done);
        return tasks.value;
    });

    // watch（保存）

    watch(
        tasks,
        (next) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        },
        { deep: true }
    );

    // actions
    function addTask() {
        const title = newTitle.value.trim();
        if (!title) return;

        const nextId =
            tasks.value.length === 0 ? 1 : Math.max(...tasks.value.map((t) => t.id)) + 1;

        tasks.value.push({ id: nextId, title, done: false });
        newTitle.value = "";
    }

    function toggleTask(id: number, done: boolean) {
        const t = tasks.value.find((x) => x.id === id);
        if (!t) return;
        t.done = done;
    }

    function removeTask(id: number) {
        tasks.value = tasks.value.filter((t) => t.id !== id);
    }

    function editTask(id: number) {
        const t = tasks.value.find((x) => x.id === id);
        if (!t) return;

        const newTitle = prompt("新しいタイトル", t.title);

        if (newTitle !== null && newTitle.trim() !== "") {
            t.title = newTitle.trim();
        }
    }

    function setFilter(next: Filter) {
        filter.value = next;
    }

    return {
        // state
        tasks,
        newTitle,
        filter,

        // derived
        doneCount,
        activeCount,
        filteredTasks,
        cleanTaskCount,

        // actions
        addTask,
        toggleTask,
        removeTask,
        editTask,
        setFilter,
    };
}