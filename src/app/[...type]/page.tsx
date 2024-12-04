import Content from "@/modules/content";
import Resume from "@/modules/resume";
import Works from "@/modules/works";

const ROUTE_MAP: Record<string, JSX.Element> = {
  work: <Works />,
  resume: <Resume />,
};

export default async function Home({
  params,
}: {
  params: Promise<{ type: string[] }>;
}) {
  const {
    type: [value],
  } = await params;
  return <Content>{ROUTE_MAP[value]}</Content>;
}
