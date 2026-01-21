import forumBGImage from "../../assets/images/forumBGImg.png";
import InfoSection from "../../components/common/InfoSection.jsx";

export default function ForumSection() {
  return (
    <>
    <InfoSection
      imgSrc={forumBGImage}
      title="Have something to say?"
      href="/forum"
      buttonText="Join the Forum"
    />
    </>
  );
}
