export async function getCallData(access_token) {
  try {
    let response = await fetch("/call/visit_summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      console.log("Okay");
    } else {
      console.log("Bad");
    }
  } catch (error) {}
}
