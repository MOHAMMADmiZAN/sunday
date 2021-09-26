import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Stack, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import styles from "../assets/Global.module.css"
import {DesktopDateTimePicker} from "@mui/lab";
import moment from "moment";
import axios from "axios";

const Insert = () => {
    // const [value, setValue] = useState([null, null]);
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


        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>


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
                            <Button variant="outlined" endIcon={<SendIcon/>} size={"large"} onClick={() => insert()}>
                                Insert
                            </Button>

                        </Stack>
                    </CardContent>
                </Card>

            </Grid>


        </>
    );
};

export default Insert;