import { Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
// import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
// import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useState } from "react";
import Pagination from '@mui/material/Pagination';
// import { makeStyles } from "@mui/styles";

import './search.css';
import Comments from "./Comments";
// const customTheme = (outerTheme) =>
//     createTheme({
//         palette: {
//             mode: outerTheme.palette.mode,
//         },
//         components: {
//             MuiTextField: {
//                 styleOverrides: {
//                     root: {
//                         '--TextField-brandBorderColor': '#E0E3E7',
//                         '--TextField-brandBorderHoverColor': '#B2BAC2',
//                         '--TextField-brandBorderFocusedColor': '#6F7E8C',
//                         '& label.Mui-focused': {
//                             color: 'var(--TextField-brandBorderFocusedColor)',
//                         },
//                     },
//                 },
//             },
//             MuiOutlinedInput: {
//                 styleOverrides: {
//                     notchedOutline: {
//                         borderColor: 'var(--TextField-brandBorderColor)',
//                     },
//                     root: {
//                         [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
//                             borderColor: 'var(--TextField-brandBorderHoverColor)',
//                         },
//                         [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
//                             borderColor: 'var(--TextField-brandBorderFocusedColor)',
//                         },
//                     },
//                 },
//             },
//             MuiFilledInput: {
//                 styleOverrides: {
//                     root: {
//                         '&:before, &:after': {
//                             borderBottom: '2px solid var(--TextField-brandBorderColor)',
//                         },
//                         '&:hover:not(.Mui-disabled, .Mui-error):before': {
//                             borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//                         },
//                         '&.Mui-focused:after': {
//                             borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//                         },
//                     },
//                 },
//             },
//             MuiInput: {
//                 styleOverrides: {
//                     root: {
//                         '&:before': {
//                             borderBottom: '2px solid var(--TextField-brandBorderColor)',
//                         },
//                         '&:hover:not(.Mui-disabled, .Mui-error):before': {
//                             borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//                         },
//                         '&.Mui-focused:after': {
//                             borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//                         },
//                     },
//                 },
//             },
//         },
//     });

const theme = createTheme({
    typography: {
      button: {
        textTransform: "none"
      }
    }
  });
export default function Search() {
    // const outerTheme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('relevance');
    const [data, setData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState({});
    const [open, setOpen] = useState(false);
    const handleChange = (event) => {
        setSearchType(event.target.value);
    };
    const handleOpen = (e) => {
        setSelectedItem(e);
        setOpen(true)
      }
      const handleClose = () => setOpen(false)
    return (
        <div style={{ paddingLeft: '10px', backgroundColor: '#fff' }}>
            <h2>Search</h2>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {/* <ThemeProvider theme={customTheme(outerTheme)}> */}
                    <TextField fullWidth onKeyUp={(e) => setSearchQuery(e.target.value)} sx={{ input: { color: '#6F7E8C' } }} label="query..." InputLabelProps={{ sx: { color: '#6F7E8C' } }} size="small" style={{ paddingRight: '20px' }} />
                    {/* </ThemeProvider> */}
                </Grid>
                <Grid item xs={4} md={1}>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchType}
                        label="Type"
                        onChange={handleChange}
                        // sx={{
                        //     color: "white",
                        //     '.MuiOutlinedInput-notchedOutline': {
                        //         borderColor: 'rgba(228, 219, 233, 0.25)',
                        //     },
                        //     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        //         borderColor: 'rgba(228, 219, 233, 0.25)',
                        //     },
                        //     '&:hover .MuiOutlinedInput-notchedOutline': {
                        //         borderColor: 'rgba(228, 219, 233, 0.25)',
                        //     },
                        //     '.MuiSvgIcon-root ': {
                        //         fill: "white !important",
                        //     }
                        // }}
                        size="small"
                    >
                        <MenuItem value={`relevance`} selected>Relevance</MenuItem>
                        <MenuItem value={`date`}>Date</MenuItem>
                    </Select> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchType}
                            label="Type"
                            onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value={`relevance`} selected>Relevance</MenuItem>
                            <MenuItem value={`date`}>Date</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} md={2}>
                    <Button style={{ marginLeft: '10px', marginTop: '2px' }} variant="outlined" onClick={search}>Search</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
            {
                pageCount>0 && data &&
                    data.map((d,index)=>(
                        <Grid item xs={12} key={index}>
                        <Card sx={{ maxWidth: '100vw' }}>
                        <CardContent>
                      <Typography variant="body2">
                        {d['title']}
                      </Typography>
                      <Typography variant="caption">
                        {d['created_at']} | {d['points']} points by {d['author']}
                      </Typography>
                          <br/>
                    {
                        d['story_text'] && 
                      <div style={{fontFamily:"'Monaco'", fontSize:'12px'}} dangerouslySetInnerHTML={{__html:d['story_text']}}>
                      </div>
                      } 
                    </CardContent>
                    <CardActions>
                      <a style={{color:'black'}}href={d['url']} target='_blank' rel="noreferrer">Learn More</a>
                      <ThemeProvider theme={theme}>
                        {d['children'] && d['children'].length === 1 ? <Button onClick={()=>handleOpen(d)}> {d['children'].length} Comment</Button> : d['children'] && d['children'].length > 1 ?
                          <Button onClick={()=>handleOpen(d)}> {d['children'].length} Comments</Button> : null
                        }
                      </ThemeProvider>
                    </CardActions>
                        </Card>
                        </Grid>
                    ))
               
            }
             </Grid>
            {
            pageCount>0 && <Pagination color="secondary" onChange={handlePageClick} count={pageCount} showFirstButton showLastButton />
            }
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedItem['kids']}
          </Typography>
        </Box> */}
        <div>
        <Comments payload={selectedItem}></Comments>
        </div>
      </Modal>
        </div>
    )
   async function search() {
        setPageCount(0)
        if (searchQuery && searchQuery.length > 0) {
            let res = await fetch(`https://hnews-api.vercel.app/search`, {
                method: 'POST',
                body: JSON.stringify({
                    "type": searchType,
                    "query": searchQuery
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            let json = await res.json();
            setData(json["hits"])
            setPageCount(json["nbPages"])

        }
    }
    async function handlePageClick(event, page) {
        let res = await fetch(`https://hnews-api.vercel.app/searchByPage`, {
            method: 'POST',
            body: JSON.stringify({
                "type": searchType,
                "query": searchQuery,
                "page": page
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        let json = await res.json();
        setData(json["hits"])
        setPageCount(json["nbPages"])
        window.scrollTo(0, 0);
    }
}
