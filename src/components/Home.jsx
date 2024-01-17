import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

function Home() {
  // const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const getUrl = async () => {
  //   const resp = await fetch("http://localhost:3000/request", {
  //     method: "get",
  //   });
  //   const data = await resp.json();
  //   setUrl(data?.link);
  // };

  // useEffect(() => {
  //   getUrl();
  // }, [isLoading]);

  const { isPending, error, data } = useQuery({
    queryKey: ["signInLink"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/request");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <Button disabled className="bg-blue-600">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <a
          href={data?.link}
          onClick={() => {
            setIsLoading(true);
          }}
          className="p-2 pr-4 pl-4 rounded-md flex justify-center items-center bg-blue-600 active:bg-blue-700 hover:bg-blue-500 duration-100 ease-in-out text-white"
        >
          Login with Email
        </a>
      )}
    </div>
  );
}

export default Home;
