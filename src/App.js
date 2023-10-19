import { useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Comments from './Comments';

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});
function getActualStories(ids) {
  let responseArr = [];
  for (let id in ids) {
    if (id < 20)
      responseArr.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[id]}.json?print=pretty`))
  }
  return responseArr;
}
function App(props) {
  const [bestIds, setBestIds] = useState([]);
  const [text, setText] = useState([])
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const handleOpen = (e) => {
    setSelectedItem(e);
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  useEffect(() => {
    async function getBestIds() {
      setText([]);
      let response = await fetch(`https://hacker-news.firebaseio.com/v0/${props.category}stories.json`);
      let json = await response.json();
      setBestIds(json);
      let resp = await Promise.all(getActualStories(json));
      let jsons = await Promise.all(resp.map(r => r.json()));
      let arr = Array(20);
      for (let idx in jsons) {
        jsons[idx]['time'] = new Date(jsons[idx]['time'] * 1000).toLocaleString()
        arr[idx] = jsons[idx];
      }
      setText(arr);
    }
    getBestIds();
  },[props.category]);
  return (
    <div>
      <Box style={{backgroundColor:'#121212'}}sx={{ flexGrow: 1 }}>
        <InfiniteScroll
          dataLength={text.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4 style={{ color: '#F5F5F5' }}>Loading...</h4>}
        >
          <Grid container spacing={2}>
            {
              text && text.length > 0 &&
              text.map((i, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ maxWidth: '100vw' }} style={{ backgroundColor: '#1F1B24' }}>

                    <CardContent style={{ color: '#F5F5F5' }}>
                      <Typography variant="body2">
                        {i['title']}
                      </Typography>
                      <Typography variant="caption">
                        {i['time']} | {i['score']} points by {i['by']}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <a href={i['url']} target='_blank' rel="noreferrer">Learn More</a>
                      <ThemeProvider theme={theme}>
                        {i['descendants'] === 1 ? <Button onClick={()=>handleOpen(i)}> {i['descendants']} Comment</Button> : i['descendants'] > 1 ?
                          <Button onClick={()=>handleOpen(i)}> {i['descendants']} Comments</Button> : null
                        }
                      </ThemeProvider>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </InfiniteScroll>
      </Box>
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
  );
  async function fetchMoreData() {
    let arr = text;
    let resp = await Promise.all(getActualStories(bestIds.slice(counter * 20, counter * 20 + 20)))
    let jsons = await Promise.all(resp.map(r => r.json()));
    let arr2 = Array(20)
    for (let idx in jsons) {
      jsons[idx]['time'] = new Date(jsons[idx]['time'] * 1000).toDateString()
      arr2[idx] = jsons[idx];
    }
    const x = arr.concat(arr2);
    setText(x);
    setCounter(counter + 1)
  }
}

export default App;
