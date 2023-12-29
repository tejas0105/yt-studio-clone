import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <>
      <div className="main">
        <Navbar />
      </div>
      <section className="lower-section">
        <div className="info-section">
          <Sidebar />
        </div>
        <div className="right-info-section">
          <Dashboard />
        </div>
      </section>
    </>
  );
}

export default Home;
