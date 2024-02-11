// post the data from the form to database
function saveUser() {
    const form = document.querySelector("#formData");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const userData = {
            username: formData.get("name"),
            email: formData.get("email"),
            gender: formData.get("gender"), //Use to get one gender
            language: formData.getAll("language"), // Use getAll to get all selected languages
            country: formData.get("country")
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
                throw new Error("Failed to store user data");
            }

            alert("User data submitted successfully");
            form.reset();

        } catch (error) {
            console.error("Error posting into dB", error); 
        }
    });
}
saveUser();


// fetch the data from the database into the tables
 
function getData(){
    fetch("http://localhost:3000/get").then((res)=>{
        return res.json();
    }).then((data)=>{
        let output = "";
        data.map((user,index)=>{
            output +=`
            <tr>
                <td>${++index}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.language}</td>
                <td>${user.country}</td>
                <td><button>Edit</button>
                    <button onClick="deleteData('${user._id}')">Delete</button>
                </td>
            </tr>
            `
        });
        document.querySelector("#table_contents").innerHTML = output;
    }).then(()=>{
        getData();
    }).catch((e)=>{
        console.log("Error fetching from dB",e)
    })
}

getData();

// delete the datas

function deleteData(id){
    fetch(`http://localhost:3000/${id}`,{
        method:"DELETE",
    }).then((res)=>{
        getData();
        return res.json();
    })
    .catch((e)=>{
        console.log("Error deleting data",e);
    });
}