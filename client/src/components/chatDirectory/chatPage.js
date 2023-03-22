import { PrettyChatWindow } from "react-chat-engine-pretty"
import { useAuthContext } from "../../hooks/useAuthContext"
const ChatsPage = (props) => {
    const { user } = useAuthContext()
    console.log(user.email)
    return (
        <div style={{ height: "90vh", width: "90vw" }}>
            <PrettyChatWindow
                Project
                Id="aef9213a-e543-4c06-ad59-a7499365a4c3"
                username={user.email}
                secret={user.email}
                style={{ height: "90%" }}
            />
        </div>
    )
}

export default ChatsPage
