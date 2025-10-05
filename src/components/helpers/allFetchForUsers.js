export async function fetchUser() {
    try {
      const res = await fetch("/api/protected/users/me");
      const data = await res.json();
  
      if (data.success === false) {
        window.location.href = "/no-access";
        return null;
      }
      return {
        loading: false,
        user: data.user
      };
    } catch (err) {
      return err;
    }
}