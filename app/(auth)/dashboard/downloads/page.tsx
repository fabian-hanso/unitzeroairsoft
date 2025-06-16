import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import DownloadSection from "@/components/DownloadSection/DownloadSection";
import React from "react";

export default function page() {
  const breadcrumbs = [{ name: "Downloads", href: "/dashboard/downloads" }];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <DownloadSection />
    </>
  );
}
