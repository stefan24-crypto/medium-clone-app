import Overlay from "./Overlay";
import React, { useRef, useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import useStyles from "../../styles";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PortraitIcon from "@mui/icons-material/Portrait";
import Button from "../UI/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { User } from "../../models";
import { doc, setDoc } from "firebase/firestore";

interface LoginProps {
  stopShowingLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ stopShowingLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const profilePicRef = useRef<HTMLInputElement>();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (!isLogin) {
      const displayName = usernameRef.current!.value;
      const photoURL = profilePicRef.current!.value;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
      } catch (error) {
        alert(error);
      }
      const userData: User = {
        id: auth.currentUser!.uid,
        name: displayName,
        pic: photoURL,
        posts: [],
      };
      await setDoc(doc(db, "users", auth.currentUser!.uid), userData);
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert(error.message)
      );
    }
    stopShowingLogin();
  };

  return (
    <>
      <Overlay onClick={stopShowingLogin} />
      <form
        className="absolute bg-white p-8 rounded-lg w-1/2 z-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-[fadeTop_0.5s_ease-in-out]"
        onSubmit={submitHandler}
      >
        <header className="border-l-4 border-black pl-2 ">
          <h1 className="text-3xl font-bold ">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
        </header>
        <main className="flex flex-col gap-8 mt-8">
          <TextField
            variant="standard"
            label="Email"
            required
            type="email"
            inputRef={emailRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="password"> Password</InputLabel>
            <Input
              id="password"
              type={!showPassword ? "password" : "text"}
              inputRef={passwordRef}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {!isLogin && (
            <div className="grid grid-cols-2 gap-8">
              <TextField
                variant="standard"
                label="Username"
                type="text"
                inputRef={usernameRef}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="standard"
                label="Profile Picture "
                type="text"
                required
                inputRef={profilePicRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PortraitIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}
          <div className="flex justify-between gap-8 ">
            <Button
              type="button"
              className="w-1/2"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Button>
            <Button type="submit" className="w-1/2">
              Submit
            </Button>
          </div>
        </main>
      </form>
    </>
  );
};

export default Login;
