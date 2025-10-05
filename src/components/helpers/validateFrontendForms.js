// Validate for Create Post
export function validateFrontendCreatePost(body) {
    const { title, excerpt, category, thumbnail, author, readTime } = body;
  
    let errors = {};
  
    // Title
    if (!title || typeof title !== "string" || title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    }
  
    // Excerpt
    if (!excerpt || typeof excerpt !== "string" || excerpt.trim().length < 10) {
      errors.excerpt = "Excerpt must be at least 10 characters";
    }
  
    // Category
    const allowedCategories = ["Finance", "Tech", "Markets", "Guides"];
    if (!category || typeof category !== "string" || !allowedCategories.includes(category)) {
      errors.category = `Category must be one of: ${allowedCategories.join(", ")}`;
    }
  
    // Thumbnail
    if (!thumbnail || typeof thumbnail !== "object") {
      errors.thumbnail = "Thumbnail is required";
    }
  
    // Author
    if (!author || typeof author !== "string" || author.trim().length < 2) {
      errors.author = "Author name must be at least 2 characters";
    }
  
    // Date
    // if (!date || isNaN(Date.parse(date))) {
    //   errors.date = "A valid date is required";
    // }
  
    // Read Time
    if (!readTime || isNaN(Number(readTime)) || Number(readTime) <= 0) {
      errors.readTime = "Read time must be a positive number";
    }
  
    // If there are errors, return them
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      };
    }
  
    // Otherwise return cleaned data
    const data = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      category: category.trim(),
      thumbnail,
      author: author.trim(),
      readTime: `${readTime} min read`,
    };
  
    return {
      success: true,
      data,
    };
}
  
// Validate for Login
export function validateFrontendLogin(body) {
    const { email, password, rememberMe } = body

    let errors = {}
  
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "A valid email is required"
    }

    if (!password || typeof password !== "string") {
      errors.password = "Password is invalid"
    }

    if (typeof rememberMe !== "boolean") {
      errors.rememberMe = "rememberMe must be a boolean"
    }
  
    
    //  If there are errors, return them
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      }
    }
    
    // return { email, password, rememberMe }
    const data =  {
      email: email.trim().toLowerCase(),
      password,
      rememberMe,
    }

    return {
      success: true,
      data,
    }
}