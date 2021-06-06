import { createRouter, createWebHistory } from "vue-router";
import Blogs from "./views/Blogs";
import Blogator from "./views/Blogator";

const routes = [
    { path: "/", component: Blogs },
    { path: "/blogator", component: Blogator }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;