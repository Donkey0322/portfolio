"use client";

import styled from "styled-components";

import type { ReactNode } from "react";

import Tag from "@/components/Tag";

interface IntroductionProps {
  title: string;
  content: string;
  logo: ReactNode;
  tags?: string[];
}

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  z-index: 100;
`;

const Title = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 50px;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  padding: 10px 0;
`;

const Content = styled.div`
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.white};
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px 8px;
  max-width: 60%;
  margin-top: 50px;
  flex-wrap: wrap;
`;

export default function Introduction({
  title,
  content,
  logo,
  tags,
}: IntroductionProps) {
  return (
    <IntroductionContainer>
      {logo}
      <Title>{title}</Title>
      <Content>{content}</Content>
      <TagsContainer>
        {tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagsContainer>
    </IntroductionContainer>
  );
}
