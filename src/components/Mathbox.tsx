import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Color } from "three/src/math/Color";
import * as MB from "mathbox";

type Props = {
  element: HTMLElement;
};

const Mathbox = (props: Props) => {
  useEffect(() => {
    const mathbox = MB.mathBox({
      plugins: ["core", "controls", "cursor"],
      controls: {
        klass: OrbitControls,
      },
      element: props.element,
    });

    mathbox.three.camera.position.set(1, 1, 2);
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0);

    const view = mathbox.cartesian({
      range: [
        [-2, 2],
        [-1, 1],
        [-1, 1],
      ],
      scale: [2, 1, 1],
    });
    view.grid({
      divideX: 20,
      width: 5,
      opacity: 0.3,
    });
  }, [props.element]);
  return null;
};

export default Mathbox;
