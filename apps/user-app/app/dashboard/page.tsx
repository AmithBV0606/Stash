import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import ClientLogoutDemo from "@/components/client-logout-demo";
import UpdateNumberModal from "@/components/update-number-modal";
import { SiteHeader } from "@/components/sidebar/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default async function HomePage() {
  const user = await prisma.user.findFirst();
  const session = await getServerSession(authOptions);
  // console.log("Session when number is null :", session);

  return (
    <>
      {session?.user?.number === null ? (
        <div className="flex items-center justify-center min-h-svh">
          <UpdateNumberModal />
        </div>
      ) : (
        <div className="[--header-height:calc(--spacing(14))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                  </div>
                  <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      )}
    </>
  );
}

/* <div className="flex flex-col items-center justify-center gap-4 mt-20">
  <div className="bg-orange-400 p-4 rounded-lg text-black">
    <p className="font-bold">Name: {user?.name}</p>
    <p className="font-bold">Email : {user?.email}</p>
    <p className="font-bold">Ph No : {user?.number}</p>
  </div>

  <ClientLogoutDemo />
</div>; */
