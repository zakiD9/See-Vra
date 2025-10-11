import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Dashboard from "./components/pages/admin/dashboard/DashboardSection";
import Users from "./components/pages/admin/users/UsersSection";
import Projects from "./components/pages/admin/projects/ProjectsSection";
import Demands from "./components/pages/admin/demands/DemandsSection";

const LazyHomePage = lazy(() => import("./pages/HomePage"));
const LazyProjectPage = lazy(() => import("./pages/ProjectPage"));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
        <Route path="/" element={<LazyHomePage />} />
        <Route path="/project/:id" element={<LazyProjectPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="demands" element={<Demands />} />
        </Route>
        <Route path="/adminlogin" element={<AdminLoginPage />} />
    </Routes>
    </Suspense>
  );
}
