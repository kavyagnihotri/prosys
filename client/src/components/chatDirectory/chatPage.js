import { PrettyChatWindow } from "react-chat-engine-pretty"
import { useAuthContext } from "../../hooks/useAuthContext"
const ChatsPage = (props) => {
    const { user } = useAuthContext()
    console.log(user.email)
    return (
        <div className="background" style={{ height: "93vh" }}>
            <PrettyChatWindow
                projectId={"d4c39480-3612-4e4c-8dd0-fef825748c8b"}
                username={user.email}
                secret={user.email}
                style={{ height: "100vh", width: "100vh" }}
            />
        </div>
    )
}

export default ChatsPage
