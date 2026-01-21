import forumBGImage from "../../assets/images/forumBGImg.png";
import InfoSection from "../../components/common/InfoSection.jsx";

export default function ForumSection() {
  return (
    <>
    <h2 className="h2_style">Forum</h2>
    <h3 className="h3_style">Join the forum to discuss the Harry Potter universe.</h3>
    <InfoSection
      imgSrc={forumBGImage}
      title="Have something to say?"
      href="/forum"
      buttonText="Join the Forum"
    />
    </>
  );
}
