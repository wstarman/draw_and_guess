import { ref, type Ref } from "vue";
import { type Message, type Player, GameState } from "./types";

export class Game {
    static gameState: Ref<GameState> = ref(GameState.homepage);
    static myNickname = ref("");
    static myScore = ref(0);
    static isHoster = ref(false);
    static roomId = ref("")
    static countDown = ref(99);
    static hintWord = ref("");
    static answer = ref("");
    static messages: Ref<Message[]> = ref([]);
    static players: Ref<Player[]> = ref([]);
}