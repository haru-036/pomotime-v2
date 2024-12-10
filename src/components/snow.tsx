import Snowfall from "react-snowfall";

function Snow() {
  return (
    <Snowfall
      style={{ position: "fixed", width: "100vw", height: "100vh" }}
      speed={[0.5, 4]}
      wind={[1, 3]}
      radius={[2, 6]}
    />
  );
}

export default Snow;
