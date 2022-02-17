import { Avatar } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../pages/firebase";
import { useAppSelector } from "../../store/hooks";

interface UserProps {
  id: string;
  name: string;
  pic: string;
  bio: string;
}

const User: React.FC<UserProps> = ({ id, name, pic, bio }) => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const users = useAppSelector((state) => state.data.users);
  const curUserProfile = users.find((each) => each.id === curUser?.uid);
  const clickedOnUserProfile = users.find((user) => user.id === id);
  const followingUsersIDs = curUserProfile?.following?.map((each) => each.id);

  const followHandler = async () => {
    const userDoc = doc(db, "users", curUser?.uid);
    const newFields = {
      following: [
        ...curUserProfile!.following,
        {
          id: id,
          name: name,
          pic: pic,
        },
      ],
    };
    await updateDoc(userDoc, newFields);
    const clickedOnUserDoc = doc(db, "users", id);
    const newFields2 = {
      followed_by: [
        ...clickedOnUserProfile!.followed_by,
        {
          id: curUserProfile?.id,
          name: curUserProfile?.name,
          pic: curUserProfile?.pic,
        },
      ],
    };
    await updateDoc(clickedOnUserDoc, newFields2);
  };
  return (
    <div className="px-8 py-4 flex gap-4">
      <div>
        <Avatar src={pic} alt="profile" />
      </div>
      <div>
        <p className="font-bold text-lg text-slate-800">{name}</p>
        <span className="text-sm">{bio}</span>
      </div>
      {curUser && (
        <div>
          {followingUsersIDs?.includes(id) ? (
            <p>Following</p>
          ) : (
            <button
              className="px-4 py-1 border border-black rounded-full font-normal text-gray-800 hover:bg-black hover:text-white"
              onClick={followHandler}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
