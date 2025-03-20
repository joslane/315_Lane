
class Superperson {
    constructor(name, power, identity, isGood, isSecret){
        this.name = name;
        this.power = power;
        this.identity = identity;
        this.isGood = isGood;
        this.isSecret = isSecret;
    }

    goUndercover(){
        this.isSecret = true;
    }

    revealIdentity(){
        this.isSecret = false;
        console.log(`I, ${this.identity}, am actually ${this.name}! What??`);
    }

    corrupt() {
        if (this.isGood) {
            this.isGood = false;
            console.log("This world doesn't get me... It's time to go bananas!");
        }
        else {
            console.log("Haha, I'm already a bad guy!");
        }
    }
    
    redeem() {
        if (!this.isGood) {
            this.isGood = true;
            console.log("I'm sorry, everyone. Maybe the real superpower were the friends I made along the way!")
        }
        else {
            console.log("Um, I'm kinda perfect already :)")
        }
    }

    showInfo(){
        let affinity = this.isGood ? "Superhero" : "Supervillain";
        let name = this.isSecret ? this.name : this.identity;
        let message = `${affinity}: ${name}. Power: ${this.power}`;
        console.log(message);
    }
}


bob = new Superperson("Mr. Incredible", "SUPER strength", "Bob Parr", true, true);

bob.showInfo();

bob.revealIdentity();

bob.corrupt();
bob.corrupt();

bob.showInfo();

bob.redeem();
bob.redeem();