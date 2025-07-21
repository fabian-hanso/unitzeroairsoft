/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthSectionProfile from "@/components/AuthSectionProfile/AuthSectionProfile";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function Dashboard() {
  const breadcrumbs = [{ name: "Profil", href: "/dashboard/profil" }];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <AuthSectionProfile />
    </>
  );
}
