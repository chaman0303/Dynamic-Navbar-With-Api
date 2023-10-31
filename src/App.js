import Navbar from "./component/Navbar";
import "./Assets/background.jpg"

function App() {
  return (
    <>  
   <Navbar/>
  <img src={require("./Assets/background.jpg")} alt="background-img" style={{ width:"100%" }} />
   </>
  );
}

export default App;
