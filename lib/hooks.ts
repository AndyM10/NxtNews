import { auth, firestore } from "./firebase";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { NewsDataResponse } from "types/types";
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe: void | Unsubscribe;

    if (user) {
      const ref = doc(firestore, "users", user.uid);

      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {
    user,
    username,
  };
}
export const useGetFetchPosts = async (cursor: number) => {
  const key = process.env.API_KEY;
  const data = await fetch(
    `https://newsdata.io/api/1/news?apikey=${key}&country=gb&page${cursor}`
  );
  const responseData: NewsDataResponse = await data.json();

  return responseData.results;
};
