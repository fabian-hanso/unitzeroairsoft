/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthSectionStats from "@/components/AuthSectionStats/AuthSectionStats";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function Dashboard() {
  const breadcrumbs: any = [];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <AuthSectionStats />
    </>
  );
}
