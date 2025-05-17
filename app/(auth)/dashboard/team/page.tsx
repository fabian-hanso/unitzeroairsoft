import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import MemberListView from "@/components/MemberListView/MemberListView";
import React from "react";

export default function page() {
  const breadcrumbs = [
    { name: "Team", href: "/dashboard/team", current: true },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <MemberListView />
    </>
  );
}
