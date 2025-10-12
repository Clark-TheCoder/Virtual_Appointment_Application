export async function startCall() {
  try {
    const response = await fetch("/call/startCall", {
      method: "POST",
      credentials: "include",
    });
    console.log("hi");
  } catch (error) {
    alert("Could not begin call at this time.");
  }
}
