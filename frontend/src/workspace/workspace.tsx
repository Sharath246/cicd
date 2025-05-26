import { Box } from "@mui/material"
import SidePanel from "./sidepanel.tsx"
import SimpleEditor from "./simpleEditor.tsx"

const WorkSpace = () => {
    return(
        <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",height:"100vh"}}>
            <SimpleEditor/>
            <SidePanel/>
        </Box>
    )
}

export default WorkSpace;