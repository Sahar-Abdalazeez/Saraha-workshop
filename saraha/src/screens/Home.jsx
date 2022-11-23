import { Link } from "react-router-dom";

function Home() {
    return (
        <div class="container text-center my-5">
        <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
        <div class="buttons d-flex justify-content-center align-items-center  flex-column">
            <Link class="btn btn-default-outline my-4" to="/login"><i class="fas fa-user"></i> Login</Link>
            <Link class="btn btn-default-outline" to="/register"><i class="far fa-edit"></i> Register</Link>
        </div>
    </div>

    )
}
export default Home;