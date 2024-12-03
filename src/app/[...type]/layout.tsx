import Intro from "@/modules/intro";
import Works from "@/modules/works";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Intro />
      <Works /> */}
      {children}
    </>
  );
}
