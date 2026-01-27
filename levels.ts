import { NamedTupleMember } from "typescript";

export interface LevelData {
    platforms: Array<{ x: number; y: number; width: number; height: number }>;
    playerStart: { x: number; y: number };
    exit: { x: number; y: number };
}

export const levels: LevelData[] = [
    // basic levels for now, we can json load later
    { 
        platforms: [
            { x: 400, y: 568, width: 800, height: 64 },
            { x: 200, y: 400, width: 200, height: 32 },
            { x: 600, y: 300, width: 200, height: 32 },
        ],
        playerStart: { x: 100, y: 450 },
        exit: { x: 700, y: 200 }
    }
]