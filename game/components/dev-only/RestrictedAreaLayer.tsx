import { Map } from "immutable";
import React from "react";

interface P {
    areas: Map<AreaId, Rect>;
}

let RestrictedAreaLayer: React.ComponentClass<P> = (() => null as any) as any;

if (DEV.RESTRICTED_AREA) {
    RestrictedAreaLayer = class extends React.PureComponent<P> {
        public render() {
            const { areas } = this.props;
            return (
                <g className="restricted-area-layer">
                    {areas.map((area, areaId) => <rect key={areaId} {...area} fill="red" />).toArray()}
                </g>
            );
        }
    };
}

// tslint:disable-next-line:no-default-export
export default RestrictedAreaLayer;