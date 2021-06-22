import React, { useState, useEffect } from "react";
import { ClassRocket, FunctionalRocket } from "./Rocket";
import "../styles/_launchpad.scss";

export default function LaunchPad() {
  const [rerenderCount, triggerRerender] = useState(0);

  useEffect(() => {
    setTimeout(() => triggerRerender(rerenderCount + 1), 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="launchpad">
      <ClassRocket />
    </div>
  );
}
