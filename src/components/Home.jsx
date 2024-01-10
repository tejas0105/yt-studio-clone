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
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button>
            <a
              href={url}
              onClick={() => {
                setIsLoading(true);
              }}
              className="flex justify-center items-center"
            >
              <Mail className="mr-2 h-4 w-4" /> Login with Email
            </a>
          </Button>
        )}
      </div>
    </>
  );
}

export default Home;
