const BASE_URL = "http://localhost:300/"

document.addEventListener("DOMContentLoaded", () => {
    createForm();
    targetForm();
})

//Calories Form 
const createForm = () => {
    const caloriesForm = document.createElement("div");
    const div = document.getElementById("container");
    div.appendChild(caloriesForm);

    caloriesForm.innerHTML += 
        
        ` 
        <form id="myForm" name="myForm">
            <label>Age:</label><br>
            <input type="number" id="age" min="18" max="90" required><br>
            <br>
            <label>Gender:</label><br>
            <input type="radio" name="genderS" id="gender" value="Male" required>Male</input>
            <input type="radio" name="genderS" id="gender" value="Female" required>Male</input>
            <br>
            <label>Weight:</label><br>
            <input type="number" id="weight" placeholder="in Lbs" min="90" max="400" required> 
            <br> 
            <label>Height</label><br>
            <input type="number" id="height" placeholder="in inches" min="48" max="84" required>
            <br>
            <input type="submit" value="Count your Calories" id="totalCalories"><br>

        
        </form>
        
        `
    caloriesForm.addEventListener("submit", formSubmit)

    document.getElementById("myForm").onsubmit = function () {
        document.getElementById("totalCalories").setAttribute("disabled", true);
        document.getElementById("goalsForm").hidden = false;
    }
}