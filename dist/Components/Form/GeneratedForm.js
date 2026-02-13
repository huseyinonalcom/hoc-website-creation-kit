"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "../../Editors/Page/Componentsa/Actions/ButtonLink/Button";
import { FormToggleField } from "./FormToggle";
import { FormInputField } from "./FormInput";
import { FormSection } from "./FormSection";
import FormRow from "./FormRow";
const chunkFields = (items) => {
    const result = [];
    for (let index = 0; index < items.length; index += 2) {
        result.push(items.slice(index, index + 2));
    }
    return result;
};
const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
function resolveStateDrivenProps({ component, fieldProps, fieldId, state, }) {
    if (!state) {
        return undefined;
    }
    const fieldName = (hasOwnProperty(fieldProps, "name") && typeof fieldProps.name === "string"
        ? fieldProps.name
        : undefined) ?? fieldId;
    if (!fieldName || !hasOwnProperty(state, fieldName)) {
        return undefined;
    }
    const valueFromState = state[fieldName];
    const resolvedComponent = component ?? FormInputField;
    if (resolvedComponent === FormToggleField) {
        if (hasOwnProperty(fieldProps, "checked")) {
            return undefined;
        }
        return { checked: coerceBoolean(valueFromState) };
    }
    if (hasOwnProperty(fieldProps, "value") ||
        hasOwnProperty(fieldProps, "defaultValue")) {
        return undefined;
    }
    const defaultValue = coerceDefaultValue(valueFromState);
    if (defaultValue === undefined) {
        return undefined;
    }
    return { defaultValue };
}
function coerceBoolean(value) {
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();
        if (normalized === "true") {
            return true;
        }
        if (normalized === "false") {
            return false;
        }
    }
    return Boolean(value);
}
function coerceDefaultValue(value) {
    if (typeof value === "string" ||
        typeof value === "number" ||
        Array.isArray(value)) {
        return value;
    }
    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }
    return undefined;
}
export default function GeneratedForm({ fields, sections, action, children, pending, state, successMessage, }) {
    const sectionsToRender = sections ?? (fields && fields.length ? [{ fields }] : []);
    const hiddenFields = [];
    const preparedSections = sectionsToRender.map((section) => {
        const visibleFields = section.fields.filter((field) => {
            if (field.hidden) {
                hiddenFields.push(field);
                return false;
            }
            return true;
        });
        return { ...section, fields: visibleFields };
    });
    const renderField = (field, fallbackKey) => {
        const { component = FormInputField, fieldClassName, key, id, ...fieldProps } = field;
        const FieldComponent = component;
        const resolvedKey = key ?? id ?? fieldProps.name ?? fallbackKey;
        const stateDrivenProps = resolveStateDrivenProps({
            component,
            fieldProps,
            fieldId: id,
            state,
        });
        return (_jsx(FieldComponent, { id: id, ...(stateDrivenProps ?? {}), ...fieldProps, fieldClassName: fieldClassName }, resolvedKey));
    };
    return (_jsxs("form", { action: action, children: [preparedSections.map((section, sectionIndex) => {
                const { fields: sectionFields, id, ...sectionProps } = section;
                if (sectionFields.length === 0) {
                    return null;
                }
                const rows = chunkFields(sectionFields);
                return (_jsx(FormSection, { ...sectionProps, children: rows.map((row, rowIndex) => (_jsx(FormRow, { children: row.map((field, fieldIndex) => renderField(field, `${rowIndex}-${fieldIndex}`)) }, `${id ?? sectionIndex}-row-${rowIndex}`))) }, id ?? sectionIndex));
            }), children, _jsxs("div", { className: "mt-6 flex items-center justify-end gap-x-3", children: [state?.error && _jsx("p", { className: "text-sm text-red-600", children: state.error }), state?.result === "success" && (_jsx("p", { className: "text-lg text-green-600", children: successMessage ?? _jsx(CheckCircleIcon, { color: "green" }) })), _jsx(Button, { disabled: pending, type: "submit", children: _jsx(CheckIcon, { className: "h-5 w-5" }) })] }), hiddenFields.length > 0 && (_jsx("div", { "aria-hidden": "true", className: "hidden", children: hiddenFields.map((field, hiddenIndex) => renderField(field, `hidden-${hiddenIndex}`)) }))] }));
}
export function createGeneratedForm(blueprint, defaults) {
    return function GeneratedFormFactory(props) {
        return _jsx(GeneratedForm, { ...defaults, ...blueprint, ...props });
    };
}
//# sourceMappingURL=GeneratedForm.js.map