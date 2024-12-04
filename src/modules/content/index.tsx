"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";

import type { ReactNode } from "react";

import { expand, fadeIn } from "@/utils/css/styled-components";

const WorksContainer = styled.div`
  padding: 5% 15% 8%;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const Title = styled.div`
  font-family: "Poppins", serif;
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.5s 0s 1 both ease-in-out;
  &::after {
    content: "";
    display: block;
    bottom: 0;
    left: 0;
    height: 4px;
    background-color: ${({ theme }) => theme.maillard[900]};
    width: 100%;
    transform-origin: 0% 50%;
    animation: ${expand} 0.7s 0s 1 ease-in-out;
  }
`;

const TITLE_MAP: Record<string, string> = {
  work: "Projects",
  resume: "Résumé",
};

export default function Content({ children }: { children: ReactNode }) {
  const { type } = useParams<{ type: string[] }>();

  return (
    <WorksContainer>
      <Title>{TITLE_MAP[type?.[0] ?? "work"]}</Title>
      {children}
    </WorksContainer>
  );
}
