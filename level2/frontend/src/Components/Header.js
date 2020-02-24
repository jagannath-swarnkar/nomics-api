import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, NativeSelect } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [status, setStatus] = React.useState("rank");

  const selectHandler = e => {
    console.log(e.target.value);
    setStatus(e.target.value);
    props.dropdown(e.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nomics API
          </Typography>
          <Button style={{ background: "aliceblue" }}>
            <NativeSelect
              disableUnderline
              onChange={selectHandler}
              value={status}
              style={{ width: "170px", color: "red", fontWeight: "bold" }}
            >
              <option value="rank">Rank</option>
              <option value="price">Price</option>
              <option value="price_date">Price_date</option>
              <option value="market_cap">Market_cap</option>
              <option value="circulating_supply">Circulating_supply</option>
              <option value="max_supply">Max_supply</option>
              <option value="high">High</option>
              <option value="high_timestamp">High_timestamp</option>
            </NativeSelect>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
