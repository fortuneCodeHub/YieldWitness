// Validate for Register
export function validateRegister(body) {
    const { email, username, password, confirmPassword, passwordClue, access, rememberMe } = body
  
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email is required")
    }
  
    if (!username || typeof username !== "string" || username.length < 3) {
      throw new Error("Username must be at least 3 characters")
    }
  
    if (!password || typeof password !== "string" || password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    if (!password || typeof password !== "string" || password !== confirmPassword) {
      throw new Error("Passwords don't match")
    }
  
    if (!passwordClue || typeof passwordClue !== "string" || passwordClue.length < 3) {
      throw new Error("Password clue must be at least 3 characters")
    }
  
    if (!["user", "admin"].includes(access)) { 
      throw new Error("Access must be either 'user' or 'admin'")
    }
  
    if (typeof rememberMe !== "boolean") {
      throw new Error("rememberMe must be a boolean")
    }
  
    return {
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password,
      passwordClue: passwordClue.trim(),
      access: access.trim(),
      rememberMe,
    }
}

// Validate for Login
export function validateLogin(body) {
    const { email, password, rememberMe } = body
  
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email is required")
    }

    if (!password || typeof password !== "string") {
      throw new Error("Password is invalid")
    }

    if (typeof rememberMe !== "boolean") {
      throw new Error("rememberMe must be a boolean")
    }
  
    // return { email, password, rememberMe }
    return {
      email: email.trim().toLowerCase(),
      password,
      rememberMe,
    }
}

export function validateCreatePost(body) {
    const { title, excerpt, category, thumbnail, author, readTime } = body;
  
    // let errors = {};
  
    // Title
    if (!title || typeof title !== "string" || title.trim().length < 3) {
      throw new Error("Title must be at least 3 characters")
    }
  
    // Excerpt
    if (!excerpt || typeof excerpt !== "string" || excerpt.trim().length < 10) {
      throw new Error("Excerpt must be at least 10 characters")
    }
  
    // Category
    const allowedCategories = ["Finance", "Tech", "Markets", "Guides"];
    if (!category || typeof category !== "string" || !allowedCategories.includes(category)) {
      throw new Error(`Category must be one of: ${allowedCategories.join(", ")}`)
    }
  
    // Thumbnail
    if (!thumbnail || typeof thumbnail !== "object") {
      throw new Error("Thumbnail is required")
    }
  
    // Author
    if (!author || typeof author !== "string" || author.trim().length < 2) {
      throw new Error("Author name must be at least 2 characters")
    }
  
    // Date
    // if (!date || isNaN(Date.parse(date))) {
    //   errors.date = "A valid date is required";
    // }
  
    // Read Time
    if (!readTime || isNaN(Number(readTime)) || Number(readTime) <= 0) {
      throw new Error("Read time must be a positive number")
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
