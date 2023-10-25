import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import {
  doc,
  collection,
  getDoc,
} from "firebase/firestore";

const getUserDoc = async (email) => {
  const userDocRef = doc(collection(firestore, "users"), email);
  const userDocSnapshot = await getDoc(userDocRef);
  return userDocSnapshot;
};

const useCurrentUserRole = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userEmail = user.email;
        const userDocSnapshot = await getUserDoc(userEmail);
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const role = userData.role;
          setUserRole(role);
        } else {
          setUserRole(null); // User document doesn't exist
        }
      } else {
        setUserRole(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return userRole;
};

export default useCurrentUserRole;
