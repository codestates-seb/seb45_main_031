import Title from "./Title";
import Tips from "./Tips";

const EditTipContents = ({ TITLE, TIP_TITLE, TIPS }) => {
  return (
    <>
      <Title TITLE={TITLE} />
      <Tips TIP_TITLE={TIP_TITLE} TIPS={TIPS} />
    </>
  );
};

export default EditTipContents;
