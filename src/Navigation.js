import { Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import App from './App';

export default function Navigation() {
    const [cat, setCat] = useState('new');
    return (
        <div>
        <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
          position:'sticky',
          top:0,
          backgroundAttachment:'fixed',
          backgroundColor:'black'    }}>
          <Link style={{ color: cat === 'new'? 'blue': '' }} onClick={()=>setCat('new')}>New</Link>
          <Link style={{ color: cat === 'top'? 'blue': '' }} onClick={()=>setCat('top')}>Top</Link>
          <Link style={{ color: cat === 'best'? 'blue': '' }} onClick={()=>setCat('best')}>Best</Link>
          <Link style={{ color: cat === 'show'? 'blue': '' }} onClick={()=>setCat('show')}>Show</Link>
          <Link style={{ color: cat === 'ask'? 'blue': '' }} onClick={()=>setCat('ask')}>Ask</Link>
        </nav>
        <App category={cat}/>
        </div>
    )
}
