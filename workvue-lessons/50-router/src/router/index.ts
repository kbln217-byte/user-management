import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoView from "../views/TodoView.vue";
import UserView from "../views/UserView.vue";
import SettingsLayout from "../views/settings/SettingsLayout.vue";
import ProfileView from "../views/settings/ProfileView.vue";
import SecurityView from "../views/settings/SecurityView.vue";

// export const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: "/", name: "home", component: HomeView },

//     { path: "/todo", component: TodoView, meta: { requiresAuth: true } },
//     { path: "/users/:id", name: "user", component: UserView },
//   ],
// });
//   router.beforeEach((to) => {
//   const loggedIn = localStorage.getItem("loggedIn") === "true";
//   if (to.meta.requiresAuth && !loggedIn) {
//     return { path: "/" };
//   }
// });

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/todo", name: "todo", component: TodoView, meta: { requiresAuth: true } },
    { path: "/users/:id", name: "user", component: UserView },
    {
      path: "/settings",
      component: SettingsLayout,
      children: [
        { path: "profile", name: "settings-profile", component: ProfileView },
        { path: "security", name: "settings-security", component: SecurityView },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (to.meta.requiresAuth && !loggedIn) {
    return { path: "/" }; // Homeに戻す
  }
});
