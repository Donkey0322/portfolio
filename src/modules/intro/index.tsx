"use client";

import { Tabs } from "antd";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import type { TabsProps } from "antd";

import Background from "@/assets/images/background.png";
import Me2 from "@/assets/images/me2.png";
import Me from "@/assets/images/me3.png";

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
  background-color: ${(props) => props.theme.pink[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 3.6vw;
  line-height: 120%;
  font-weight: 900;
  font-family: "Playfair Display", serif;
  animation: loading 1.2s 0s 1 both ease-in-out;
`;

const SubTitle = styled.div`
  padding: 5% 0;
  line-height: 150%;
  display: flex;
  flex-wrap: wrap;
  color: #555;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  max-width: 350px;
`;

const Figure = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 動畫設置 */
  animation: float 6s infinite ease-in-out;

  /* 定義上下飄移的動畫 */
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

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Work",
  },
  {
    key: "2",
    label: "Résumé",
  },
  {
    key: "3",
    label: (
      <a
        href="https://github.com/Donkey0322"
        target="_blank"
        style={{ color: "inherit", transition: "none" }}
      >
        Github
      </a>
    ),
  },
];

export default function Intro() {
  const [hover, setHover] = useState(false);
  return (
    <>
      <HeaderContainer className="header">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          tabPosition="top"
        />
      </HeaderContainer>
      <ContentContainer>
        <TextContainer>
          <Title>
            Hi, I&apos;m Yun-Chen Lee.
            <br />A frontend engineer.
          </Title>
          <SubTitle>
            Currently working on next-gen finance products at Oracle Design .
            Previously worked at Google Assistant , NYU IT and Backer-Founder .
          </SubTitle>
        </TextContainer>
        <div style={{ position: "relative" }}>
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
        </div>
      </ContentContainer>
    </>
  );
}
