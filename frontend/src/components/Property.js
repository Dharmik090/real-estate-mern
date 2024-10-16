import { useNavigate } from "react-router-dom";

const Property = () => {
    const navigator = useNavigate();
    function handleProperty(){
        //   req.session.id = "123";
        localStorage.setItem('userId', "670e6a4cccd6c48edcad3462"); // Store user ID
        navigator("/addProperty/670e6a4cccd6c48edcad3462");
    }
    return(
    <div>
        <button onClick={   handleProperty}>ADD</button>
    </div>
)
};

export default Property;