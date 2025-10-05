import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import ClientLogoutDemo from "@/components/client-logout-demo";
import UpdateNumberModal from "@/components/update-number-modal";

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
          <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <div className="bg-orange-400 p-4 rounded-lg text-black">
              <p className="font-bold">Name: {user?.name}</p>
              <p className="font-bold">Email : {user?.email}</p>
              <p className="font-bold">Ph No : {user?.number}</p>
            </div>

            <ClientLogoutDemo />
          </div>
        </div>
      )}
    </>
  );
}
