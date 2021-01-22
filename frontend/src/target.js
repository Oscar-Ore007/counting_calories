class Target {
    constructor(id, target_level, total_calories) {
        this.id = id
        this.target_level = target_level,
            this.total_calories = total_calories
    }

    viewTargets() {
        const targetsView = document.getElementById("results")

        targetsView.innerHTML +=
            
            `
            <ul class="target-list" data-set-id="${this.id}">
                <li id="total-calories" data-set-targets="${this.total_calories}"> ${this.total_calories} calories </li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            `
        
        document.getElementById("update").onclick = function() {
            const lists = Array.from(document.getElementsByClassName("target-list"))
            if (lists.slice(-1)[0]) {
                lists.slice(-2)[0].remove()
            }
            console.log(lists)
        }
    }

    static caloriesTarget(target_level, bmi) {
        if (target_level === "fat loss") {
            return (bmi - 500)
        }
        else if (target_level === "maintenance") {
            return bmi
        }
        else if (target_level === "gain weight") {
            return (bmi + 500)
        }
    }

    static updateCalories(target_level, total_calories) {
        if (target_level === "fat loss" && total_calories <= 2000) {
            return total_calories - 500
        }
        else if (target_level === "fat loss" && total_calories >= 2000) {
            return total_calories - 1000
        }
        else if (target_level === "maintenance" && total_calories <= 2000) {
            return total_calories + 500
        }
        else if (target_level === "maintenance" && total_calories >= 2000) {
            return total_calories
        }
        else if (target_level === "gain weight" && total_calories <= 2000) {
            return total_calories + 500
        }
        else if (target_level === "gain weight" && total_calories >= 2000) {
            return total_calories + 500
        }
    }
}