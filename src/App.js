import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import statusData from './dev.json';
import statusData2 from './prod.json';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionDetails,
  TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './App.css';

const StyledExpandMoreIcon = withStyles({
  root: {
    color: 'white',
  },
})(ExpandMoreIcon);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  accordion: {
    marginBottom: '10px',
  },
  nestedAccordion: {
    flexDirection: 'column',
  },
});

export default function App() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState({
    blocked: statusData.Blocked.map(ip => ({ ip, status: 'blocked' })),
    whitelist: statusData.WhiteList.map(ip => ({ ip, status: 'whitelisted' })),
  });

  useEffect(() => {
    const filteredBlocked = statusData.Blocked.filter((row) =>
      row.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(ip => ({ ip, status: 'blocked' }));
    const filteredWhitelist = statusData.WhiteList.filter((row) =>
      row.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(ip => ({ ip, status: 'whitelisted' }));
    setFilteredData({ blocked: filteredBlocked, whitelist: filteredWhitelist });
  }, [searchTerm]);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'black',
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <h1>BP WAF</h1>
      <div className="accordion-container">
      <Accordion className={classes.accordion}>
  <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
    <h2>Development</h2>
  </AccordionSummary>
  <AccordionDetails className={classes.accordionDetails}>
    <Accordion>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <h3>Blocked IPsets</h3>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Blocked IPset Table">
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.blocked.map((ip) => (
                <TableRow key={ip.ip}>
                  <TableCell component="th" scope="row">
                    {ip.ip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <h3>WhiteListed IPsets</h3>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Whitelisted IPset Table">
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.whitelist.map((ip) => (
                <TableRow key={ip.ip}>
                  <TableCell component="th" scope="row">
                    {ip.ip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  </AccordionDetails>
</Accordion>
      <Accordion className={classes.accordion}>
  <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
    <h2>Production</h2>
  </AccordionSummary>
  <AccordionDetails className={classes.accordionDetails}>
    <Accordion>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <h3>Blocked IPsets</h3>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Blocked IPset Table">
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.blocked.map((ip) => (
                <TableRow key={ip.ip}>
                  <TableCell component="th" scope="row">
                    {ip.ip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <h3>WhiteListed IPsets</h3>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Whitelisted IPset Table">
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.whitelist.map((ip) => (
                <TableRow key={ip.ip}>
                  <TableCell component="th" scope="row">
                    {ip.ip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  </AccordionDetails>
</Accordion>
      
</div>    
    </div>
  );
}
