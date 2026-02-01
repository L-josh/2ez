import { NamedTupleMember } from 'typescript';

import { PLAYER_HEIGHT, PLAYER_WIDTH } from './constants';

export interface LevelData {
    platforms: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        color: number;
    }>;
    player1Start: { x: number; y: number };
    player2Start: { x: number; y: number };
    exit1: { x: number; y: number };
    exit2: { x: number; y: number };
}

export const levels: LevelData[] = [
    // basic levels for now, we can json load later
    {
        // level 1
        platforms: [
            { x: 400, y: 568, width: 800, height: 64, color: 0x444444 },
            { x: 200, y: 400, width: 200, height: 32, color: 0x444444 },
            { x: 600, y: 300, width: 200, height: 32, color: 0x444444 },
        ],
        player1Start: { x: 100, y: 450 },
        player2Start: { x: 100 + PLAYER_WIDTH + 5, y: 450 },
        exit1: { x: 600, y: 200 },
        exit2: { x: 700, y: 200 },
    },
    {
        // level 2
        platforms: [
            { x: 400, y: 568, width: 800, height: 64, color: 0x444444 }, // floor
            { x: 600, y: 300, width: 200, height: 32, color: 0x444444 },
        ],
        player1Start: { x: 100, y: 450 },
        player2Start: { x: 100 + PLAYER_WIDTH + 5, y: 450 },
        exit1: { x: 600, y: 500 },
        exit2: { x: 700, y: 200 },
    },
    {
        // level 3
        platforms: [
            { x: 0, y: 500, width: 100, height: 128, color: 0x444444 },
            { x: 0, y: 300, width: 100, height: 128, color: 0x444444 },
            { x: 250, y: 100, width: 400, height: 32, color: 0x444444 },
            { x: 400, y: 568, width: 800, height: 64, color: 0x444444 },
        ],
        player1Start: { x: 100, y: 450 },
        player2Start: { x: 100 + PLAYER_WIDTH + 5, y: 450 },
        exit1: { x: 600, y: 200 },
        exit2: { x: 700, y: 200 },
    },
];
