import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";

const { numberInput } = defaultFieldHelpers;

export const threeColumnLayoutConfig: Config<BaseEditorProps>["components"]["ThreeColumnLayout"] =
  {
    label: "3 Sütun",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="ThreeColumnLayout" />,
      },
      first: {
        label: "Birinci Sütun",
        type: "slot",
      },
      second: {
        label: "İkinci Sütun",
        type: "slot",
      },
      third: {
        label: "Üçüncü Sütun",
        type: "slot",
      },
      gap: numberInput("Sütun Aralığı (px)", {
        min: 0,
        placeholder: "Örn: 32",
      }),
    },
    render: ({ first: First, second: Second, third: Third, gap }) => {
      if (!First && !Second && !Third) {
        return <></>;
      }

      const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;

      return (
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: `${gapValue}px` }}
        >
          <div>{First ? <First /> : null}</div>
          <div>{Second ? <Second /> : null}</div>
          <div>{Third ? <Third /> : null}</div>
        </div>
      );
    },
  };
