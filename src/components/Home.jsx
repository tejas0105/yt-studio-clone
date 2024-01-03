import { useEffect, useState } from "react";

function Home() {
  const [url, setUrl] = useState("");
  const getUrl = async () => {
    const resp = await fetch("http://localhost:3000/request", {
      method: "get",
    });
    const data = await resp.json();
    console.log(data.link);
    setUrl(data.link);
  };

  useEffect(() => {
    getUrl();
  }, []);
  return (
    <>
      <div>
        <a href={url} onClick={getUrl}>
          Sign in with Google
        </a>
      </div>
    </>
  );
}

export default Home;
