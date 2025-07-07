export declare class ConnextComponent {
    private target;
    private renderFn;
    private isDestroyed;
    constructor(target: HTMLElement, renderFn: (target: HTMLElement) => void);
    render(): void;
    destroy(): void;
}
export declare class ConnextRouter {
    private routes;
    private currentRoute;
    constructor();
    addRoute(path: string, handler: () => void): void;
    navigate(path: string): void;
    private handleRouteChange;
    getCurrentRoute(): string;
}
export declare const router: ConnextRouter;
