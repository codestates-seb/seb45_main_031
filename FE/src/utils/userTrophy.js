import level0 from "../assets/images/level0.png";
import level1 from "../assets/images/level1.png";
import level2 from "../assets/images/level2.png";
import level3 from "../assets/images/level3.png";

const userTrophy = (userStatus) => {
  if (userStatus.level === 0) {
    return level0;
  } else if (userStatus.level === 1) {
    return level1;
  } else if (userStatus.level === 2) {
    return level2;
  } else {
    return level3;
  }
};

export default userTrophy;
