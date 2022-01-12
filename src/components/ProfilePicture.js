import DefaultProfile from "../assets/default-profile.png";
import { ProfileImage } from "../styled-components/profile";

export const ProfilePicture = (profile) => {
  const hasProfileImage = Boolean(profile?.photo !== undefined);
  // ============================================================
  // ============================================================
  // Change this to NULL LATER ONCE IMPLEMENTED IN BACKEND
  // ============================================================
  // ============================================================

  return (
    <ProfileImage
      src={hasProfileImage ? profile.photo : DefaultProfile}
    />
  );
};
