import { Button } from "@workspace/ui/components/button";
import { prisma } from "@repo/db";

export default async function Page() {
  const user = await prisma.user.findFirst();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>

        <div className="bg-orange-400 p-4 rounded-lg text-black">
          <p className="font-bold">Name: {user?.name}</p>
          <p className="font-bold">Email : {user?.email}</p>
        </div>

        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
