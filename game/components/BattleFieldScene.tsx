import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import { BLOCK_SIZE as B } from "../utils/constants";
import BrickLayer from "./BrickLayer";
import Bullet from "./Bullet";
import CurtainsContainer from "./CurtainsContainer";
import RestrictedAreaLayer from "./dev-only/RestrictedAreaLayer";
import SpotGraph from "./dev-only/SpotGraph";
import TankPath from "./dev-only/TankPath";
import Eagle from "./Eagle";
import Explosion from "./Explosion";
import Flicker from "./Flicker";
import ForestLayer from "./ForestLayer";
// import HUD from "./HUD";
import PauseIndicator from "./PauseIndicator";
import PowerUp from "./PowerUp";
import RiverLayer from "./RiverLayer";
import Score from "./Score";
import Screen from "./Screen";
import SnowLayer from "./SnowLayer";
import SteelLayer from "./SteelLayer";
import TankHelmet from "./TankHelmet";
import { Tank } from "./tanks";
import TextLayer from "./TextLayer";

export class BattleFieldContent extends React.PureComponent<Partial<State & Point>> {
    public render() {
        const { x = 0, y = 0, bullets, map, explosions, flickers, tanks, powerUps, scores } = this.props;
        const { bricks, steels, rivers, snows, forests, eagle, restrictedAreas } = map.toObject();
        const aliveTanks = tanks.filter(t => t.alive);
        return (
            <g className="battle-field" transform={`translate(${x},${y})`}>
                <rect width={13 * B} height={13 * B} fill="url(#bgpattern3)" />
                <RiverLayer rivers={rivers} />
                <SteelLayer steels={steels} />
                <BrickLayer bricks={bricks} />
                <SnowLayer snows={snows} />
                {eagle ? <Eagle x={eagle.x} y={eagle.y} broken={eagle.broken} /> : null}
                <g className="bullet-layer">{bullets.map((b, i) => <Bullet key={i} bullet={b} />).valueSeq()}</g>
                <g className="tank-layer">
                    {aliveTanks
                        .map(tank => <Tank key={tank.tankId} tank={tank} showReservedIndicator={true} />)
                        .valueSeq()}
                </g>
                <g className="helmet-layer">
                    {aliveTanks
                        .map(tank =>
                            tank.helmetDuration > 0 ? <TankHelmet key={tank.tankId} x={tank.x} y={tank.y} /> : null,
                        )
                        .valueSeq()}
                </g>
                {/* 因为坦克/子弹可以"穿过"森林, 所以 <ForestLayer /> 需要放在 tank-layer 和 bullet-layer 的后面 */}
                <ForestLayer forests={forests} />
                <RestrictedAreaLayer areas={restrictedAreas} />
                <g className="power-up-layer">
                    {powerUps.map(powerUp => <PowerUp key={powerUp.powerUpId} powerUp={powerUp} />).valueSeq()}
                </g>
                <g className="explosion-layer">
                    {explosions.map(exp => <Explosion key={exp.explosionId} explosion={exp} />).valueSeq()}
                </g>
                <g className="flicker-layer">
                    {flickers.map(flicker => <Flicker key={flicker.flickerId} flicker={flicker} />).valueSeq()}
                </g>
                <g className="score-layer">
                    {scores.map(s => <Score key={s.scoreId} score={s.score} x={s.x} y={s.y} />).valueSeq()}
                </g>
                <SpotGraph />
                <TankPath />
            </g>
        );
    }
}

// tslint:disable-next-line:max-classes-per-file
class BattleFieldScene extends React.PureComponent<State> {
    public renderDefs() {
        return (
            <defs>
                <pattern id="bgpattern3" patternUnits="userSpaceOnUse" width="10" height="10">
                    <image
                        href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+CjxmaWx0ZXIgaWQ9Im4iPgo8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjEwIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KPC9maWx0ZXI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4="
                        x="0"
                        y="0"
                        width="10"
                        height="10"
                    />
                </pattern>
            </defs>
        );
    }

    public render() {
        const { game, texts } = this.props;

        return (
            <Screen>
                {/* <HUD /> */}
                {this.renderDefs()}
                <BattleFieldContent {...this.props} x={0} y={0} />
                <TextLayer texts={texts} />
                <CurtainsContainer />
                {game.paused ? <PauseIndicator x={6.25 * B} y={8 * B} /> : null}
            </Screen>
        );
    }
}

export default connect<State>(_.identity)(BattleFieldScene);
