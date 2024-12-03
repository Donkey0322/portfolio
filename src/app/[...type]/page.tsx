import Intro from "@/modules/intro";
import Resume from "@/modules/resume";
import Works from "@/modules/works";

export default async function Home() {
  return (
    <>
      <Intro />
      <Works />
      <Resume />
    </>
  );
}
