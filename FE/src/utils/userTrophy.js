const localUser = JSON.parse(localStorage.getItem("localUser"));

import level0 from "../assets/images/level0.png";
import level1 from "../assets/images/level1.png";
import level2 from "../assets/images/level2.png";
import level3 from "../assets/images/level3.png";

const userTrophy = () => {
  if (localUser.level === 0) {
    return level0;
  } else if (localUser.level === 1) {
    return level1;
  } else if (localUser.level === 2) {
    return level2;
  } else {
    return level3;
  }
};

export default userTrophy;
