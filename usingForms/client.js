document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = {
            name: formData.get("username"),
            email: formData.get("email"),
            gender: formData.get("gender"),
            course: formData.get("course"),
            country: formData.get("country"),
            description: formData.get("description")
        };

        try {
            const response = await fetch("http://localhost:3000/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error("Failed to store user data.");
            }

            alert("User data submitted successfully!");
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting user data. Please try again.");
        }
    });
});
