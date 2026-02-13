import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../utilityComponentsa/UniversalClipboard";
import { SlidesField } from "../../../utilityComponentsa/SlidesField";
import { EditorImage } from "../../../utilityComponentsa/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import SliderShowcase from "./Component";
const { imageModeToggleField, numberInput } = defaultFieldHelpers;
export const sliderShowcaseBlockConfig = {
    label: "Vitrin Kaydırıcı",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "SliderShowcaseBlock" }),
        },
        slides: {
            label: "Slaytlar",
            type: "custom",
            render: ({ value, onChange }) => (_jsx(SlidesField, { componentName: "SliderShowcaseBlock", ImageField: EditorImage, value: Array.isArray(value) ? value : [], onChange: (next) => onChange(next) })),
        },
        autoPlay: {
            label: "Otomatik oynatma",
            type: "radio",
            options: [
                { label: "Evet", value: true },
                { label: "Hayır", value: false },
            ],
        },
        autoPlayInterval: numberInput("Otomatik oynatma süresi (ms)", {
            min: 2000,
            placeholder: "Örn: 6000",
            defaultValue: 6000,
        }),
        imageMode: imageModeToggleField,
        desktopHeight: numberInput("Masaüstü Yüksekliği (rem)", {
            min: 20,
            step: 0.5,
            placeholder: "Örn: 50",
            defaultValue: 50,
        }),
        mobileHeight: numberInput("Mobil Yüksekliği (rem)", {
            min: 20,
            step: 0.5,
            placeholder: "Örn: 45",
            defaultValue: 45,
        }),
    },
    render: SliderShowcase,
};
//# sourceMappingURL=config.js.map