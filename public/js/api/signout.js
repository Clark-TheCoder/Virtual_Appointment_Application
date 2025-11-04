export async function signout() {
  try {
    const response = await fetch("/auth/signout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return false;
    }
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error during sign out:", error);
  }
}
