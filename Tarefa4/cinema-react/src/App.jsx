import Input from "./components/input/Input"
import FilmeForm from "./features/filme/components/FilmeForm"
import Navbar from "./components/navbar/Navbar"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <FilmeForm variant={"d-flex flex-column mb-5"}> </FilmeForm>
    </>
  )
}

export default App
