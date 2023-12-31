import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
}

export default Sidebar;
