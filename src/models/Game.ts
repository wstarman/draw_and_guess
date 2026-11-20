import type { Message, Player, GameState } from "./types";

export class Game {
    static gameState: GameState = "guessing";
    static myNickname: String = "";
    static myScore: Number = 0;
    static isDrawer: boolean = false;
    static countDown: 99;
    static isOwner: false;
    static messages: Message[] = [     // TODO: remove testing data
        {
            sender: "aaa",
            content: "test",
            isAnswer: false
        },
        {
            sender: "bbb",
            content: "test2",
            isAnswer: false
        },
        {
            sender: "aaa",
            content: "answer",
            isAnswer: true
        }
    ];
    static players: Player[] = [// TODO: remove testing data
        {
            nickname: "aaa",
            score: 100,
            isDrawer: true,
            isMe: false,
        },
        {
            nickname: "bbb",
            score: 9999,
            isDrawer: false,
            isMe: true,
        },
        {
            nickname: "ccc",
            score: 0,
            isDrawer: false,
            isMe: false,
        },
    ]
}