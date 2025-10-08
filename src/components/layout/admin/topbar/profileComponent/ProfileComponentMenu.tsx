"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/AuthStore"
import CustomDropdown from "./dropdown"

export default function Profile() {
  const { user, fetchMe, loading, error } = useAuthStore()

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  return (
    <div className="flex items-center gap-2">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <>
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="logo"
            className="h-10 w-10 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">{user?.name || "Unknown"}</h1>
            <h1 className="text-gray-600 text-sm">{user?.email || "No email"}</h1>
          </div>
          <CustomDropdown />
        </>
      )}
    </div>
  )
}
