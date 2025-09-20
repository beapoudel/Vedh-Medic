import { useState } from 'react'
import './App.css'
function Report({ username }) {
  const [image, setimage] = useState()
  const [result, setresult] = useState()
  const [upload, setupload] = useState(false)
  async function report() {
    const formdata = new FormData()
    formdata.append('username', username)
    formdata.append('image', image)
    console.log(image)
    const token = localStorage.getItem("authtoken")
    try {
      setupload(true)
      const url = "http://127.0.0.1:8000/image/"
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Token ${token}`,
        },
        body: formdata
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const res = await response.json();
      if(res=="over"){
        alert("Your free trial has been over")
      }
      setresult(res)
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="report">
      <h4 style={{ display: 'flex' }}>Analyze Your Medical Report
        <div style={{ border: '2px solid balck' }}><img style={{ width: '30px' }} src='https://cdn-icons-png.flaticon.com/128/456/456141.png' /> {username}</div>
      </h4>
      <h5>Get a quick and clear summary of your medical reports. Just upload the file below.</h5>
      {
        upload &&
        <div className='result'>
          {
            !result &&
            <img className='loading_img' src='Trail loading.gif'/>
          }
          {
            result &&
            <p style={{ whiteSpace: 'pre-line' }}>
              {result.result}
            </p>
          }
        </div>
      }
      {!upload &&
        <div className='upload'>
          {
            image &&
            <button onClick={report} className='browse'>Send</button>
          }
          {
            !image &&
            <button className='browse'><label htmlFor="upload">Browse File</label></button>
          }
          <input onChange={(event) => setimage(event.target.files[0])} type='file' id='upload' />
        </div>
      }
    </div>
  )
}
export default Report