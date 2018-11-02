import { List } from "immutable";
import { combineReducers } from "redux";
import { MapRecord, PlayerRecord } from "../types";
import { StageConfig } from "../types/StageConfig";
import { map } from "./map";
import { player1, player2 } from "./players";
import { stages } from "./stages";

export interface State {
    /**
     * 这是测试状态
     */
    test?: any;
    stages: List<StageConfig>;
    map: MapRecord;
    player1: PlayerRecord;
    player2: PlayerRecord;
}

export const rootReducer = combineReducers<State>({
    test: (state = 0) => state,
    stages,
    map,
    player1,
    player2,
});
