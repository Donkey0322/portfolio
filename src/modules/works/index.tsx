"use client";

import Image from "next/image";
import styled from "styled-components";

import Introduction from "@/modules/works/components/Introduction";
import { projects } from "@/modules/works/constants";

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

const WorkContainer = styled.a<{ backgroundColor?: string }>`
  border-radius: 12px;
  width: 100%;
  padding: 6%;
  transition: 0.2s ease;
  background: ${({ backgroundColor }) => backgroundColor};
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
  return (
    <WorksContainer>
      <Title>Projects</Title>
      {projects.map(
        (
          {
            logo,
            title,
            content,
            tags,
            href,
            backgroundColor,
            backgroundImage,
            backgroundImageStyle,
          },
          index
        ) => (
          <WorkContainer
            key={index}
            href={href}
            target="_blank"
            backgroundColor={backgroundColor}
          >
            <BackgroundWrapper
              ratio={`${backgroundImage.width} / ${backgroundImage.height}`}
              style={backgroundImageStyle}
            >
              <Image
                src={backgroundImage}
                alt={`$${title} Background`}
                style={{ height: "102%" }}
              />
            </BackgroundWrapper>
            <Introduction
              logo={logo}
              title={title}
              content={content}
              tags={tags}
            />
          </WorkContainer>
        )
      )}
    </WorksContainer>
  );
}
