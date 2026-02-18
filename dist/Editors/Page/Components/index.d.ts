export declare const components: {
    TwoColumnLayout: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps>;
        label?: string;
        defaultProps?: import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"left" | "right" | "clipboard" | "gap" | "columnRatio", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"left" | "right" | "clipboard" | "gap" | "columnRatio", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"left" | "right" | "clipboard" | "gap" | "columnRatio", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/TwoColumnLayout/type").TwoColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    ThreeColumnLayout: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps>;
        label?: string;
        defaultProps?: import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "first" | "second" | "third" | "gap", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "first" | "second" | "third" | "gap", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "first" | "second" | "third" | "gap", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/ThreeColumnLayout/type").ThreeColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    FourColumnLayout: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps>;
        label?: string;
        defaultProps?: import("./Layout/FourColumnLayout/type").FourColumnLayoutProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "first" | "second" | "third" | "gap" | "fourth", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "first" | "second" | "third" | "gap" | "fourth", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "first" | "second" | "third" | "gap" | "fourth", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/FourColumnLayout/type").FourColumnLayoutProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    VerticalSpacer: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Layout/VerticalSpacer/type").VerticalSpacerProps>;
        label?: string;
        defaultProps?: import("./Layout/VerticalSpacer/type").VerticalSpacerProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "clipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "clipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/VerticalSpacer/type").VerticalSpacerProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Layout/VerticalSpacer/type").VerticalSpacerProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "clipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Layout/VerticalSpacer/type").VerticalSpacerProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    HeadingBlock: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Content/HeadingBlock/type").HeadingBlockProps>;
        label?: string;
        defaultProps?: import("./Content/HeadingBlock/type").HeadingBlockProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Content/HeadingBlock/type").HeadingBlockProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"text" | "fontSize" | "fontWeight" | "level" | "textAlign" | "italic" | "textColorLight" | "textColorDark" | "decorationEnabled" | "decorationWidth" | "decorationThickness" | "decorationSpacing" | "decorationColorLight" | "decorationColorDark" | "underlineMode" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "clipboard" | "textColor" | "decorationColor" | "styleClipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Content/HeadingBlock/type").HeadingBlockProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Content/HeadingBlock/type").HeadingBlockProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Content/HeadingBlock/type").HeadingBlockProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Content/HeadingBlock/type").HeadingBlockProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"text" | "fontSize" | "fontWeight" | "level" | "textAlign" | "italic" | "textColorLight" | "textColorDark" | "decorationEnabled" | "decorationWidth" | "decorationThickness" | "decorationSpacing" | "decorationColorLight" | "decorationColorDark" | "underlineMode" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "clipboard" | "textColor" | "decorationColor" | "styleClipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/HeadingBlock/type").HeadingBlockProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/HeadingBlock/type").HeadingBlockProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"text" | "fontSize" | "fontWeight" | "level" | "textAlign" | "italic" | "textColorLight" | "textColorDark" | "decorationEnabled" | "decorationWidth" | "decorationThickness" | "decorationSpacing" | "decorationColorLight" | "decorationColorDark" | "underlineMode" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "clipboard" | "textColor" | "decorationColor" | "styleClipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/HeadingBlock/type").HeadingBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    RichTextBlock: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Content/RichTextBlock/type").RichTextBlockProps>;
        label?: string;
        defaultProps?: import("./Content/RichTextBlock/type").RichTextBlockProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Content/RichTextBlock/type").RichTextBlockProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"content" | "clipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Content/RichTextBlock/type").RichTextBlockProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Content/RichTextBlock/type").RichTextBlockProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Content/RichTextBlock/type").RichTextBlockProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Content/RichTextBlock/type").RichTextBlockProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"content" | "clipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/RichTextBlock/type").RichTextBlockProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/RichTextBlock/type").RichTextBlockProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"content" | "clipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/RichTextBlock/type").RichTextBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    AccordionBlock: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Content/Accordion/type").AccordionPropsPuck>;
        label?: string;
        defaultProps?: import("./Content/Accordion/type").AccordionPropsPuck | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Content/Accordion/type").AccordionPropsPuck, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"sections" | "clipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Content/Accordion/type").AccordionPropsPuck, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Content/Accordion/type").AccordionPropsPuck, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Content/Accordion/type").AccordionPropsPuck, {}> | Promise<import("@puckeditor/core").Fields<import("./Content/Accordion/type").AccordionPropsPuck, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"sections" | "clipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/Accordion/type").AccordionPropsPuck> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/Accordion/type").AccordionPropsPuck> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"sections" | "clipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/Accordion/type").AccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    SingleAccordion: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck>;
        label?: string;
        defaultProps?: import("./Content/SingleAccordion/type").SingleAccordionPropsPuck | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"title" | "content" | "clipboard" | "defaultOpen", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, {}> | Promise<import("@puckeditor/core").Fields<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"title" | "content" | "clipboard" | "defaultOpen", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"title" | "content" | "clipboard" | "defaultOpen", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/SingleAccordion/type").SingleAccordionPropsPuck, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    CombinationLock: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Content/CombinationLock/type").CombinationLockProps>;
        label?: string;
        defaultProps?: import("./Content/CombinationLock/type").CombinationLockProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Content/CombinationLock/type").CombinationLockProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"scale" | "sequences" | "interval" | "spinDuration" | "cycles" | "clipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Content/CombinationLock/type").CombinationLockProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Content/CombinationLock/type").CombinationLockProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Content/CombinationLock/type").CombinationLockProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Content/CombinationLock/type").CombinationLockProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"scale" | "sequences" | "interval" | "spinDuration" | "cycles" | "clipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/CombinationLock/type").CombinationLockProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Content/CombinationLock/type").CombinationLockProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"scale" | "sequences" | "interval" | "spinDuration" | "cycles" | "clipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Content/CombinationLock/type").CombinationLockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    SingleImage: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/SingleImage/type").SingleImageProps>;
        label?: string;
        defaultProps?: import("./Media/SingleImage/type").SingleImageProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/SingleImage/type").SingleImageProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "href" | "clipboard" | "imageMode", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/SingleImage/type").SingleImageProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/SingleImage/type").SingleImageProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/SingleImage/type").SingleImageProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/SingleImage/type").SingleImageProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "href" | "clipboard" | "imageMode", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/SingleImage/type").SingleImageProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/SingleImage/type").SingleImageProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "href" | "clipboard" | "imageMode", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SingleImage/type").SingleImageProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    ImageWithText: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/ImageWithText/type").ImageWithTextProps>;
        label?: string;
        defaultProps?: import("./Media/ImageWithText/type").ImageWithTextProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/ImageWithText/type").ImageWithTextProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "content" | "href" | "clipboard" | "imageMode" | "imagePosition" | "stackOrder", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/ImageWithText/type").ImageWithTextProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/ImageWithText/type").ImageWithTextProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/ImageWithText/type").ImageWithTextProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/ImageWithText/type").ImageWithTextProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "content" | "href" | "clipboard" | "imageMode" | "imagePosition" | "stackOrder", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/ImageWithText/type").ImageWithTextProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/ImageWithText/type").ImageWithTextProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "content" | "href" | "clipboard" | "imageMode" | "imagePosition" | "stackOrder", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithText/type").ImageWithTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    ImageWithSlot: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/ImageWithSlot/type").ImageWithSlotProps>;
        label?: string;
        defaultProps?: import("./Media/ImageWithSlot/type").ImageWithSlotProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/ImageWithSlot/type").ImageWithSlotProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "content" | "href" | "clipboard" | "imageMode" | "imagePosition" | "stackOrder", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/ImageWithSlot/type").ImageWithSlotProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/ImageWithSlot/type").ImageWithSlotProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/ImageWithSlot/type").ImageWithSlotProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/ImageWithSlot/type").ImageWithSlotProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "content" | "href" | "clipboard" | "imageMode" | "imagePosition" | "stackOrder", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/ImageWithSlot/type").ImageWithSlotProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/ImageWithSlot/type").ImageWithSlotProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "content" | "href" | "clipboard" | "imageMode" | "imagePosition" | "stackOrder", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageWithSlot/type").ImageWithSlotProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    ImageOverlayText: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/ImageOverlayText/type").ImageOverlayTextProps>;
        label?: string;
        defaultProps?: import("./Media/ImageOverlayText/type").ImageOverlayTextProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "href" | "clipboard" | "overlay" | "imageMode", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "href" | "clipboard" | "overlay" | "imageMode", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/ImageOverlayText/type").ImageOverlayTextProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/ImageOverlayText/type").ImageOverlayTextProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "alt" | "src" | "href" | "clipboard" | "overlay" | "imageMode", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/ImageOverlayText/type").ImageOverlayTextProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    SliderBlock: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/SliderBlock/type").SliderBlockProps>;
        label?: string;
        defaultProps?: import("./Media/SliderBlock/type").SliderBlockProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/SliderBlock/type").SliderBlockProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "autoPlay" | "imageMode" | "slides" | "autoPlayInterval", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/SliderBlock/type").SliderBlockProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/SliderBlock/type").SliderBlockProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/SliderBlock/type").SliderBlockProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/SliderBlock/type").SliderBlockProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "autoPlay" | "imageMode" | "slides" | "autoPlayInterval", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/SliderBlock/type").SliderBlockProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/SliderBlock/type").SliderBlockProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "autoPlay" | "imageMode" | "slides" | "autoPlayInterval", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderBlock/type").SliderBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    SliderShowcaseBlock: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps>;
        label?: string;
        defaultProps?: import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "autoPlay" | "imageMode" | "slides" | "autoPlayInterval" | "desktopHeight" | "mobileHeight", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "autoPlay" | "imageMode" | "slides" | "autoPlayInterval" | "desktopHeight" | "mobileHeight", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"clipboard" | "autoPlay" | "imageMode" | "slides" | "autoPlayInterval" | "desktopHeight" | "mobileHeight", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/SliderShowcaseBlock/type").SliderShowcaseBlockProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    Gallery: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Media/Gallery/type").GalleryProps>;
        label?: string;
        defaultProps?: import("./Media/Gallery/type").GalleryProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Media/Gallery/type").GalleryProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"items" | "clipboard" | "gridSize" | "imageMode", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Media/Gallery/type").GalleryProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Media/Gallery/type").GalleryProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Media/Gallery/type").GalleryProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Media/Gallery/type").GalleryProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"items" | "clipboard" | "gridSize" | "imageMode", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/Gallery/type").GalleryProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Media/Gallery/type").GalleryProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"items" | "clipboard" | "gridSize" | "imageMode", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Media/Gallery/type").GalleryProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    LinkBar: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Actions/LinkBar/type").LinkBarProps>;
        label?: string;
        defaultProps?: import("./Actions/LinkBar/type").LinkBarProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Actions/LinkBar/type").LinkBarProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"links" | "clipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Actions/LinkBar/type").LinkBarProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Actions/LinkBar/type").LinkBarProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Actions/LinkBar/type").LinkBarProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Actions/LinkBar/type").LinkBarProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"links" | "clipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Actions/LinkBar/type").LinkBarProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Actions/LinkBar/type").LinkBarProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"links" | "clipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Actions/LinkBar/type").LinkBarProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    ButtonLink: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Actions/ButtonLink/type").ButtonLinkProps>;
        label?: string;
        defaultProps?: import("./Actions/ButtonLink/type").ButtonLinkProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Actions/ButtonLink/type").ButtonLinkProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"color" | "text" | "url" | "icon" | "openInNewTab" | "borderRadius" | "clipboard", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Actions/ButtonLink/type").ButtonLinkProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Actions/ButtonLink/type").ButtonLinkProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Actions/ButtonLink/type").ButtonLinkProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Actions/ButtonLink/type").ButtonLinkProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"color" | "text" | "url" | "icon" | "openInNewTab" | "borderRadius" | "clipboard", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Actions/ButtonLink/type").ButtonLinkProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Actions/ButtonLink/type").ButtonLinkProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"color" | "text" | "url" | "icon" | "openInNewTab" | "borderRadius" | "clipboard", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Actions/ButtonLink/type").ButtonLinkProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    YoutubeEmbed: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps>;
        label?: string;
        defaultProps?: import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "title" | "url" | "clipboard" | "autoPlay" | "startSeconds" | "muted", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "title" | "url" | "clipboard" | "autoPlay" | "startSeconds" | "muted", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "title" | "url" | "clipboard" | "autoPlay" | "startSeconds" | "muted", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Embed/YoutubeEmbed/type").YoutubeEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
    GoogleMapsEmbed: Omit<{
        render: import("@puckeditor/core").PuckComponent<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps>;
        label?: string;
        defaultProps?: import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps | undefined;
        fields?: import("@puckeditor/core").Fields<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, {}> | undefined;
        permissions?: Partial<import("@puckeditor/core").Permissions>;
        inline?: boolean;
        resolveFields?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "title" | "url" | "clipboard" | "allowFullScreen", boolean> & {
                id: string;
            }>;
            fields: import("@puckeditor/core").Fields<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, {}>;
            lastFields: import("@puckeditor/core").Fields<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, {}>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            appState: import("@puckeditor/core").AppState;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => import("@puckeditor/core").Fields<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, {}> | Promise<import("@puckeditor/core").Fields<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, {}>>) | undefined;
        resolveData?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "title" | "url" | "clipboard" | "allowFullScreen", boolean> & {
                id: string;
            }>;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            metadata: import("@puckeditor/core").ComponentMetadata;
            trigger: import("@puckeditor/core").ResolveDataTrigger;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => (Omit<Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps> | undefined;
        }) | Promise<Omit<Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, "props"> & {
            props?: Partial<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps> | undefined;
        }>) | undefined;
        resolvePermissions?: ((data: Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type">, params: {
            changed: Partial<Record<"height" | "title" | "url" | "clipboard" | "allowFullScreen", boolean> & {
                id: string;
            }>;
            lastPermissions: Partial<import("@puckeditor/core").Permissions>;
            permissions: Partial<import("@puckeditor/core").Permissions>;
            appState: import("@puckeditor/core").AppState;
            lastData: Omit<import("@puckeditor/core").ComponentData<import("./Embed/GoogleMapsEmbed/type").GoogleMapsEmbedProps, string, Record<string, import("@puckeditor/core").DefaultComponentProps>>, "type"> | null;
            parent: import("@puckeditor/core").ComponentData | null;
        }) => Promise<Partial<import("@puckeditor/core").Permissions>> | Partial<import("@puckeditor/core").Permissions>) | undefined;
        metadata?: import("@puckeditor/core").ComponentMetadata;
    } & import("@puckeditor/core").ComponentConfigExtensions, "type">;
};
//# sourceMappingURL=index.d.ts.map