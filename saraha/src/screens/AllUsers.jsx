import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoUser from "../assets/animations/noUserFound.json";
//lottie animation
import Lottie from "lottie-react";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

const AllUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [filteredUser, setFilteredUser] = useState();

    //set searched value on changin input value
    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString);
    };

    //get data from api
    const getAllUsers = async () => {
        let { data } = await axios.get(
            "http://localhost:3000/api/v1/auth/allusers"
        );
        setUsers(data.users);
    };

    //get data on the first render
    useEffect(() => {
        getAllUsers();
    }, []);

    // filtered array to pick users that starts with the searches value
    useEffect(() => {
        const filteredUser = users?.filter((item) =>
            item?.userName.toLowerCase().includes(searchField?.toLowerCase())
        );
        setFilteredUser(filteredUser);
    }, [users, searchField]);

    return (
        <div style={styles.mainContainer}>
            <div style={styles.inputContainer}>
                <FontAwesomeIcon size="2x" icon={faSearch} color="#10bbb3" />
                <input
                    onChange={(e) => onSearchChange(e)}
                    style={styles.search}
                    className="search"
                    type="search"
                    placeholder="Search user name "
                />
            </div>
            {filteredUser?.length ? (
                <div style={styles.usersContainer}>
                    {filteredUser?.map((item) => (
                        <div style={styles.userContainer}>
                            <FontAwesomeIcon size="2x" icon={faUserCircle} color="#10bbb3" />
                            <div style={styles.detailsContainer}>
                                <div style={styles.name}>{item.userName} </div>
                                <div> {item.email}</div>
                            </div>
                            <button
                                onClick={() =>
                                    navigate("../message", {
                                        state: { _id: item._id, name: item.userName },
                                    })
                                }
                                style={styles.send}
                            >
                                <FontAwesomeIcon
                                    size="lg"
                                    icon={faPaperPlane}
                                    color="#10bbb3"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div style={{ width: 500, height: 500 }}>
                        <Lottie animationData={NoUser} loop={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;

const styles = {
    userContainer: {
        backgroundColor: "#dff6f6",
        height: 80,
        display: "flex",
        flex: 1,
        alignItems: "center",
        padding: 30,
        marginBottom: 20,
        borderRadius: 20,
    },
    mainContainer: {
        padding: "20%",
        paddingTop: "5%",
        paddingBottom: "2%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 30,
    },
    name: {
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: 20,
    },
    search: {
        border: "none",
        outline: "none",
        padding: 0,
        alignSelf: "center",
        fontSize: 18,
        backgroundColor: "transparent",
        width: "100%",
        fontWeight: "500",
        marginLeft: 20,
    },
    usersContainer: {
        width: "90%",
    },
    inputContainer: {
        display: "flex",
        width: "100%",
        backgroundColor: "#dadada",
        marginBottom: 40,
        borderRadius: 10,
        alignItems: "center",
        overflow: "hidden",
        padding: 10,
    },
    send: {
        marginLeft: "auto",
        border: "none",
        outline: "none",
        padding: 0,
        backgroundColor: "transparent",
    },
};
