export async function fetchUserData() {
  const response = await fetch("http://localhost:3001/user-data");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return resData.userData;
}

export async function updateAccount(formData) {
  const response = await fetch("http://localhost:3001/user-data", {
    method: "PUT",
    body: JSON.stringify({ formData: formData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update");
  }

  return resData;
}
