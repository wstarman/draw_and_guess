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

export enum GameState {
    "homepage",     // in the homepage
    "waitingRoom",  // in the waiting room
    "selecting",    // selecting a word to draw
    "drawing",      // player are drawing
    "waitingOtherSelecting",    // other drawer is selecting
    "guessing",     // other is drawing
    "guessed",      // player already gussed the word
    "revealing",    // the answer is revealing
    "awarding"      // game over, and showing rank and score
}