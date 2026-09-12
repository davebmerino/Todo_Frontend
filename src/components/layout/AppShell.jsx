import { Suspense } from "react";
import { Outlet } from "react-router";
import MobileHeader from "@/components/layout/MobileHeader";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

import PageLoadingFallback from "@/components/feedback/PageLoadingFallback";

function AppShell() {
  const firstName = "Dave";

  return (
    <div className="min-h-screen bg-background">
      <div className=" flex ">
        <DesktopSidebar />

        <div className="flex  flex-1 flex-col">
          <MobileHeader firstName={firstName} />

          <main className="flex-1 overflow-x-hidden px-4 pb-28 pt-2 lg:mx-auto md:px-8 md:pb-10 md:pt-8 lg:px-10">
            <Suspense fallback={<PageLoadingFallback />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}

export default AppShell;
