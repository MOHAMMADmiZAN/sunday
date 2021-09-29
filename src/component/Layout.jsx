import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import styles from './assets/Global.module.css'
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DesktopDateTimePicker} from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import axios from "axios";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function Layout() {

    const [name, setName] = useState("")
    const [value, setValue] = useState(new Date());


    let y = value.getFullYear()
    let m = value.getMonth()
    let d = value.getDate()
    let h = value.getHours()
    let min = value.getMinutes()
    let sec = value.getSeconds()


    let r = moment(new Date(y, m, d, h, min, sec)).fromNow()

    const insert = async () => {
        let url = "http://127.0.0.1:5000/api/insert"
        try {
            let response = await axios.post(url, {name: name, time: r})
            console.log(response)
            wait()


        } catch (e) {
            console.log(e)
        }
    }
    const [waitData, setWaitData] = useState([])

    const wait = async () => {
        let url = 'http://127.0.0.1:5000/api/waiting'
        try {
            const response = await axios(url)
            let data = await response.data;
            setWaitData(() => data)


        } catch (e) {
            console.log(e)
        }
    }

    const waitUpdate = async (wid) => {
        let url = `http://127.0.0.1:5000/api/waitingUp/${wid}`
        try {
            let response = await axios.post(url, {status: 'current'})
            console.log(response)
            wait()
            current()

        } catch (e) {
            console.log(e)

        }


    }
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
            current()
            complete()


        } catch (e) {
            console.log(e)

        }


    }
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
    const remove = async (did) => {
        let url = `http://127.0.0.1:5000/api/delete/${did}`
        try {
            const response = await axios(url)
            console.log(response)
            complete()
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        wait()
        current()
        complete()
    }, [])

    return (

        <>
            <Grid spacing={1} container={true} columns={4} className={`${styles.mTop50} ${styles.mxAuto}`}>
                <Grid item>
                    <Card sx={{maxWidth: 600}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className={styles.textCenter}>
                                <Button variant={"contained"} className={styles.w100} size={"large"}>Todo Data Insert
                                    Form</Button>
                            </Typography>
                            <TextField label="WHAT TO DO" color="info" className={styles.w100}
                                       onChange={(e) => setName(e.target.value)}/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3} className={`${styles.mTop20} ${styles.w100}`}>

                                    {/*<DesktopDateRangePicker className={`${styles.mxAuto}`}*/}
                                    {/*                        startText="Start"*/}
                                    {/*                        value={value}*/}
                                    {/*                        onChange={(newValue) => {*/}
                                    {/*                            setValue(newValue);*/}
                                    {/*                        }}*/}
                                    {/*                        renderInput={(startProps, endProps) => (*/}
                                    {/*                            <>*/}
                                    {/*                                <TextField {...startProps} />*/}
                                    {/*                                <Box sx={{mx: 2}}> to </Box>*/}
                                    {/*                                <TextField {...endProps} />*/}
                                    {/*                            </>*/}
                                    {/*                        )}*/}
                                    {/*/>*/}
                                    <DesktopDateTimePicker
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        label={"When To Do"}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <Stack spacing={2} className={styles.mTop20}>
                                <Button variant="outlined" endIcon={<SendIcon/>} size={"large"}
                                        onClick={() => insert()}>
                                    Insert
                                </Button>

                            </Stack>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item>
                    <Card sx={{maxWidth: 600}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className={styles.textCenter}>
                                <Button variant={"contained"} className={styles.w100} size={"large"} color={"warning"}>Work
                                    Waiting List</Button>
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
                                        {waitData.map((d, i) => {
                                            return <TableRow key={Math.floor(Math.random() * 10000).toString()}>
                                                <TableCell align={"center"}>{i + 1}</TableCell>
                                                <TableCell align={"center"}>{d.work_name}</TableCell>
                                                <TableCell align={"center"}>{d.time}</TableCell>
                                                <TableCell align={"center"}><Button variant={"outlined"}
                                                                                    color={"warning"} endIcon={
                                                    <TimerOutlinedIcon/>}
                                                                                    onClick={() => waitUpdate(d.id)}>{d.status}</Button></TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>

                                </Table>

                            </TableContainer>


                        </CardContent>

                    </Card>
                </Grid>
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
                                                    <DoneAllIcon/>}
                                                                                    onClick={() => remove(d.id)}>{d.status}</Button></TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>

                                </Table>

                            </TableContainer>
                        </CardContent>

                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default Layout;