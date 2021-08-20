import Home from './components/Home';
import { useState, useEffect } from 'react';



function App() {

  const [state, setstate] = useState(() => {
    return { firstName: "Santanu", lastName: "Phukan" }
  })

  const [documents, setdocuments] = useState(() => {
    return []
  })

  const updateDocuments = async function () {
    try {
      const URI = "http://localhost:5000/document/getall"
      const res = await fetch(URI, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      let jsonRes = await res.json();
      if (res) {
        // const data= await JSON.parse(res.body)
        setdocuments(jsonRes.data.documents)
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  useEffect(() => {
    updateDocuments();
  }, [])
  return (
    <Home documents={documents} updateDocuments={updateDocuments}/>
  );
}

export default App;
