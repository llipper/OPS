declare module '@tabler/icons-react' {
    import { FC, SVGProps } from 'react';

    export interface TablerIconProps extends Omit<SVGProps<SVGSVGElement>, 'stroke'> {
        size?: number | string;
        stroke?: string;
        strokeWidth?: number | string;
    }

    export type TablerIcon = FC<TablerIconProps>;
    
    // Lista completa dos ícones utilizados no Elite OPS
    export const IconDashboard: TablerIcon;
    export const IconBook: TablerIcon;
    export const IconNotebook: TablerIcon;
    export const IconTrophy: TablerIcon;
    export const IconChartBar: TablerIcon;
    export const IconMessage: TablerIcon;
    export const IconFolder: TablerIcon;
    export const IconAlertTriangle: TablerIcon;
    export const IconBriefcase: TablerIcon;
    export const IconSignal4g: TablerIcon;
    export const IconSchool: TablerIcon;
    export const IconBuildingBank: TablerIcon;
    export const IconClipboardList: TablerIcon;
    export const IconBrain: TablerIcon;
    export const IconBookmark: TablerIcon;
    export const IconLibrary: TablerIcon;
    export const IconShieldLock: TablerIcon;
    export const IconChevronRight: TablerIcon;
    export const IconInnerShadowTop: TablerIcon;
    export const IconSettings: TablerIcon;
    export const IconSearch: TablerIcon;
    export const IconHelp: TablerIcon;
    export const IconLogout: TablerIcon;
    export const IconUser: TablerIcon;
}
