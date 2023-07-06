import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import statusData from './ips_with_descriptions.json';
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
  Tooltip,
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
    minWidth: 200,
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
    blocked: statusData.Blocked.map(({ ip, description }) => ({ ip, status: 'blocked', description })),
    whitelist: statusData.WhiteList.map(({ ip, description }) => ({ ip, status: 'whitelisted', description })),
    ipsets: statusData.BlockedGithub.map(({ ip, description }) => ({ ip, status: 'ipsets', description })),
  });
  useEffect(() => {
    const filteredBlocked = statusData.Blocked.filter((row) =>
      row.ip.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(({ ip, description }) => ({ ip, status: 'blocked', description }));
    const filteredWhitelist = statusData.WhiteList.filter((row) =>
      row.ip.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(({ ip, description }) => ({ ip, status: 'whitelisted', description }));
    const filteredIpsets = statusData.BlockedGithub.filter((row) =>
      row.ip.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(({ ip, description }) => ({ ip, status: 'ipsets', description }));
    setFilteredData({ blocked: filteredBlocked, whitelist: filteredWhitelist, ipsets: filteredIpsets });
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
      <h1>BP WAF PRODUCTION</h1>
      <div className="accordion-container">
        <AccordionDetails className={classes.accordionDetails}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
              <h3>Blocked IPsets</h3>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className="search-container">
                <TextField
                  label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </div>

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
                          <Tooltip title={ip.description} arrow>
                            <span className='tooltipContent'>{ip.ip}</span>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
        <div className="accordion-container">
          <AccordionDetails className={classes.accordionDetails}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
                <h3>WhiteList IPsets</h3>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <div className="search-container">
                  <TextField
                    label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="Blocked IPset Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>IP Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.whitelist.map((ip) => (
                        <TableRow key={ip.ip}>
                          <TableCell component="th" scope="row">
                            <Tooltip title={ip.description} arrow>
                              <span className='tooltipContent'>{ip.ip}</span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </div>
        <div className="accordion-container">
          <AccordionDetails className={classes.accordionDetails}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
                <h3>Blocked Github</h3>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <div className="search-container">
                  <TextField
                    label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="Blocked IPset Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>IP Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.ipsets.map((ip) => (
                        <TableRow key={ip.ip}>
                          <TableCell component="th" scope="row">
                            <Tooltip title={ip.description} arrow>
                              <span className='tooltipContent'>{ip.ip}</span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </div>
      </div>
    </div>
  );
}
