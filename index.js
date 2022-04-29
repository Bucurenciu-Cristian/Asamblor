const input = document.querySelector('input[type="file"]');
const preview = document.querySelector('.preview');
const modAdresare = {
    imediat: 0,
    direct: 1,
    indirect: 2,
    indexat: 3
}
const numeClasa = [{
    MOV: "0",
    ADD: "1",
    SUB: "2",
    CMP: "3",
    AND: "4",
    OR: "5",
    XOR: "6"
}, {
    CLR: "80",
    NEG: "81",
    INC: "82",
    DEC: "83",
    ASL: "84",
    ASR: "85",
    LSR: "86",
    ROL: "87",
    ROR: "88",
    RLC: "89",
    RRC: "8A",
    JMP: "8B",
    CALL: "8C",
    PUSH: "8D",
    POP: "8E",
},{
    BR: "A0",
    BNE: "A1",
    BEQ: "A2",
    BPL: "A3",
    BMI: "A4",
    BCS: "A5",
    BCC: "A6",
    BVS: "A7",
    BVC: "A8",
},{
    CLC: "C000",
    CLV: "C001",
    CLZ: "C002",
    CLS: "C003",
    CCC: "C004",
    SEC: "C005",
    SEV: "C006",
    SEZ: "C007",
    SES: "C008",
    SCC: "C009",
    NOP: "C00A",
    RET: "C00B",
    RETI: "C00C",
    HALT: "C00D",
    WAIT: "C00E",
    "PUSH PC": "C00F",
    "POP PC": "C010",
    "PUSH FLAG": "C011",
    "POP FLAG": "C012"
}];

const clase = ["B1", "B2", "B3", "B4"];
const keys = {
    [clase[0]]: Object.keys(numeClasa[0]),
    [clase[1]]: Object.keys(numeClasa[1]),
    [clase[2]]: Object.keys(numeClasa[2]),
    [clase[3]]: Object.keys(numeClasa[3]),
}
const values = {
    [clase[0]]: Object.values(numeClasa[0]),
    [clase[1]]: Object.values(numeClasa[1]),
    [clase[2]]: Object.values(numeClasa[2]),
    [clase[3]]: Object.values(numeClasa[3]),
}
console.log("Keys")
for (const value in keys) {
    console.log(keys[value])
}
console.log("Values")
for (const value in values) {
    console.log(values[value])
}
const currLineInBytes = new Array(16).fill(0);
console.log(currLineInBytes)
const citesteFisier = (e) => {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
        const lines = reader.result.split('\n')
        for (const [i, item] of lines.entries()) {
            const spargeLinia = item.split(" ");
            const currentInstr = spargeLinia[0].toUpperCase();
            let registri = "Default";
            if (spargeLinia.length > 1) {
                registri = spargeLinia[1].split(",");
                console.log(registri);
            }

            let test = "Wrong";
            for (const clasa in keys) {
                if (keys[clasa].includes(currentInstr)) {
                    console.log(`${i}: ${item}, clasa este: ${clasa}`);
                    test = clasa;
                    //Acest break este pentru a iesi din bucla cand se gaseste instructiunea corespunzatoare.
                    break;
                }
            }
            switch (test) {
                //Clasa B1
                case clase[0]:
                    console.log(`G:${clase[0]},${currentInstr}`)
                    break;
                //Clasa B2
                case clase[1]:
                    console.log(`G:${clase[1]},${currentInstr}`)
                    break;
                //Clasa B3
                case clase[2]:
                    console.log(`G:${clase[2]},${currentInstr}`)
                    break;
                //Clasa B4
                case clase[3]:
                    console.log(`G:${clase[3]},${currentInstr}`)
                    break;
                default:
                    console.log("Te-am prins");
                    break;
            }
            let div = document.createElement('div');
            preview.appendChild(div);
            div.innerHTML += item;
        }
    };
}
input.addEventListener('change', citesteFisier, false);


function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        const list = document.createElement('ol');
        preview.appendChild(list);

        for (const file of curFiles) {
            const listItem = document.createElement('li');
            const para = document.createElement('p');
            if (validFileType(file)) {
                para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
                const image = document.createElement('img');
                image.src = URL.createObjectURL(file);

                listItem.appendChild(image);
                listItem.appendChild(para);
            } else {
                para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                listItem.appendChild(para);
            }

            list.appendChild(listItem);
        }
    }
}