declare module "next-sanity" {
    export function createClient(config: any): any;
}

declare module "sanity" {
    export function defineType(config: any): any;
    export function defineField(config: any): any;
    export type SchemaTypeDefinition = Record<string, any>;
    export type Rule = any;
}
