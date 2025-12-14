import AdminTeamView from "@/components/AdminTeamView/AdminTeamView";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import React from "react";
// Import admin SDK (adjust path as needed)

export default async function page() {
  const breadcrumbs = [{ name: "Events", href: "/dashboard/events" }];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <AdminTeamView />
    </>
  );
}
