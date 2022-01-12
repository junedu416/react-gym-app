import DefaultProfile from "../assets/default-profile.png";
import { ProfileImage } from "../styled-components/profile";

export const ProfilePicture = (profile) => {
  const hasProfileImage = Boolean(profile?.profileImage !== undefined);

  return (
    <ProfileImage
      src={hasProfileImage ? profile.profileImage : DefaultProfile}
    />
  );
};
