const input = document.querySelector('input[type="file"]');
const preview = document.querySelector('.preview');
const binary = document.querySelector('.binary');
const hexa = document.querySelector('.hexa');
const modAdresare = {
    imediat: 0,
    direct: 1,
    indirect: 2,
    indexat: 3,
    dimensiune: 2
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

const clase = [
    {nume: "B1", biti: 4},
    {nume: "B2", biti: 8},
    {nume: "B3", biti: 8},
    {nume: "B4", biti: 16}
];
const B1 = clase[0];
const B2 = clase[1];
const B3 = clase[2];
const B4 = clase[3];
const keys = {
    [B1.nume]: Object.keys(numeClasa[0]),
    [B2.nume]: Object.keys(numeClasa[1]),
    [B3.nume]: Object.keys(numeClasa[2]),
    [B4.nume]: Object.keys(numeClasa[3]),
}
const values = {
    [B1.nume]: Object.values(numeClasa[0]),
    [B2.nume]: Object.values(numeClasa[1]),
    [B3.nume]: Object.values(numeClasa[2]),
    [B4.nume]: Object.values(numeClasa[3]),
}

function convertesteNumarul(hex, fill, bazaFrom = 16, bazaTo = 2) {
    return (parseInt(hex, bazaFrom).toString(bazaTo)).padStart(fill, '0');
}

function zec2bin(zec, fill) {
    return (parseInt(zec, 10).toString(2)).padStart(fill, '0');
}

const findOpcode = (biti, valoareInHexa) => {
    const valoareBinara = convertesteNumarul(valoareInHexa, biti)
    console.log(`${valoareInHexa} => ${valoareBinara}`)
    return valoareBinara;
};
const gresit = "Wrong";
const zecimalSauHexaPe16Biti = (intrare) => {
    let char1 = intrare[0];
    let char2 = intrare[1];
    let eHexa = false;
    if (char1 === "0" && char2 === "X") {
        intrare = intrare.slice(2);
        eHexa = true;
    }
    let intoarce;
    if (eHexa) {
        intoarce = convertesteNumarul(intrare, 16);
    } else {
        intoarce = convertesteNumarul(intrare, 16, 10, 2)
    }
    return intoarce;
}
const gasesteAdresarea = (input) => {
    input = input.toUpperCase()
    input = input.replace(/\s+/g, '')
    console.warn({input});
    let R = "R";
    let parDesc = "(";
    let parInchisa = ")";
    let indexParDesc = input.indexOf(parDesc);
    let parantezaDeschisaString = input[indexParDesc];

    let indexLiteraR = input.indexOf(R);
    let literaR = input[indexLiteraR];

    let alTreileaElement = input[2];
    let indexParInchisa = input.lastIndexOf(parInchisa);
    let ultimulElement = input[indexParInchisa]
    let numarBitiFormat = 4;
    let valoareaRegistrului;
    let findAdresare;
    let theThird;

    if (indexLiteraR > indexParDesc && indexLiteraR < indexParInchisa) {
        if (indexParDesc !== 0) {
            //Aici e mod de adresare indexat
            console.warn("Indexat")
            valoareaRegistrului = convertesteNumarul(input[indexLiteraR + 1], numarBitiFormat);
            findAdresare = convertesteNumarul(modAdresare.indexat, modAdresare.dimensiune)
            let valore = input.slice(0, indexParDesc)
            theThird = zecimalSauHexaPe16Biti(valore)
        } else {
            //Aici e mod de adresare indirect
            console.warn("Indirect")
            valoareaRegistrului = convertesteNumarul(alTreileaElement, numarBitiFormat);
            findAdresare = convertesteNumarul(modAdresare.indirect, modAdresare.dimensiune);
        }
    } else if (indexLiteraR === 0) {
        //Adresare Directa
        console.warn('Directa');
        valoareaRegistrului = convertesteNumarul(input[indexLiteraR + 1], numarBitiFormat);
        findAdresare = convertesteNumarul(modAdresare.direct, modAdresare.dimensiune);
    } else if (indexParDesc === -1 && indexLiteraR === -1 && indexParInchisa === -1) {
        //Adresare Imediata
        console.warn("Imediata");
        findAdresare = convertesteNumarul(modAdresare.imediat, modAdresare.dimensiune)
        valoareaRegistrului = "0000";
        console.info(input)
        theThird = zecimalSauHexaPe16Biti(input);

    }
    console.info(valoareaRegistrului, findAdresare, theThird)
    return [valoareaRegistrului, findAdresare, theThird];
}

// [a, b] = gasesteAdresarea("R0"); //Directa
// console.log(a, b)

// const input1 = "( R 2 )";
// let [c, d] = gasesteAdresarea(input1); //Indirecta
// console.log(input1, c, d)

let [e, f, z] = gasesteAdresarea("1124(R5)");
console.log(e, f, z)

// const input2 = "12 4 ( R 5)";
// let [g, h,i] = gasesteAdresarea(input2); //Indexata
// console.log(input2, g, h,i)
let theStiva = [];
const citesteFisier = (e) => {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
        const lines = reader.result.split('\n')
        for (let [liniaCurenta, item] of lines.entries()) {
            //Aici verificam daca linia curenta este un comentariu
            let pozitieHashtag = item.indexOf("#");
            if (pozitieHashtag !== -1) {
                item = item.slice(0, pozitieHashtag);
            } else if (pozitieHashtag === 0) {
                continue;
            }
            const spargeLinia = item.split(" ");
            const currentInstr = spargeLinia[0].toUpperCase();

            let registri = "Default";
            let test = gresit;
            let indexDinKeys = 0;
            let indexDinValues = 0;
            for (const clasa in keys) {
                if (keys[clasa].includes(currentInstr)) {
                    test = clasa;
                    indexDinKeys = keys[clasa].indexOf(currentInstr);
                    indexDinValues = values[clasa][indexDinKeys];
                    //Acest break este pentru a iesi din bucla cand se gaseste instructiunea corespunzatoare.
                    break;
                }
            }
            let opcode, tot, registruDestinatie, registruSursa, rs, mas, rd, mad, valoareRegistru
            switch (test) {
                //Clasa B1
                case B1.nume:
                    opcode = findOpcode(B1.biti, indexDinValues)
                    registri = spargeLinia[1].split(",");
                    if (registri.length < 2) {
                        break;
                    }
                    registruDestinatie = registri[0];
                    registruSursa = registri[1];
                    [rs, mas, valoareRegistru] = gasesteAdresarea(registruSursa);
                    [rd, mad] = gasesteAdresarea(registruDestinatie);
                    tot = opcode + mas + rs + mad + rd;

                    break;
                //Clasa B2
                case B2.nume:
                    registri = spargeLinia[1]
                    opcode = findOpcode(B2.biti, indexDinValues)
                    registruDestinatie = registri;
                    [rd, mad, valoareRegistru] = gasesteAdresarea(registruDestinatie);
                    tot = opcode + "00" + mad + rd;
                    break;
                //Clasa B3
                case B3.nume:
                    opcode = findOpcode(B3.biti, indexDinValues)
                    tot = opcode
                    break;
                //Clasa B4
                case B4.nume:
                    opcode = findOpcode(B4.biti, indexDinValues)
                    tot = opcode;
                    break;
                case gresit:
                    opcode = NaN;
                    console.log("77777");
                    break;
                default:
                    opcode = NaN;
                    console.log("Out of this world :)");
            }
            if (valoareRegistru !== undefined) {

            }
            let div = document.createElement('div');
            preview.appendChild(div);
            div.innerHTML += item;
            let bin = document.createElement('div');
            binary.appendChild(bin);
            bin.innerHTML += tot;
            if (valoareRegistru !== undefined) {
                bin.innerHTML += "\t";
                bin.innerHTML += valoareRegistru;
            }
            let hexaDiv = document.createElement('div');
            hexa.appendChild(hexaDiv);
            let totInBinar = convertesteNumarul(tot, 4, 2, 16)
            hexa.innerHTML += totInBinar + "\t";
            console.table(theStiva);


            if (valoareRegistru !== undefined) {
                let valoareRegistruInBinar = convertesteNumarul(valoareRegistru,2,2,16);
                hexa.innerHTML += valoareRegistruInBinar;
                console.error(valoareRegistruInBinar);
                theStiva.push([totInBinar.slice(2),totInBinar.slice(0,2),valoareRegistruInBinar.slice(2),valoareRegistruInBinar.slice(0,2)])
            }else{
                theStiva.push([totInBinar.slice(2),totInBinar.slice(0,2)])
            }

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