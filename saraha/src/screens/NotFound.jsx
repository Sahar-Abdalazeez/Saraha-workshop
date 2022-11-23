import Lottie from "lottie-react";
import notFound from "../assets/animations/notFound.json";


function NotFound() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: 100 }}>
            <div style={{ fontSize: 50, color: '#10bbb3' }}>404 Page not found</div>
            <div style={{ width: 500, height: 500, }}>
                <Lottie animationData={notFound} loop={true} />
            </div>
        </div>
    )
}
export default NotFound;