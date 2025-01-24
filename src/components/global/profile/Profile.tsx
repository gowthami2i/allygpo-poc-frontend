// import React, { useState } from 'react';
// import './profile.scss'
// interface AvatarProps {
// name: string;
// }

// const Profile: React.FC<AvatarProps> = ({ name }) => {
// // Function to generate initials from the name
// const [isProfile, setIsProfile] = useState(false);
// const getInitials = (fullName: string): string => {
//     const words = fullName.split(' ');
//     if (words.length === 1) {
//     return words[0].charAt(0).toUpperCase();
//     }
//     return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
// };

// return (
//     <>
//     <div className="avatar mt-2" onClick={()=>setIsProfile(true)}>
//     {getInitials(name)}
//     </div>
//     {isProfile&&(
//         <div className="profile">Logout</div>
//     )}
//     </>
// );
// };

// export default Profile;
import React, { useState } from "react";
import "./profile.scss";
import { usePageNavigation } from "../../../hook/global/UsePageNavigation";
import { useAuth } from "../../../context/AuthContext";

interface AvatarProps {
  name: string;
}

const Profile: React.FC<AvatarProps> = () => {
  const [isProfile, setIsProfile] = useState(false);
  const userEmail = sessionStorage?.getItem("userEmail") ||"Guest";

  const { navigateTo } = usePageNavigation();
  const { logout } = useAuth(); 
  // Function to generate initials from the name
  const getInitials = (fullName: string): string => {
    const words = fullName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
  };
  
  return (
    <div className="profile-container">
      <div className="avatar mt-2" onClick={() => setIsProfile(!isProfile)}>
        {getInitials(userEmail)}
      </div>
      {isProfile && (
        <div
          className="profile cursor-pointer"
          onClick={() => {
            logout();
            sessionStorage.removeItem("userEmail")
            sessionStorage.removeItem("isAuthenticated")
            navigateTo("/login");
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default Profile;
