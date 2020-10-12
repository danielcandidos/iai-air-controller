import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import { myTheme } from './theme.js';
import './App.css';

const WhiteTypography = withStyles({
  root: {
    color: "#fff"
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '42ch',
    display: 'inline-block',
  },
  card: {
    minWidth: 275,
    backgroundColor: myTheme.primary.light,
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
  paper: {
    textAlign: 'center',
    color: myTheme.primary.contrastText,
  },
}));

export default function App() {
  const classes = useStyles();
  const lista = [1,2,3,4,5];
  const [voltage, setVoltage] = useState('no timestamp yet');

  useEffect(() => {
    const socket = openSocket('https://api.sma.flavindias.com.br/');
    socket.on("ufpe/cin/in1116/2020/devices/air_conditioner", data => console.log(data));
  });

  return (
    <div className="App" style={{ backgroundColor: myTheme.primary.main, height: '100vh', margin: 0 }}>
      <List className={classes.root} style={{maxHeight: '100%', overflow: 'auto'}}>
        {lista.map(item => {
          return(
          <ListItem alignItems="flex-start">
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <WhiteTypography variant="caption">Time: {new Date().toLocaleString()}</WhiteTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <WhiteTypography>Value: {voltage}</WhiteTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <WhiteTypography><strong>Voltage:</strong> 221 {item}</WhiteTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <WhiteTypography><strong>Amparage:</strong> 6.21</WhiteTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <WhiteTypography><strong>Load:</strong> 50</WhiteTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <WhiteTypography><strong>BTU:</strong> 9000</WhiteTypography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">Turn off</Button>
              </CardActions>
            </Card>
          </ListItem>
        )})}
      </List>
    </div>
  );
}
