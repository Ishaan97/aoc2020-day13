const readFile = require('fs').readFileSync;

const INPUTS = [];
readFile('input.txt', 'utf-8').split("\n").forEach(data => {
    INPUTS.push(data.trim());
});

let buses = INPUTS[1].split(",");
const timeStamp = parseInt(INPUTS[0]);

// console.log(timeStamp-(timeStamp%7)+7);

function part1(){
    let arr = [];
    let mini = Infinity;
    let busId = 0;
    for(let bus of buses){
        if(bus !== 'x'){
            bus = parseInt(bus);
            let busTime = (timeStamp-(timeStamp%bus))+bus;
            if(busTime < mini){
                mini = busTime;
                busId = bus;
            }
            // console.log(busTime);
        }
    }
    console.log("PART 1")
    console.log(mini, busId);
    console.log((mini-timeStamp)*busId)


}

// function part2BruteForce(){
    
//     let startBus = parseInt(buses[0]);
//     let timeStamp = startBus;
//     while(true){
//         let found = true;
//         console.log(timeStamp)
//         for(let i=1;i<buses.length;i++){
//             let bus = parseInt(buses[i]);
//             if(buses[i]!== 'x'){
//                 if((timeStamp+i)%bus===0){
//                     continue;
//                 }
//                 else{
//                     found = false;
//                     break;
//                 }
//             }
//         }
//         if(found){
//             console.log("PART 2")
//             break;
//         }

//         timeStamp += startBus
//     }
//     console.log(timeStamp)
// }

function part2(){
    // CODE FROM --> 
    // https://github.com/pixelomer/AdventOfCode/blob/main/2020/Day%2013%20-%20Shuttle%20Search/solution.js
    
    const constraints = buses.map(data=> (data ==='x'? -1 : parseInt(data)))
    buses = constraints.map((x) => ({time : x, ID : x}));
    // [{ time: 19, ID: 19 } ... ]
    let run = true;
    let multiplier = 0;
    let increment = 1;
    while(run){
        buses[0].time = buses[0].ID*multiplier;
        let found = true;
        for(let i=1;i<buses.length;i++){
            if(buses[i].ID === -1){
                buses[i].time = buses[i-1].time + 1;
				continue;
            }
            let newTime = 0;
            let j = 1;
            do {
                newTime = buses[i].ID * (Math.floor(buses[0].time / buses[i].ID) + j++);
            } while ((newTime - buses[i-1].time) <= 0);
            buses[i].time = newTime;
            if (buses[i].multiplier != null) {
                increment = multiplier - buses[i].multiplier;
            }
            buses[i].multiplier = multiplier;
            if (buses[i].time != (buses[i-1].time + 1)) {
                found = false;
                break;
            }
        }
        if(found === true){
            run = false;
        }
        multiplier += increment;
    }
    console.log(buses[0].time);
    

}

part1()
part2()
// part2BruteForce()