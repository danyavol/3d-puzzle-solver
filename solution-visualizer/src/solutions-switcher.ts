import solutions from "../../data/all-solutions.json";
import { displaySolution } from "./display-solution";

export class SolutionsSwitcher {
    private totalSolutions = solutions.length;
    private currentSolution = Number(localStorage.getItem('currentSolution')) || 0;
    private elements = {
        current: document.getElementById('current-solution')!,
        total: document.getElementById('total-solutions')!,
        next: document.getElementById('next-solution')!,
        prev: document.getElementById('prev-solution')!,
    };

    constructor(private group: THREE.Group) {
        this.elements.current.innerText = (this.currentSolution + 1).toString();
        this.elements.total.innerText = this.totalSolutions.toString();
        this.elements.next.addEventListener('click', this.displayNext.bind(this));
        this.elements.prev.addEventListener('click', this.displayPrev.bind(this));

        this.display();
    }

    displayNext() {
        if (this.currentSolution < this.totalSolutions - 1) {
            this.currentSolution++;
            this.display();
        }
    }

    displayPrev() {
        if (this.currentSolution > 0) {
            this.currentSolution--;
            this.display();
        }
    }

    private display() {
        this.elements.current.innerText = (this.currentSolution + 1).toString();
        localStorage.setItem('currentSolution', this.currentSolution.toString()); 
        const meshes = displaySolution(solutions[this.currentSolution]);
        this.group.clear();
        this.group.add(...meshes);
    }
}