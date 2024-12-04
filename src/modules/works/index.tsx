"use client";

import Image from "next/image";
import styled from "styled-components";

import { Video } from "@/components/Video";
import Introduction from "@/modules/works/components/Introduction";
import { projects } from "@/modules/works/constants";

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

const BackgroundWrapper = styled.div`
  border-radius: 13.5px;
  position: absolute;
  right: 0;
  transform: translateX(1%);
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

export default function Works() {
  return (
    <>
      {projects.map(
        (
          {
            backgroundColor,
            backgroundImageStyle,
            content,
            href,
            logo,
            source: { backgroundSource, backgroundType },
            tags,
            title,
          },
          index
        ) => (
          <WorkContainer
            key={index}
            href={href}
            target="_blank"
            backgroundColor={backgroundColor}
          >
            <BackgroundWrapper style={backgroundImageStyle}>
              {backgroundType === "video" ? (
                <Video
                  style={{ width: "100%", height: "100%", scale: 1.02 }}
                  src={backgroundSource}
                />
              ) : (
                <Image
                  src={backgroundSource}
                  alt={`$${title} Background`}
                  style={{ height: "102%" }}
                />
              )}
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
    </>
  );
}
