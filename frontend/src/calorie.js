class Calorie {
    constructor(id, age, gender, weight, height, bmi) {
        this.id = id;
        this.age = age;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.bmi = bmi 
    }

    viewCalories() {
        const viewCalories = document.getElementById("calorieValues")

        viewCalories.innerHTML +=
            
            `
            <ul id="calories" class="list" data-set-id="${this.id}">
                <li>Age: ${this.age}</li>
                <li>Gender: ${this.gender}</li>
                <li>Weight: ${this.weight}</li>
                <li>Height: ${this.height}</li>
                <li id="bmi" data-set-bmi="${this.bmi}">Calories: ${this.bmi}</li>
                <input type="button" value="Delete" id="deleteButton">
            </ul> 

                <ul id="calories" class="list" data-set-id="${this.id}">
                <li>Bonus Target:${Target.caloriesTarget("gain weight" , this.bmi)} </li>
                
                <li id="bmi" data-set-bmi="${this.bmi}">Calories: ${this.bmi}</li>
                <input type="button" value="Delete" id="deleteButton">


    
            
            </ul>
        
            `
        deleteButton.addEventListener("click", deleteCalories)

        document.getElementById("deleteButton").onclick = function () {
            window.location.reload() 
        }
    }

    static calculateCalories(age, gender, weight, height) {
        if (gender === "Male") {
            return Math.round((66.47 + (6.3 * weight) + (12.9 * height - (6.8 * age))))
        }
        else if (gender === "Female") {
            return Math.round((665 + (4.3 * weight) + (4.7 * height - (4.7 * age))))
        }
    }
}