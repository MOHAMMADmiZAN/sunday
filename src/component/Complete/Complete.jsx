import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import styles from "../assets/Global.module.css";
import DoneAllIcon from '@mui/icons-material/DoneAll';

function Complete(props) {

    const [completeData, setCompleteData] = useState([])
    const complete = async () => {
        let url = 'http://127.0.0.1:5000/api/complete'
        try {
            const response = await axios(url)
            let data = await response.data;
            setCompleteData(() => data)


        } catch (e) {
            console.log(e)
        }
    }
    useEffect(
        () => {
            complete()
        }, []
    )
    return (
        <>

            <Grid item>
                <Card sx={{maxWidth: 600}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={styles.textCenter}>
                            <Button variant={"contained"} className={styles.w100} size={"large"} color={"success"}>Completed
                                Work List</Button>
                        </Typography>
                        <TableContainer component={Paper} className={styles.textUpper}>
                            <Table sx={{maxWidth: 600}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={"center"}>Sl</TableCell>
                                        <TableCell align={"center"}>Work Name</TableCell>
                                        <TableCell align={"center"}>Work Time</TableCell>
                                        <TableCell align={"center"}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {completeData.map((d, i) => {
                                        return <TableRow key={Math.floor(Math.random() * 10000).toString()}>
                                            <TableCell align={"center"}>{i + 1}</TableCell>
                                            <TableCell align={"center"}>{d.work_name}</TableCell>
                                            <TableCell align={"center"}>{d.time}</TableCell>
                                            <TableCell align={"center"}><Button variant={"outlined"}
                                                                                color={"success"} endIcon={
                                                <DoneAllIcon/>}>{d.status}</Button></TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>

                            </Table>

                        </TableContainer>
                    </CardContent>

                </Card>
            </Grid>

        </>
    );
}

export default Complete;