declare module "storybook-addon-specifications" {
    export function specs(specs: any);
    export function describe(name: string, func: any): string;
    export function it(desc: string, func: any);
}