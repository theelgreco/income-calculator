declare module '@jamescoyle/vue-icon' {
    import { defineComponent } from 'vue'

    export interface IconProps {
        type?: string;
        path: string;
        size?: string | number;
        viewbox?: string;
        flip?: string;
        rotate?: number; 
    }

    const SvgIcon: defineComponent<IconProps>;
    export default SvgIcon;
}