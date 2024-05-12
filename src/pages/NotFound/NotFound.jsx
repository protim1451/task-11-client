import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 mt-4">
            <Link to='/'><button className="btn btn-primary">Home</button></Link>
            <h1 className="text-4xl text-center text-red-500 font-bold">
                404!!! Not Found</h1>
            <img src="https://i.ibb.co/KXXVGgY/notfound.jpg" alt="" />
        </div>
    );
};

export default NotFound;