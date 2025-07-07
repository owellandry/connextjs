export declare class ConnextComponent {
    private target;
    private renderFn;
    private isDestroyed;
    private componentId;
    constructor(target: HTMLElement, renderFn: (target: HTMLElement) => void);
    render(): void;
    destroy(): void;
    getId(): string;
}
export declare class ConnextRouter {
    private routes;
    private currentRoute;
    private currentComponent;
    private isNavigating;
    constructor();
    private isInternalLink;
    addRoute(path: string, handler: () => void): void;
    navigate(path: string, replace?: boolean): void;
    private handleRouteChange;
    private matchRoute;
    getCurrentRoute(): string;
    getRouteParams(routePath: string): Record<string, string>;
    setCurrentComponent(component: ConnextComponent): void;
}
export declare const router: ConnextRouter;
