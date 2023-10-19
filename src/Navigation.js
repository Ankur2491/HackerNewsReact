import { Link } from 'react-router-dom';
import { useState } from 'react';
import App from './App';
import { AppBar, Divider, Toolbar } from '@mui/material';
import Search from './Search';

export default function Navigation() {
    const [cat, setCat] = useState('new');
    return (
        <div>
        <AppBar position="sticky" style={{backgroundColor:'#1F1B24'}}>
            <Toolbar disableGutters>
          <Link style={{ color: '#F5F5F5', fontSize:'20px', textDecoration:'none' }} onClick={()=>setCat('new')}>HackerNews</Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link style={{ color: cat === 'new'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'2px' }} onClick={()=>setCat('new')}>New</Link>
          <Link style={{ color: cat === 'top'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'2px' }} onClick={()=>setCat('top')}>Top</Link>
          <Link style={{ color: cat === 'best'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'2px' }} onClick={()=>setCat('best')}>Best</Link>
          <Link style={{ color: cat === 'show'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'2px' }} onClick={()=>setCat('show')}>Show</Link>
          <Link style={{ color: cat === 'ask'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'2px' }} onClick={()=>setCat('ask')}>Ask</Link>
          <Link style={{ color: cat === 'search'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'2px' }} onClick={()=>setCat('search')}>Search</Link>
            </Toolbar>
        </AppBar>
        {
        cat !== 'search' && <App category={cat}/>
        }
        {
            cat === 'search' && <Search/>
        }
        </div>
    )
}
