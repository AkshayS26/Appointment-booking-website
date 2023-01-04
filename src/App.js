import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

function App() {
  return (
    <>
      <Navbar title="Textutils" About="About" />
      <div className="container my-2">
        <TextForm heading="Enter Your Text To Analyze" />
      </div>
    </>
  );
}

export default App;
