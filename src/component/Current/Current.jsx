import React, {useEffect,useState} from 'react';
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
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

function Current() {
    const [currentData, setCurrentData] = useState([])



    const current = async () => {
        let url = 'http://127.0.0.1:5000/api/current'
        try {
            const response = await axios(url)
            let data = await response.data;
            setCurrentData(() => data)


        } catch (e) {
            console.log(e)
        }
    }
    const currentUpdate = async (cid) => {
        let url = `http://127.0.0.1:5000/api/currentUp/${cid}`

        try {
            let response = await axios.post(url, {status: 'complete'})
            console.log(response)



        } catch (e) {
            console.log(e)

        }


    }
    useEffect(
        () => {
            current()
        }, []
    )
    return (
        <>

            <Grid item>
                <Card sx={{maxWidth: 600}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={styles.textCenter}>
                            <Button variant={"contained"} className={styles.w100} size={"large"} color={"info"}>Current
                                Work List
                            </Button>
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
                                    {currentData.map((d, i) => {
                                        return <TableRow key={Math.floor(Math.random() * 10000).toString()}>
                                            <TableCell align={"center"}>{i + 1}</TableCell>
                                            <TableCell align={"center"}>{d.work_name}</TableCell>
                                            <TableCell align={"center"}>{d.time}</TableCell>
                                            <TableCell align={"center"}><Button variant={"outlined"}
                                                                                color={"info"} endIcon={
                                                <CachedOutlinedIcon/>}
                                                                                onClick={() => currentUpdate(d.id)}>{d.status}</Button></TableCell>
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

export default Current;