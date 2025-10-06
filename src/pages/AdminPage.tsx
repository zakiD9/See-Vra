import { Outlet } from "react-router-dom"
import Sidebar from "@/components/layout/admin/sidebar/SideBar"
import TopBar from "@/components/layout/admin/topbar/TopBarSection"

export default function AdminPage() {
  return (
      <div className="flex bg-white flex-col flex-1">
        <TopBar />
        <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
        </div>
  )
}
