declare type UUID = `${string}-${string}-${string}-${string}-${string}`;
declare module "uuid" {
  export function v4(): UUID;
}
