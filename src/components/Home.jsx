const getUrl = async () => {
  const resp = await fetch("http://localhost:3000/request", { method: "post" });
  const data = await resp.json();
  console.log(data.url);
};

function Home() {
  return (
    <>
      <div>
        <button onClick={getUrl}>Sign in with Google</button>
      </div>
    </>
  );
}

export default Home;
