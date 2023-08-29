import './App.css';
import {useEffect} from "react";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";

const tg = window.Telegram.WebApp;
function App() {

    useEffect(() => {
        tg.ready()
    }, []);


  return (
    <div className="App">
        <Header/>
        <Form/>
    </div>
  );
}

export default App;
