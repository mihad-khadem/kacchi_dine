import AdminLayout from "@/components/layout/AdminLayout";
import React from "react";
import AdminDashboardPage from "./dashboard/page";

const AdminSetupPage = () => {
  return (
    <>
      <AdminLayout>
        <AdminDashboardPage />
      </AdminLayout>
    </>
  );
};

export default AdminSetupPage;
