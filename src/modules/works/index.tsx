"use client";

import Image from "next/image";
import styled from "styled-components";

import Introduction from "@/modules/works/components/Introduction";

import JoineeLogo from "@/assets/icons/Logo";
import Background from "@/assets/images/joinee background2.png";

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
  border-bottom: ${(props) => props.theme.maillard[900]} 5px solid;
  margin-bottom: 30px;
`;

const WorkContainer = styled.a`
  border-radius: 12px;
  width: 100%;
  padding: 6%;
  transition: 0.2s ease;
  background: #44279f;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;

const BackgroundWrapper = styled.div<{
  ratio: string;
}>`
  border-radius: 13.5px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(1%);
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
`;

export default function Works() {
  console.log(`${Background.width} / ${Background.height}`);
  return (
    <WorksContainer>
      <Title>Projects</Title>
      <WorkContainer href="https://joinee-ee017.web.app/entry" target="_blank">
        <BackgroundWrapper ratio={`${Background.width} / ${Background.height}`}>
          <Image src={Background} alt="Background" style={{ height: "102%" }} />
        </BackgroundWrapper>
        <Introduction
          logo={<JoineeLogo fontSize={50} />}
          title={"Jöinee"}
          content={
            "Want to find a partner for badminton? Jöinee, go on a journey!"
          }
          tags={["Web", "Typescript", "Vite", "Google Map API"]}
        />
      </WorkContainer>
      {/* <WorkContainer>GUhcjewci</WorkContainer>
      <WorkContainer>GUhcjewci</WorkContainer> */}
    </WorksContainer>
  );
}
