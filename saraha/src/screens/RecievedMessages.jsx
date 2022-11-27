import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

function RecievedMessages() {
    let [messages, setMessages] = useState([]);

    const getUserMessages = async () => {
        const userToken = localStorage.getItem('token');

        axios.get('http://localhost:3000/api/v1/message', {
            headers: {
                'authorization': `tariq__${userToken}`
            }
        })
            .then((res) => {
                setMessages(res.data.messageList)
                console.log('res', res)
            })
            .catch((error) => {
                console.error(error)
            })
    };

    useEffect(() => {
        getUserMessages();
    }, [messages])

    return (
        <div style={styles.mainContainer}>
            <div style={styles.title} >Messages</div>
            {messages?.map((item, index) => {
                const creationTime = item.createdAt;
                const time = moment.utc(new Date(creationTime), 'MM/DD/YYYY h:mm A').local().format("DD,MMMM , hh:mm A");


                return (
                    <div style={styles.container}>
                        <div style={styles.messageContainer} >

                            <div> {item.text}</div>
                            <Link style={styles.icon}> <FontAwesomeIcon size="x" icon={faTrash} color="#10bbb3" /></Link>

                        </div>
                        <div style={styles.time}>{time}</div>
                    </div>
                )
            })}
        </div>

    )
}

const styles = {
    messageContainer: {
        display: 'flex',
        width: '60%',
        border: "thin solid #10bbb3 ",
        borderRadius: 30,
        minHeight: 140,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 3,
        padding: 30,
        textAlign: 'left',
        fontWeight: '500',
        fontSize: 20,
        color: 'gray',
    },
    mainContainer: {
        disply: 'flex',
        flex: '1',
        height: '100%',
        boxSizing: 'borderBox',
        paddingRight: '20%',
        paddingLeft: '20%',
        paddingTop: '5%',

    },
    container: {
        marginBottom: 30,

    },
    time: {
        color: 'gray',
        fontSize: 14,
        marginTop: 5,
    },
    title: {
        color: '#10bbb3',
        fontSize: 40,
        marginBottom: 30,
        fontWeight: '600'
    },
    icon: {
        marginLeft: 'auto'
    }

}
export default RecievedMessages;
