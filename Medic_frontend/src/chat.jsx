import { useState, useEffect } from 'react'
import './App.css'
function Chat({ username }) {
    const [query, setquery] = useState()
    const [msg, setmsg] = useState([])
    useEffect(() => {
        const endDiv = document.querySelector(".chat-end");
        if (endDiv) {
            endDiv.scrollIntoView({ behavior: "smooth" });
        }
    }, [msg])
    async function chat() {
        setmsg(prev => [...prev, { type: "question", text: query }])
        setmsg(prev => [...prev, { type: "answer", text: "loading" }])
        const token = localStorage.getItem("authtoken")
        console.log(token)
        try {
            const url = " https://vedh-medic-backend.onrender.com/query/"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, query })
            })
            if (!response.ok) {
                throw new Error(`Http error! status:${response.status}`)
            }
            const data = await response.text()
            console.log(data)
            setmsg(prev => [...prev.slice(0,-1), { type: "answer", text: data }])
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="chat">
            <div className='chat_head'>
                <h4 style={{ display: 'flex' }}> Chat with Vedh
                    <div style={{marginBottom:'10px'}}><img style={{ width: '30px' }} src='https://cdn-icons-png.flaticon.com/128/456/456141.png' />{username}</div>
                </h4>
            </div>
            <div className='inbox'>
                {
                    msg.map((message, index) => (
                        <p className={message.type === "question" ? "question" : "answer"} key={index}>
                            {message.text === "loading" ? (
                                <img
                                    src="https://media.tenor.com/xDZkQ6ALTmIAAAAi/loading-snake-io.gif"
                                    alt="loading"
                                    style={{ width: "40px", height: "40px",backgroundColor:'white'}}
                                />
                            ) : (
                                message.text
                            )}
                        </p>
                    ))
                }
                <div className="chat-end"></div>
            </div>
            <div className='sending'>
                <input onChange={(event) => setquery(event.target.value)} className='type' type='text' placeholder='Type Your Message' />
                <img onClick={chat} className='send' src='https://cdn-icons-png.flaticon.com/128/5562/5562656.png' />
            </div>
        </div>
    )
}
export default Chat
