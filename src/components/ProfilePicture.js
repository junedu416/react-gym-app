import DefaultProfile from "../assets/default-profile.png";
import { ProfileImage } from "../styled-components/profile";

export const ProfilePicture = (profile) => {
  // const hasProfileImage = Boolean(profile.photo !== null);
  // console.log("has photo? : ", hasProfileImage)

  console.log("Profile Object: ", profile);
  // console.log("profile photo: ", profile.profile.photo);

  return (
    <ProfileImage
      src={profile.profile.photo ? profile.profile.photo : DefaultProfile}
      alt="profile avatar"
    />
  );
};
