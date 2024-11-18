//import PostsTraditional from "./components/PostsTraditional"

import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import InfiniteScrolling from "./components/InfiniteScrolling"
import PaginatedQueries from "./components/PaginatedQueries"
import PostDetailsRQ from "./components/PostDetailRQ"
import PostsRQ from "./components/PostsRQ"
import PostsTraditional from "./components/PostsTraditional"

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul style={{listStyle:"none", display:"flex"}}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Traditional Posts</Link></li>
            <li><Link to="/rq-posts">RQ Posts</Link></li>
            <li><Link to="/paginated-fruits">Paginated Fruit</Link></li>
            <li><Link to="/infinite-fruits">Infinite Fruit</Link></li>
            
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts" element={<PostsTraditional/>}/>
          <Route path="/rq-posts" element={<PostsRQ/>}/>
          <Route path="/rq-posts/:postId" element={<PostDetailsRQ/>}/>
          <Route path="/paginated-fruits" element={<PaginatedQueries/>}/>
          <Route path="/infinite-fruits" element={<InfiniteScrolling/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
