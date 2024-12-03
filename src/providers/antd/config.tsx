import { ConfigProvider } from "antd";

import type { ReactNode } from "react";

import ANTD_CONFIG from "@/providers/antd/constant";

export default function AntdProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={ANTD_CONFIG}>{children}</ConfigProvider>;
}
