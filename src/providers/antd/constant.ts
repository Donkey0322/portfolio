import type { ThemeConfig } from "antd";

import theme from "@/providers/theme/theme";
import { hexToRgb } from "@/utils/color";

const ANTD_CONFIG: ThemeConfig = {
  components: {
    Tabs: {
      colorPrimary: theme.maillard[900],
      colorPrimaryHover: theme.maillard[300],
      colorPrimaryActive: theme.maillard[700],
    },
    Table: {
      headerBorderRadius: 0,
      headerBg: theme.main[100],
      headerSortActiveBg: theme.sub[300],
      headerSortHoverBg: theme.sub[300],
      rowSelectedBg: hexToRgb(theme.main[100], 0.5),
      rowSelectedHoverBg: hexToRgb(theme.main[100], 0.5),
    },
    Radio: {
      buttonSolidCheckedBg: theme.sub[100],
      buttonSolidCheckedColor: theme.sub[500],
      buttonSolidCheckedHoverBg: theme.sub[100],
      colorPrimary: theme.sub[500],
      colorPrimaryHover: theme.sub[500],
      colorText: theme.sub[500],
    },
    Switch: {
      colorPrimary: theme.sub[500],
      colorPrimaryHover: theme.sub[500],
    },
    Checkbox: {
      colorPrimary: theme.sub[500],
      colorPrimaryHover: theme.sub[500],
    },
    Dropdown: {
      controlItemBgActive: theme.sub[500],
      controlItemBgActiveHover: theme.sub[300],
      colorPrimary: "white",
    },
    Input: {
      colorPrimary: theme.sub[500],
      colorPrimaryHover: theme.sub[500],
    },
    Pagination: {
      colorPrimary: theme.sub[500],
      colorPrimaryHover: theme.sub[500],
    },
    InputNumber: {
      activeBorderColor: theme.main[500],
      handleHoverColor: theme.main[500],
      hoverBorderColor: theme.main[300],
      colorError: theme.red[500],
    },
    Select: {
      colorPrimary: theme.sub[500],
      colorPrimaryHover: theme.sub[500],
      optionSelectedBg: theme.sub[500],
      optionSelectedColor: "white",
    },
  },
};

export default ANTD_CONFIG;
