import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";

const { numberInput } = defaultFieldHelpers;

export const fourColumnLayoutConfig: Config<BaseEditorProps>["components"]["FourColumnLayout"] =
  {
    label: "4 Sütun",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="FourColumnLayout" />,
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
      fourth: {
        label: "Dördüncü Sütun",
        type: "slot",
      },
      gap: numberInput("Sütun Aralığı (px)", {
        min: 0,
        placeholder: "Örn: 24",
      }),
    },
    render: ({
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      gap,
    }) => {
      if (!First && !Second && !Third && !Fourth) {
        return <></>;
      }

      const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;

      return (
        <div
          className="grid grid-cols-1 lg:grid-cols-4"
          style={{ gap: `${gapValue}px` }}
        >
          <div>{First ? <First /> : null}</div>
          <div>{Second ? <Second /> : null}</div>
          <div>{Third ? <Third /> : null}</div>
          <div>{Fourth ? <Fourth /> : null}</div>
        </div>
      );
    },
  };
