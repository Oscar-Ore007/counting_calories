const BASE_URL = "http://localhost:3000/"

document.addEventListener("DOMContentLoaded", () => {
    createForm();
    targetsForm();
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
            <input type="radio" name="genderS" id="gender" value="Female" required>Female</input>
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

// Calories POST 
const formSubmit = event => {
    event.preventDefault();

    let age = parseInt(document.getElementById("age").value)
    let gender = document.querySelector('input[name="genderS"]:checked').value;
    let weight = parseInt(document.getElementById("weight").value)
    let height = parseInt(document.getElementById("height").value)
    let bmi = Calorie.calculateCalories(age, gender, weight, height)

    fetch(`${BASE_URL}calories`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            age: age,
            gender: gender,
            weight: weight,
            height: height,
            bmi: bmi,
        })
    })

        .then(response => response.json())
   .then(calorie => { console.log(calorie)
                let u = new Calorie(calorie.id, calorie.age, calorie.gender, calorie.weight, calorie.height, calorie.bmi) 
                console.log(u)
                u.viewCalories()
        })
}

// Targets Form 

const targetsForm = () => {
    const targetsForm = document.createElement("form")
    targetsForm.setAttribute("id", "targetsForm")
    targetsForm.hidden = true;
    const div = document.getElementById("container")
    div.appendChild(targetsForm)

    targetsForm.innerHTML += 
        
        `
        <select id="target_level"><br>
            <option value="0">Choose your Target</option>
            <option value="fat loss">Fat Loss</option>
            <option value="maintenance">Maintenance</option>
            <option value="gain weight">Weight gain</option>
        
        
        
        </select><br>
        <input type="submit" value="Calculate Calorie Target" id="targetCalories"><br>
        <input type="button" value="Update Calorie Target" id="update">
        
        
        `
    
    targetsForm.addEventListener("submit", targetSubmit)
    document.getElementById("targetsForm").onsubmit = function () {
        const updateButton = document.getElementById("update")
        updateButton.hidden = false 
        updateButton.addEventListener("click", updateTargets)
        document.getElementById("targetCalories").setAttribute("disabled", true);
    }
}

// Target POST

const targetSubmit = (e) => {
    e.preventDefault()
    let id = parseInt(document.getElementById("calories").getAttribute("data-set-id"))
    let bmi = parseInt(document.getElementById("bmi").getAttribute("data-set-bmi"))

    let target = document.getElementById("target_level")
    let target_level = target.options[target.selectedIndex].value
    let total_calories = Target.caloriesTarget(target_level, bmi)

    fetch(`${BASE_URL}targets`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id,
            target_level,
            total_calories
        })
    })

        .then(response => response.json())
        .then(target => {
            if (target.message) {
                alert(target.message)
            }
            else {
                let t = new Target(target.id, target.target_level, target.total_calories)
                t.viewTargets()
                console.log(t)
            }
        })
}

// Targets PATCH 
const updateTargets = () => {
    event.preventDefault();

    const id = parseInt(document.getElementsByClassName("target-list")[0].getAttribute("data-set-targets"))
    const target = document.getElementById("target_level")
    const target_level = target.options[target.selectedIndex].value
    const total_calories = parseInt(document.getElementById("total-calories").getAttribute("data-set-targets"))
    const total = Target.updateCalories(target_level, total_calories)


    fetch(`${BASE_URL}targets/${id}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id, 
            target_level,
            total_calories: total 
        })
    })

        .then(response => response.json())
        .then(target => {
            if (target.message) {
                alert(target.message)
            }
            else {
                let t = new Target(target.id, target.target_level, target.total_calories)
                t.viewTargets()
            }
    })
}


// Calories DELETE 

const deleteCalories = () => {
    event.preventDefault();
    let id = parseInt(document.getElementById("calories").getAttribute("data-set-id"))

    fetch(`${BASE_URL}calories/${id}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
}