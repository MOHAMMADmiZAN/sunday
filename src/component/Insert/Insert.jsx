import React, {useState} from 'react';
import {Box, Button, Card, CardContent, Grid, Stack, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import styles from "../assets/Global.module.css"
import {DesktopDateRangePicker} from "@mui/lab";

const Insert = () => {
    const [value, setValue] = useState([null, null]);
    console.log(value.toLocaleString())
    let d = new Date().toLocaleDateString()
    console.log(d)

    return (
        <>


            <Grid item>
                <Card sx={{maxWidth: 600}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={styles.textCenter}>
                            <Button variant={"contained"} className={styles.w100} size={"large"}>Todo Data Insert
                                Form</Button>
                        </Typography>
                        <TextField label="WHAT TO DO" color="info" name="what" className={styles.w100}/>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3} className={`${styles.mTop20} ${styles.w100}`}>

                                <DesktopDateRangePicker className={`${styles.mxAuto}`}
                                                        startText="Start"
                                                        value={value}
                                                        onChange={(newValue) => {
                                                            setValue(newValue);
                                                        }}
                                                        renderInput={(startProps, endProps) => (
                                                            <>
                                                                <TextField {...startProps} />
                                                                <Box sx={{mx: 2}}> to </Box>
                                                                <TextField {...endProps} />
                                                            </>
                                                        )}
                                />
                            </Stack>
                        </LocalizationProvider>
                        <Stack spacing={2} className={styles.mTop20}>
                            <Button variant="outlined" endIcon={<SendIcon/>} size={"large"}>
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