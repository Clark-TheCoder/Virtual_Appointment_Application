export async function deleteCall(call) {
  const access_token = call.access_token;

  try {
    const response = await fetch("/call/delseteCall", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token }),
    });

    const data = await response.json();

    return data.success;
  } catch (error) {
    return false;
  }
}
