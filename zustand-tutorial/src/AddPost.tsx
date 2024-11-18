import { usePostStore } from "./store"

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement,
  //postAuthor:HTMLSelectElement,
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

function AddPost() {
  
  const {posts, addPost, removePost} = usePostStore()

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    addPost({title, content, id:(posts.length + 1).toString()})

    //const form = e.currentTarget

    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required placeholder="Post Title"/><br/><br/>
        
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required placeholder="Post Content"/><br/><br/>

        <button>Save Post</button>
      </form>

      <div>
        {
          posts.length > 0 ? (
      
            posts.map(p=>(
              <div key={p.id}>
                <h5>{p.title}</h5>
                <p>{p.content}</p>
                <button onClick={()=>removePost(p.id)}>Delete</button>
              </div>
            ))
              
          ) : (<h1>No Post</h1>)
        }
      </div>
    </section>
  )
}

export default AddPost
