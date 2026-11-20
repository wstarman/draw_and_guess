export type Message = {
    sender: String;
    content: String;
    isAnswer: boolean;
}

export type Player = {
    nickname: String;
    score: number;
    isDrawer: boolean;
    isMe: boolean;
}

export type GameState = "waitingToStart" | "selecting" | "drawing" | "waitingToSelect" | "guessing" | "guessed" | "revealing" | "awarding"