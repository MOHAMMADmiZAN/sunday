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

    useEffect(
        () => {
            current()
        }, []
    )
    return (
        <>


        </>
    );
}

export default Current;