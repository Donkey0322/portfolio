"use client";

import styled from "styled-components";

import type { Type } from "@/utils/types";

const TagContainer = styled.div`
  background: #e8e5e2;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 600;
  color: #6c7372;
  width: fit-content;
`;

export default function Tag(props: Type<typeof TagContainer>) {
  return <TagContainer {...props}></TagContainer>;
}
