
class Character {
    _life = 1;
    maxLife = 1;
    attack = 1;
    defense = 1;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }


}

//classes do jogo

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 70;
        this.maxLife = 70;
        this.attack = 20;
        this.defense = 8;
    }
}

class Mage extends Character {
    constructor(name) {
        super(name);
        this.life = 40;
        this.maxLife = 40;
        this.attack = 16;
        this.defense = 10;
    }
}


// classes  Monstro

class Goblin extends Character {
    constructor(name) {
        super(name);
        this.life = 150;
        this.maxLife = 150;
        this.attack = 15;
        this.defense = 6;
    }
}

class Stage {
    

    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject, customName) {
        this.fighter1 = fighter1;
        this.fighter1El = fighter1El;
        this.fighter2 = fighter2;
        this.fighter2El = fighter2El;
        this.log = logObject;
        this.customName = customName;
    }
    

    start() {
        document.getElementById('changeNameButton').addEventListener('click', () => this.changeCharacterName());
        this.update();
        this.fighter1El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    changeCharacterName() {
        const newName = document.getElementById('characterNameInput').value;
        if (newName) {
            this.fighter1.name = newName;
            this.update();
            document.getElementById('characterNameInput').style.display = 'none';
            document.getElementById('changeNameButton').style.display = 'none';
        }
    }



    update() {
        
        

        this.fighter1El.querySelector('.char-name').innerHTML = `${this.fighter1.name}`
        this.fighter1El.querySelector('.char-bar').innerHTML = `${this.fighter1.life.toFixed(2)}`
        let f1Percent = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.char-bar').style.width = `${f1Percent}%`;
        //monstro
        this.fighter2El.querySelector('.mob-name').innerHTML = `${this.fighter2.name}`;
        this.fighter2El.querySelector('.mob-bar').innerHTML = `${this.fighter2.life.toFixed(2)}`
        let f2Percent = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.mob-bar').style.width = `${f2Percent}%`;
    }


    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Jogo Encerrado');
            return;
        }


        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}.`);
        } else {
            this.log.addMessage(`${attacked.name} se defendeu de ${actualAttack.toFixed(2)} de dano.`);
        }

        this.update();
    }


}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }


}

