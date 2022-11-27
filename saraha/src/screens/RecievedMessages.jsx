import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import noMessage from "../assets/animations/noMessage.json";
import loginFirst from "../assets/animations/loginFirst.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import Lottie from "lottie-react";

function RecievedMessages() {
    let [messages, setMessages] = useState([]);
    const userToken = localStorage.getItem("token");

    //function to get recieved messages
    const getUserMessages = async () => {
        if (userToken?.length) {
            axios
                .get("http://localhost:3000/api/v1/message", {
                    headers: {
                        authorization: `tariq__${userToken}`,
                    },
                })
                .then((res) => {
                    setMessages(res.data.messageList);
                    // console.log('res', res)
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log("login first ");
        }
    };

    //get messsages on first render
    useEffect(() => {
        getUserMessages();
    }, [messages]);

    //delete message
    const deleteMessage = (messageId) => {
        // Simple DELETE request with axios
        axios
            .delete(`http://localhost:3000/api/v1/message/${messageId}`, {
                headers: {
                    authorization: `tariq__${userToken}`,
                },
                params: {
                    authorization: `tariq__${userToken}`,
                },
            })
            .then((res) => console.log("delete result", res));
    };

    return (
        <div style={styles.mainContainer}>
            {userToken?.length ? (
                <>
                    <div style={styles.title}>
                        {messages.length ? "Messages" : "No messages found "}
                    </div>

                    {messages.length ? (
                        messages?.map((item, _index) => {
                            const creationTime = item.createdAt;
                            const time = moment
                                .utc(new Date(creationTime), "MM/DD/YYYY h:mm A")
                                .local()
                                .format("DD,MMMM , hh:mm A");

                            return (
                                <div style={styles.container}>
                                    <div style={styles.messageContainer}>
                                        <div> {item.text}</div>
                                        <button
                                            onClick={() => deleteMessage(item._id)}
                                            style={styles.icon}
                                        >
                                            {" "}
                                            <FontAwesomeIcon
                                                size="x"
                                                icon={faTrash}
                                                color="#10bbb3"
                                            />
                                        </button>
                                    </div>
                                    <div style={styles.time}>{time}</div>
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                alignSelf: "center",
                            }}
                        >
                            <Lottie animationData={noMessage} loop={true} />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div style={styles.title}>Login, to see the incoming messages</div>
                    <Lottie animationData={loginFirst} loop={true} />
                </>
            )}
        </div>
    );
}

const styles = {
    messageContainer: {
        display: "flex",
        width: "60%",
        border: "thin solid #10bbb3 ",
        borderRadius: 30,
        minHeight: 140,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 3,
        padding: 30,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 20,
        color: "gray",
        alignItems: "center",
        justifyContent: "center",
        // margin: 'auto'
    },
    mainContainer: {
        disply: "flex",
        flex: "1",
        height: "100%",
        boxSizing: "borderBox",
        paddingRight: "20%",
        paddingLeft: "20%",
        paddingTop: "5%",
    },
    container: {
        marginBottom: 30,
        display: "flex",
        flexDirection: "column",
    },
    time: {
        color: "gray",
        fontSize: 14,
        marginTop: 5,
    },
    title: {
        color: "#10bbb3",
        fontSize: 40,
        marginBottom: 30,
        fontWeight: "600",
        textAlign: "center",
    },
    icon: {
        marginLeft: "auto",
        backgroundColor: "transparent",
        border: "none",
    },
};
export default RecievedMessages;
