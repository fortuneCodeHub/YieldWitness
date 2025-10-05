export async function fetchPost(id) {
    try {
        const res = await fetch(`/api/protected/posts/${id}}`);
        const data = await res.json();
    
        if (data.success === false) {
            // window.location.href = "/invalid";
            return data?.error;
        }
        return {
            post: data.post
        };
    } catch (err) {
        console.error("Fetch a single post error", err)
        return err;
    }
}
  
export async function fetchAllPosts() {
    try {
        const res = await fetch("/api/protected/posts/all");
        const data = await res.json();

        if (data.success === false) {
            // window.location.href = "/no-access";
            return data?.error;
        }
        return {
            posts: data.posts
        };
    } catch (err) {
        console.error("Fetch all posts error", err)
        return err;
    }
}
  
export async function deletePost(id) {
    try {
      const res = await fetch(`/api/protected/posts/${id}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        // window.location.href = "/no-access";
        // console.log(data);
        return data?.error;
      }
  
      return {
        success: true,
      };
    } catch (err) {
      console.error("Delete error:", err);
      return err;
    }
}
  
export async function updatePost(id, postData) {
    try {
      const res = await fetch(`/api/protected/posts/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        // window.location.href = "/no-access";
        // console.log(data);
        return data?.error;
      }
  
      return data;
    } catch (err) {
        console.error("Update error:", err);
        return err;
    }
}
  
//   export async function searchPost(query) {
//     try {
//       const res = await fetch(`/api/protected/posts/all`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(query)
//       });
  
//       const data = await res.json();
  
//       if (data.success === false) {
//         window.location.href = "/no-access";
//         console.log(data);
//         return data;
//       }
  
//       return data;
//     } catch (err) {
//       console.error("Post error:", err);
//       return null;
//     }
//   }
  
  
  