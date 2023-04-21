import * as React from "react"
import CurrentHod from "../../components/CurrentHod"
import RemainingProfs from "../../components/RemainingProfs"
import CustomContainer from "../CustomContainer"

export default function MarkHoD() {
    return (
        <React.Fragment>
            <CustomContainer customComponent={<CurrentHod />} />
            <CustomContainer customComponent={<RemainingProfs />} />
        </React.Fragment>
    )
}
