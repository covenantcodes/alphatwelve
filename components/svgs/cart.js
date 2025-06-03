import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Cart({ width, height, color, ...props }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 16h7.263c4.488 0 5.17-2.82 5.998-6.93.239-1.187.358-1.78.071-2.175-.287-.395-.837-.395-1.938-.395H6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 16L5.379 3.515A2 2 0 003.439 2H2.5m6.38 14h-.411C7.105 16 6 17.151 6 18.571a.42.42 0 00.411.429H17.5M10.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Cart;
