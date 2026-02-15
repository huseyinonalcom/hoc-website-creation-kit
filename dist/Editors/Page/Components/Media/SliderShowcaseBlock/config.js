import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { SlidesField } from "../../../UtilityComponents/SlidesField";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
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
    render: ({ autoPlay, autoPlayInterval, desktopHeight, mobileHeight, imageMode, slides, }) => (_jsx(SliderShowcase, { autoPlay: autoPlay, autoPlayInterval: autoPlayInterval, desktopHeight: desktopHeight, mobileHeight: mobileHeight, imageMode: imageMode, slides: slides })),
};
//# sourceMappingURL=config.js.map