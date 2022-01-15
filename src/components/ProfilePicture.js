import DefaultProfile from "../assets/default-profile.png";
import { ProfileImage } from "../styled-components/profile";

export const ProfilePicture = (profile) => {
  const hasProfileImage = Boolean(profile.photo !== undefined);
  console.log("has photo? : ", hasProfileImage)

  return (
    <ProfileImage
      src={hasProfileImage ? profile.photo : DefaultProfile}
    />
  );
};
