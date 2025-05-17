import AuthSectionEvents from "@/components/AuthSectionEvents/AuthSectionEvents";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import React from "react";

export default function page() {
  const breadcrumbs = [
    { name: "Events", href: "/dashboard/events", current: true },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <AuthSectionEvents />
    </>
  );
}
