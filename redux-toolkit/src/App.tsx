import AddNewBlog from "./blog-app/add-new-blog"
import BlogList from "./blog-app/blog-list"
import CounterButton from "./counter-example/counter-button"
import CounterValue from "./counter-example/counter-value"

export function CounterExample(){
  return (
    <>
      <h1>Redux Toolkit</h1>
      <CounterValue/>
      <CounterButton/>
    </>
  )
}

export function BlogListExample(){
  return (
    <div>
      <h1>Blog List App</h1>
      <AddNewBlog/>
      <BlogList/>
    </div>
  )
}

function App() {
 
  return (
    <div>
      <BlogListExample/>
    </div>
  )
}

export default App
