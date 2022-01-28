import DefaultProfile from "../assets/default-profile.png";
import { ProfileImage } from "../styled-components/profile";

export const ProfilePicture = (props) => {
  // const hasProfileImage = Boolean(profile.photo !== null);
  // console.log("has photo? : ", hasProfileImage)
  const { profile, w, h, mb } = props;

  // console.log("Props in Profile Picture ", props)
  // console.log("Profile Object: ", profile);
  // console.log("profile photo: ", profile.profile.photo);

  return (
    <ProfileImage
      src={profile?.photo ? profile.photo : DefaultProfile}
      alt="profile avatar"
      w={w}
      h={h}
      mb={mb}
    />
  );
};
