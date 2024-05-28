"use client";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import Features from "@/components/features";
import Image from "next/image";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

    useEffect(() => {
      if(user?.uid){
        router.push('/dashboard')
      }
      
  
    }, [user]);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/Logos/ForeverHomeBuyerLogo.png"
            alt="FHB Deal Analyser Logo"
            width={80}
            height={10}
            className="mr-4"
          />
          
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </nav>

      <main className="pt-24">
        <section className="hero text-center py-20">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to FHB Deal Analyser
          </h1>
          <p className="text-xl mb-8">
            This web app is exclusively available for FHB Team members
          </p>
          <button
            className="bg-white text-blue-500 px-8 py-3 rounded-md text-lg font-bold shadow-md hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </section>
        <section>
          <Features />
        </section>
      </main>

      <footer className="bg-white text-gray-600 py-4 text-center">
        &copy; Forever Home Buyers, LLC {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Home;
