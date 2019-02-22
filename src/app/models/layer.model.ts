/**
 *
 *
 * @export
 */
export interface Layer {
    id: string;
    source: any;
    enabled: boolean;
    collada?: {
        loader: any,
        init: { dirPath: string },
        load: { name: string, callback: (scene: any) => void }
    };
}
