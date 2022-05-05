const input = document.querySelector('input[type="file"]'),
    preview = document.querySelector('.preview'),
    binary = document.querySelector('.binary'),
    hexa = document.querySelector('.hexa');
let create = document.getElementById('create'),
    textbox = document.getElementById('textbox');
let modAdresare, numeClasa, clase, first, second, third, fourth, B1, B2, B3, B4, keys, values, final, ordineaOctetilor;
modAdresare = {
    imediat: 0,
    direct: 1,
    indirect: 2,
    indexat: 3,
    dimensiune: 2
};
numeClasa = [{
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
}, {
    BR: "A0",
    BNE: "A1",
    BEQ: "A2",
    BPL: "A3",
    BMI: "A4",
    BCS: "A5",
    BCC: "A6",
    BVS: "A7",
    BVC: "A8",
}, {
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
clase = [
    {nume: "B1", biti: 4},
    {nume: "B2", biti: 8},
    {nume: "B3", biti: 8},
    {nume: "B4", biti: 16}
];
[first, second, third, fourth] = clase;
B1 = first;
B2 = second;
B3 = third;
B4 = fourth;
keys = {
    [B1.nume]: Object.keys(numeClasa[0]),
    [B2.nume]: Object.keys(numeClasa[1]),
    [B3.nume]: Object.keys(numeClasa[2]),
    [B4.nume]: Object.keys(numeClasa[3]),
};
values = {
    [B1.nume]: Object.values(numeClasa[0]),
    [B2.nume]: Object.values(numeClasa[1]),
    [B3.nume]: Object.values(numeClasa[2]),
    [B4.nume]: Object.values(numeClasa[3]),
};
final = [];
const littleEndian = "littleEndian";
const bigEndian = "bigEndian";
ordineaOctetilor = {littleEndian, bigEndian}
const decizieOrdine = ordineaOctetilor.littleEndian
console.error(ordineaOctetilor)

function convertesteNumarul(hex, fill, bazaFrom = 16, bazaTo = 2) {
    return (parseInt(hex, bazaFrom).toString(bazaTo)).padStart(fill, '0');
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
const eliminaSpatiulGol = (input) => {
    return input.replace(/\s+/g, '')
}
const gasesteAdresarea = (input) => {
    input = input.toUpperCase()
    input = eliminaSpatiulGol(input);
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
let theStiva = [];
const creeazaUnElement = (input) => {
    return document.createElement(input);
}
const adaugaCopilLaElement = (element, copil) => {
    element.appendChild(copil)
}
const adaugaLaElementulCurent = (element, continut) => {
    element.innerHTML += continut;
}
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
            let spargeLinia = item.split(" ");
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
                    spargeLinia[1] = spargeLinia.slice(1).join("");
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
                    //Todo aici mai ai de implementat deoarece nu intelegi bine aceste instructiuni.
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
            let div = creeazaUnElement('div');
            let bin = creeazaUnElement('div');
            let hexaDiv = creeazaUnElement('div');
            let totInBinar = convertesteNumarul(tot, 4, 2, 16)
            adaugaCopilLaElement(preview, div)
            adaugaLaElementulCurent(div, item);
            adaugaCopilLaElement(binary, bin)
            adaugaLaElementulCurent(bin, tot);
            adaugaCopilLaElement(hexa, hexaDiv)
            adaugaLaElementulCurent(hexa, totInBinar)
            if (valoareRegistru !== undefined) {
                bin.innerHTML += "\n";
                adaugaLaElementulCurent(bin, valoareRegistru)
            }
            final = [];
            const secventa1_2 = totInBinar.slice(0, 2);
            const secventa3_4 = totInBinar.slice(2);
            let partial = [];
            console.info(typeof partial)
            let boolean = decizieOrdine === ordineaOctetilor.littleEndian
            partial = boolean ? [secventa3_4, secventa1_2] : [secventa1_2, secventa3_4];
            console.info(typeof partial)
            if (valoareRegistru !== undefined) {
                let valoareRegistruInBinar = convertesteNumarul(valoareRegistru, 4, 2, 16);
                const secventa5_6 = valoareRegistruInBinar.slice(0, 2);
                const secventa7_8 = valoareRegistruInBinar.slice(2);
                boolean ? partial.push(secventa7_8, secventa5_6) : partial.push(secventa5_6, secventa7_8);
                adaugaLaElementulCurent(hexa, valoareRegistruInBinar)
            }
            console.info(typeof partial)
            theStiva.push(partial.join(" "));
        }
        theStiva = theStiva.join("\n");
        textbox.value = theStiva;
    };
}
input.addEventListener('change', citesteFisier, false);

(function () {
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        };
    create.addEventListener('click', function () {
        var link = document.createElement('a');
        link.setAttribute('download', 'info.bin');
        link.href = makeTextFile(textbox.value);
        document.body.appendChild(link);

        // wait for the link to be added to the document
        window.requestAnimationFrame(function () {
            var event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
        });

    }, false);
})();