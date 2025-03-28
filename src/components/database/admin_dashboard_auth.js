import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Function to check user role
const checkUserRole = async (callback) => {
  const auth = getAuth();
  const db = getFirestore();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid); // Reference the user's document
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          callback(role); // Pass the role back to the component
        } else {
          console.error("No user document found in Firestore.");
          callback(null); // If no document is found
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        callback(null);
      }
    } else {
      callback(null); // No user is signed in
    }
  });
};

export default checkUserRole;