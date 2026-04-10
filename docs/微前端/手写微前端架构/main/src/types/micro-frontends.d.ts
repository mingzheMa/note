declare module '../../../micro-frontends/index' {
  export interface MicroFrontendsApi {
    registerMicroApps(options: unknown[]): void
    start(options?: unknown): void
  }

  const api: MicroFrontendsApi
  export default api
}

