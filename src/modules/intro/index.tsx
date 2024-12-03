"use client";

import { Tabs } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";

import type { TabsProps } from "antd";

import { MOBILE_WITH } from "@/constants/rwd";
import { rwdFontSize } from "@/utils/css";
import { fadeIn } from "@/utils/css/styled-components";

import Github from "@/assets/icons/Github";
import Resume from "@/assets/icons/Resume";
import Work from "@/assets/icons/Work";
import Background from "@/assets/images/background.png";
import Me2 from "@/assets/images/me2.png";
import Me from "@/assets/images/me3.png";
import { rwdFontSize } from "@/utils/css";
import { fadeIn } from "@/utils/css/styled-components";
import { MOBILE_WITH } from "@/constants/rwd";
import Github from "@/assets/icons/Github";
import Work from "@/assets/icons/Work";
import Resume from "@/assets/icons/Resume";

const HeaderContainer = styled.div`
  padding: 1% 4% 4%;
  background-color: ${(props) => props.theme.pink[100]};
  .ant-dropdown-menu.ant-dropdown-menu-root.ant-dropdown-menu-vertical {
    max-height: 50vh;
    overflow: scroll;
  }

  .ant-tabs-nav-wrap {
    justify-content: flex-end !important; /* 标签右对齐 */
  }
`;

const ContentContainer = styled.div`
  padding: 0% 15% 8%;
  gap: 10px;
  background-color: ${(props) => props.theme.pink[100]};
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  ${rwdFontSize(45)}
  line-height: 120%;
  font-weight: 900;
  font-family: "Playfair Display", serif;
  animation: ${fadeIn} 1.2s 0s 1 both ease-in-out;
  @media (max-width: ${MOBILE_WITH}px) {
    animation: ${fadeIn} 1.2s 0.45s 1 both ease-in-out;
  }
`;

const SubTitle = styled.div`
  ${rwdFontSize(18)}
  padding: 5% 0;
  line-height: 150%;
  color: #555;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  max-width: 400px;
  text-align: justify;
  animation: ${fadeIn} 1.2s 0.45s 1 both ease-in-out;
  @media (max-width: ${MOBILE_WITH}px) {
    animation: ${fadeIn} 1.2s 0.9s 1 both ease-in-out;
  }
`;

const ContentLink = styled.a`
  font-weight: 600;
  position: relative;
  text-decoration: none;
  color: inherit;
  display: inline;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.maillard[900]};
    transition: transform 0.3s ease;
    width: 100%;
    transform: scaleX(0);
  }

  &:hover::after {
    width: 100%;
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;

const FigureContainer = styled.div`
  position: relative;
  animation: ${fadeIn} 1.2s 0.9s 1 both ease-in-out;
  @media (max-width: ${MOBILE_WITH}px) {
    animation: ${fadeIn} 1.2s 0s 1 both ease-in-out;
  }
`;

const Figure = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 6s infinite ease-in-out;

  @keyframes float {
    0% {
      transform: translate(-50%, -60%); /* 初始位置 */
    }
    50% {
      transform: translate(-50%, -40%); /* 向上移動 20px */
    }
    100% {
      transform: translate(-50%, -60%); /* 回到初始位置 */
    }
  }
`;

const Label = styled.a`
  ${rwdFontSize(17)}
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit !important;
  transition: none !important;
`;

const items: TabsProps["items"] = [
  {
    key: "work",
    label: (
      <Label>
        <Work></Work>
        Work
      </Label>
    ),
  },
  {
    key: "resume",
    label: (
      <Label>
        <Resume></Resume>
        Résumé
      </Label>
    ),
  },
  {
    key: "github",
    label: (
      <Label href="https://github.com/Donkey0322" target="_blank">
        <Github />
        Github
      </Label>
    ),
  },
];

export default function Intro() {
  const [hover, setHover] = useState(false);
  const { type } = useParams<{ type: string[] }>();
  const router = useRouter();

  return (
    <>
      <HeaderContainer className="header">
        <Tabs
          activeKey={type?.[0]}
          items={items}
          tabPosition="top"
          onChange={(key) => {
            router.push(`${key}`, { scroll: true });
          }}
        />
      </HeaderContainer>
      <ContentContainer>
        <TextContainer>
          <Title>
            Hi, I&apos;m Yun-Chen Lee.
            <br />A frontend engineer.
          </Title>
          <SubTitle>
            <span>Currently interning as a Frontend Software Engineer at </span>
            <ContentLink href="https://www.appier.com/en/" target="_blank">
              Appier Inc.
            </ContentLink>
            <span>
              , optimizing CI processes and enhancing system reliability.
              Previously worked at{" "}
            </span>
            <ContentLink href="https://www.cresclab.com/en" target="_blank">
              Crescendo Lab Ltd.
            </ContentLink>
            <span>, </span>
            <ContentLink
              href="https://www.aca.ntu.edu.tw/w/acaEN/Index"
              target="_blank"
            >
              NTU Office of Academic Affairs
            </ContentLink>
            <span>, and led software projects like Jöinee and Logoshot. </span>
          </SubTitle>
        </TextContainer>
        <FigureContainer>
          {hover ? (
            <Figure
              src={Me2}
              alt={"me"}
              height={350}
              onMouseLeave={() => setHover(false)}
            />
          ) : (
            <Figure
              src={Me}
              alt={"me"}
              height={300}
              onMouseEnter={() => setHover(true)}
            />
          )}
          <Image src={Background} alt={"background"} width={300} />
        </FigureContainer>
      </ContentContainer>
    </>
  );
}
