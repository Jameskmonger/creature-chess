import * as React from "react";

const Projectile: React.FunctionComponent = () => (
    <svg className="projectile" height="10" width="10">
        <circle cx="5" cy="5" r="4" stroke="black" stroke-width="3" fill="red" />
    </svg>

);

export { Projectile };
