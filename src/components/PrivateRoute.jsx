import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
      <div className="">
        <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-800" />
      </div>
        <p className="m-5 p5">Loading...</p>
</div>
    );
  }

  return <>{user ? children : null}</>;
};

export default PrivateRoute;
