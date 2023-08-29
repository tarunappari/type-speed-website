import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useThemeContext } from "../Context/ThemeContext";

//this component render user data in table in userpae

const TableUserData = ({userData}) =>{

    let {theme} = useThemeContext()

    let headCellStyle = {color:theme.textColor , textAllign:'center'}
    let cellStyle = { color:theme.correct , textAllign:'center'}

    return(
        <div className="table">
            <TableContainer component={Paper} sx={{maxHeight:'70vh',
                                                   backgroundColor:'transparent'}}>
                <Table aria-label="simple table">
                    <TableHead style={{position:'sticky'}}>
                        <TableRow>
                            <TableCell style={headCellStyle} align="center">
                                WPM 
                            </TableCell>
                            <TableCell style={headCellStyle}align="center" >
                                Accuracy
                            </TableCell>
                            <TableCell style={headCellStyle} align="center">
                                Characters
                            </TableCell>
                            <TableCell style={headCellStyle} align="center">
                                Date
                            </TableCell>
                            <TableCell style={headCellStyle} align="center">
                                TestTime
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userData.map((i)=>(
                                <TableRow>
                                    <TableCell style={cellStyle} align="center">
                                        {i.wpm}
                                    </TableCell>
                                    <TableCell style={cellStyle} align="center">
                                        {i.accuracy}
                                    </TableCell>
                                    <TableCell style={cellStyle} align="center">
                                        {i.characters}
                                    </TableCell>
                                    <TableCell style={cellStyle} align="center">
                                        {i.timeStamp.toDate().toLocaleString()}
                                    </TableCell>
                                    <TableCell style={{color:theme.timer}} align="center">
                                        {i.testTime}s
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableUserData;