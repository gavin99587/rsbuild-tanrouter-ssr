export type AppLoadContext = {
  nick: string,
  entryFiles?: {
    js?: string[];
    css?: string[];
  };
}
