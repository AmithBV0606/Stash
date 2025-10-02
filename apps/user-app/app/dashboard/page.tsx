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
    <div className="flex items-center justify-center min-h-svh">
      {session?.user?.number === null ? (
        <>
          <UpdateNumberModal />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Hello World</h1>

          <div className="bg-orange-400 p-4 rounded-lg text-black">
            <p className="font-bold">Name: {user?.name}</p>
            <p className="font-bold">Email : {user?.email}</p>
            <p className="font-bold">Ph No : {user?.number}</p>
          </div>

          <ClientLogoutDemo />
        </div>
      )}
    </div>
  );
}
