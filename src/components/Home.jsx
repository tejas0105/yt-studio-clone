import { useEffect, useState } from "react";

import { Mail } from "lucide-react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getUrl = async () => {
    const resp = await fetch("http://localhost:3000/request", {
      method: "get",
    });
    const data = await resp.json();
    setUrl(data?.link);
    // setIsLoading(true);
  };

  useEffect(() => {
    getUrl();
  }, [isLoading]);

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        {isLoading ? (
          <Button disabled className="bg-blue-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <a
            href={url}
            onClick={() => {
              setIsLoading(true);
            }}
            className="p-2 rounded-md flex justify-center items-center bg-blue-600 hover:bg-blue-500 duration-300 ease-in-out text-white"
          >
            <Mail className="mr-2 h-4 w-4 bg-blue-600 hover:bg-blue-500 duration-300 ease-in-out text-white" />{" "}
            Login with Email
          </a>
        )}
      </div>
    </>
  );
}

export default Home;
