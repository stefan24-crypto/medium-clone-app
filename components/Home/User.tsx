import { Avatar } from "@mui/material";

interface UserProps {
  id: string;
  name: string;
  pic: string;
  bio: string;
}

const User: React.FC<UserProps> = ({ id, name, pic, bio }) => {
  return (
    <div className="px-8 py-4 flex gap-4">
      <div>
        <Avatar src={pic} alt="profile" />
      </div>
      <div>
        <p className="font-bold text-lg text-slate-800">{name}</p>
        <span className="text-sm">{bio}</span>
      </div>
      <div>
        <button className="px-4 py-1 border border-black rounded-full font-normal text-gray-800 hover:bg-black hover:text-white">
          Follow
        </button>
      </div>
    </div>
  );
};

export default User;
