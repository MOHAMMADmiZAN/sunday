import React from 'react';
import {Grid} from "@mui/material";
import Insert from "./Insert/Insert";
import Waiting from "./Wating/Waiting";
import Current from "./Current/Current";
import Complete from "./Complete/Complete";
import styles from './assets/Global.module.css'

function Layout() {
    return (
        <>
            <Grid spacing={1} container={true} columns={4} className={styles.mTop50}>
                <Insert/>
                <Waiting/>
                <Current/>
                <Complete/>
            </Grid>
        </>
    );
}

export default Layout;