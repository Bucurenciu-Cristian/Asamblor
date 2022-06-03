const input = document.querySelector('input[type="file"]'),
    preview = document.querySelector('.preview'),
    binary = document.querySelector('.binary'),
    hexa = document.querySelector('.hexa');
let create = document.getElementById('create'),
    pascupas = document.getElementById('pascupas')
totul = document.getElementById('totul')
textbox = document.getElementById('textbox');

let modAdresare, numeClasa, clase, first, second, third, fourth, B1, B2, B3, B4, keys, values, final, ordineaOctetilor;
modAdresare = {
    imediat: 1,
    direct: 0,
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
const reverseString = (str) => {
    return str.split("").reverse().join();
}
const convertesteNumarul = (hex, fill, bazaFrom = 16, bazaTo = 2) => {
    return (parseInt(hex, bazaFrom).toString(bazaTo)).padStart(fill, '0');
};

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
    let indexLiteraR = input.indexOf(R);
    let alTreileaElement = input[2];
    let indexParInchisa = input.lastIndexOf(parInchisa);
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
let theStivaReal = [];
const creeazaUnElement = (input) => {
    return document.createElement(input);
}
const adaugaCopilLaElement = (element, copil) => {
    element.appendChild(copil)
}
const adaugaLaElementulCurent = (element, continut) => {
    element.innerHTML += continut;
}
const afiseazaInstructiunile = true;
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
            let binaryDiv = creeazaUnElement('div');
            let hexaDiv = creeazaUnElement('div');
            let totInBinar = convertesteNumarul(tot, 4, 2, 16)
            if (afiseazaInstructiunile === true) {
                adaugaCopilLaElement(preview, div)
                adaugaLaElementulCurent(div, item);
                adaugaCopilLaElement(binary, binaryDiv)
                adaugaLaElementulCurent(binaryDiv, tot);
                adaugaCopilLaElement(hexa, hexaDiv)
                adaugaLaElementulCurent(hexa, totInBinar)
            }

            if (valoareRegistru !== undefined && afiseazaInstructiunile === true) {
                binaryDiv.innerHTML += "\n";
                adaugaLaElementulCurent(binaryDiv, valoareRegistru)
            }
            final = [];
            const secventa1_2 = totInBinar.slice(0, 2);
            const secventa3_4 = totInBinar.slice(2);

            let partial = [];
            let boolean = decizieOrdine === ordineaOctetilor.littleEndian
            partial = boolean ? [secventa3_4, secventa1_2] : [secventa1_2, secventa3_4];
            // Memorie.push(partial);

            if (valoareRegistru !== undefined) {
                let valoareRegistruInBinar = convertesteNumarul(valoareRegistru, 4, 2, 16);
                const secventa5_6 = valoareRegistruInBinar.slice(0, 2);
                const secventa7_8 = valoareRegistruInBinar.slice(2);
                boolean ? partial.push(secventa7_8, secventa5_6) : partial.push(secventa5_6, secventa7_8);

                if (afiseazaInstructiunile === true) {
                    adaugaLaElementulCurent(hexa, valoareRegistruInBinar)
                }
            }
            //Reminder: Memorie.push(partial);
            theStiva.push(partial.join(" "));
        }
        //Reminder: console.error(Memorie);
        theStiva = theStiva.join(" ");
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
let microInstructiuni = [
    //SBUS
    [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
        "1001",
        "1010",
        "1011",
        "1100",
    ],
    //DBUS
    [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
        "1001",
        "1010",
        "1011",
        "1100",
    ],
    //ALU
    [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
        "1001",
        "1010",
        "1011",
        "1100",
        "1101",
        "1110",
    ],
    //RBUS
    [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
        "1001",
    ],
    //OP MEM
    [
        "0000",
        "0001",
        "0010",
        "0011",
    ],
    //ALTE OP
    [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
        "1001",
        "1010",
        "1011",
        "1100",
        "1101",

    ],
    //SUCCESOR
    [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
    ],
    //INDEX
    [
        "000",
        "001",
        "010",
        "011",
        "100",
        "101",
        "110",
        "111",
    ],
    //`T/F
    [
        "0000",
        "0001",
    ],
]
let [SBUS_All, DBUS_All, ALU_All, RBUS_All, OP_MEM_ALL, ALTE_OP_All, SUCCESOR_All, INDEX_All, trueNegatpeFalse_All] = microInstructiuni
OP_MEM_ALL = OP_MEM_ALL.map(item => item.split("").slice(2).join(""))
SUCCESOR_All = SUCCESOR_All.map(item => item.split("").slice(1).join(""))
INDEX_All = INDEX_All.map(item => item.split("").slice(0).join(""))
trueNegatpeFalse_All = trueNegatpeFalse_All.map(item => item.split("").slice(3).join(""))
let microInBinar = [];
for (const x of microInstructiuni) {
    microInBinar.push(x.map(item => convertesteNumarul(item, 4, 10)));
}

const RG = new Array(16).fill(0);
const getRG = (input) => {
    return RG[input - 1];
}
let Memorie = [0x02,0x04,0x05,0x00,0x81,0x00,0x01,0x14,0x07,0x00,0x81,0x10,0x0d,0xc0];

//Registre pentru program principal
//Memoriea principala declarata mai sus(cea rezultata din fisierul de intrare .asm)
let IR = 0;
let PC = 0;
let T = 0;
let SP = 3500;
let MDR = 0;
let ADR = 0;
let IVR = 0;
//registrele generale(cele 16)

//Registre necesare pentru uProgram
let MIR = 0;
let MAR = 0;
let MPM = [
    0x60184D003,        //0
    0x00000198A,        //1
    0x000014804,        //2
    0x000010804,        //3
    0x301830000,        //4        
    0x1019C8000,        //5
    0x301800000,        //6
    0x6019C0000,        //7
    0x701880000,        //8
    0x901634800,        //9
    0x000000A0E,        //A
    0x000000B19,        //B
    0x000000E38,        //C
    0x000000E5A,        //D
    0x201500B14,        //E
    0x60188C813,        //F
    0x201880813,        //10
    0x60188C000,        //11
    0x283880000,        //12
    0x901500B14,        //13
    0x022900C1E,        //14
    0x000000802,        //15
    0x022880C1E,        //16
    0x05288C000,        //17
    0x923880C1E,        //18
    0x022900D25,        //19
    0x000000802,        //1A
    0x022880C1E,        //1B
    0x05288C000,        //1C
    0x823880D25,        //1D
    0x401900B34,        //1E
    0x483918B34,        //1F
    0x58391CB34,        //20
    0x58301CF00,        //21
    0x485920B34,        //22
    0x486920B34,        //23
    0x487920B34,        //24
    0x0B2920B34,        //25
    0x092920B34,        //26
    0xB8391CB34,        //27
    0xC83918B34,        //28
    0x088918B34,        //29
    0x089918B34,        //2A
    0x08A920B34,        //2B
    0x08B920B34,        //2C
    0x08C920B34,        //2D
    0x08D920B34,        //2E
    0x08E920B34,        //2F
    0x3018C8F00,        //30
    0x801500000,        //31
    0x301880000,        //32
    0x401804B34,        //33
    0x901300F00,        //34
    0x000000802,        //35
    0x0000C0F00,        //36
    0x0000C0F00,        //37
    0x000002B54,        //38
    0x000000F00,        //39
    0x000002BD4,        //3A
    0x000000F00,        //3B
    0x000003354,        //3C
    0x000000F00,        //3D
    0x0000033D4,        //3E
    0x000000F00,        //3F
    0x000002354,        //40
    0x000000F00,        //41
    0x0000023D4,        //42
    0x000000F00,        //43
    0x000003B54,        //44
    0x000000F00,        //45
    0x000003BD4,        //46
    0x000000F00,        //47
    0x000000B54,        //48
    0x000000000,        //49
    0x000000B4B,        //4A
    0x000000802,        //4B
    0x60188C850,        //4C
    0x022500851,        //4D
    0x60188C000,        //4E
    0x923500851,        //4F
    0x953500000,        //50
    0x301808000,        //51
    0x6019C0000,        //52
    0x401600F00,        //53
    0x000000802,        //54
    0x60188C859,        //55
    0x022600F00,        //56
    0x60188C000,        //57
    0x923600F00,        //58
    0x953600F00,        //59
    0x1A5100F00,        //5A
    0x000000000,        //5B
    0x1A6100F00,        //5C
    0x000000000,        //5D
    0x000000F00,        //5E
    0x000000000,        //5F
    0x00002C000,        //60
    0x000000000,        //61
    0x000024F00,        //62
    0x000000000,        //63
    0x000028800,        //64
    0x000000000,        //65
    0x301808000,        //66
    0x6019C0F00,        //67
    0x301880000,        //68
    0x901604F00,        //69
    0x301808000,        //6A
    0x1019C0F00,        //6B
    0x301880000,        //6C
    0x901104F00,        //6D
    0x301880000,        //6E
    0x901604F00,        //6F
    0x301880000,        //70
    0x901604000,        //71
    0x301880000,        //72
    0x901104F00,        //73
]

//Stari
let C = 0;
let Z = 0;
let S = 0;
let V = 0;
let Cin = 0;
let uADR = 0;
let Index = 0;
let INTR = 0;
let INTA = 0;
let BVI = 1;
let BI = 0;
let BE = 0;
let BE0 = 0;
let BE1 = 0;
let BP0 = 1;
let ACLOW = 0;
let CIL = 0;
let Flags = 0;
let g = 0;

//Magistrale
let SBUS = 0;
let DBUS = 0;
let RBUS = 0;
let ALU = 0;

let altaVariabilaGlobala = 0;
let stare = 0;

let hexString;
let instructiunePartiala;
let test;

const Get_CL0 = (instrReg) => {
    return (((instrReg & 0x8000) >> 15) & (~((instrReg & 0x2000) >> 13)));
}
const Get_CL1 = (instrReg) => {
    return (((instrReg & 0x8000) >> 15) & ((instrReg & 0x4000) >> 14));
}
const setSbus = (SBUS_codification) => {
    switch (SBUS_codification) {
        case SBUS_All[0]:
            return 0;
        case SBUS_All[1]:
            return Flags;
        case SBUS_All[2]:
            //todo: Arata la prof magia :)
            return RG[(IR & 0x3c0) >> 6];
        case SBUS_All[3]:
            return SP;
        case SBUS_All[4]:
            return T;
        case SBUS_All[5]:
            return -T;
        case SBUS_All[6]:
            return PC;
        case SBUS_All[7]:
            return IVR;
        case SBUS_All[8]:
            return ADR;
        case SBUS_All[9]:
            return MDR;
        case SBUS_All[10]:
            //todo: returneaza doar jumate din IR adica 7 0, bitii 0 -7
            return (IR & 0x00FF);
        case SBUS_All[11]:
            return 0;
        case SBUS_All[12]:
            return -1;
    }
}
const setDbus = (DBUS_codification) => {
    switch (DBUS_codification) {
        case DBUS_All[0]:
            return 0;
        case DBUS_All[1]:
            return Flags;
        case DBUS_All[2]:
            //todo: Arata la prof magia :)
            return RG[(IR & 0x000F)];
        case DBUS_All[3]:
            return SP;
        case DBUS_All[4]:
            return T;
        case DBUS_All[5]:
            return PC;
        case DBUS_All[6]:
            return IVR;
        case DBUS_All[7]:
            return ADR;
        case DBUS_All[8]:
            return MDR;
        case DBUS_All[9]:
            return -MDR;
        case DBUS_All[10]:
            //todo: returneaza doar jumate din IR adica 7 0, bitii 0 -7
            return (IR & 0x00FF);
        case DBUS_All[11]:
            return 0;
        case DBUS_All[12]:
            return -1;
    }
}
const executeALU = (ALU_codification) => {
    let rezultat;
    switch (ALU_codification) {
        case ALU_All[0]:
            return 0;
        case ALU_All[1]:
            return SBUS;
        case ALU_All[2]:
            return DBUS;
        case ALU_All[3]:
            rezultat = DBUS + SBUS;
            if (rezultat === 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (rezultat < 0) {
                S = 1;
            } else {
                S = 0;
            }
            if (((rezultat & 0x00010000) >> 16 == 1) && ((rezultat & 0x0000FFFF) < 0x0000FFFF)) {
                C = 1;
            } else {
                C = 0;
            }
            if (((rezultat & 0xFFFF0000) >> 16 > 0) && ((rezultat & 0x0000FFFF) == 0x0000FFFF)) {
                V = 1;
            } else {
                V = 0;
            }
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            return rezultat;
        case ALU_All[4]:
            rezultat = DBUS - SBUS;
            if (rezultat === 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (rezultat < 0) {
                S = 1;
            } else {
                S = 0;
            }
            if (((rezultat & 0x00010000) >> 16 == 1) && (rezultat & 0x0000FFFF) < 0x0000FFFF) {
                C = 1;
            } else {
                C = 0;
            }
            if (((rezultat & 0xFFFF0000) >> 16 > 0) && (rezultat & 0x0000FFFF) == 0x0000FFFF) {
                V = 1;
            } else {
                V = 0;
            }
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            return rezultat;
        case ALU_All[5]:
            rezultat = SBUS & DBUS;
            if (rezultat === 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (rezultat < 0) {
                S = 1;
            } else {
                S = 0;
            }
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            return rezultat;
        case ALU_All[6]:
            rezultat = SBUS | DBUS;
            if (rezultat === 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (rezultat < 0) {
                S = 1;
            } else {
                S = 0;
            }
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            return rezultat;
        case ALU_All[7]:
            rezultat = SBUS ^ DBUS;
            if (rezultat === 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (rezultat < 0) {
                S = 1;
            } else {
                S = 0;
            }
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            return rezultat;

    }
}
const setRbus = (RBUS_codification) => {
    switch (RBUS_codification) {
        case RBUS_All[0]:
            break;
        case RBUS_All[1]:
            Flags = RBUS;
            break;
        case RBUS_All[2]:
            Flags = RBUS & 0x0F;
            break;
        case RBUS_All[3]:
            RG[(IR & 0x0F)] = RBUS;
            break;
        case RBUS_All[4]:
            SP = RBUS;
            break;
        case RBUS_All[5]:
            T = RBUS;
            break;
        case RBUS_All[6]:
            PC = RBUS;
            break;
        case RBUS_All[7]:
            IVR = RBUS;
            break;
        case RBUS_All[8]:
            ADR = RBUS;
            break;
        case RBUS_All[9]:
            MDR = RBUS;
            break;
    }
}
const setOpMem = (OpMem_codification) => {
    switch (OpMem_codification) {
        case OP_MEM_ALL[0]:
            return 0;
        case OP_MEM_ALL[1]://IFCH
            IR = (Memorie[ADR+1]<<8) | Memorie[ADR];
            break;
        case OP_MEM_ALL[2]://READ
            MDR = (Memorie[ADR+1]<<8) | Memorie[ADR];
            break;
        case OP_MEM_ALL[3]://WRITE
            Memorie[ADR+1] = MDR >>8;
            Memorie[ADR] = MDR & 0x00FF;
            break;
    }
}
const setAlteOp = (AlteOp_codification) => {
    console.log("AlteOp_codification"+AlteOp_codification);
    switch (AlteOp_codification) {
        case ALTE_OP_All[0]:
            return 0;
        case ALTE_OP_All[1]:
            SP = SP + 2;
            break;
        case ALTE_OP_All[2]:
            SP = SP - 2;
            break;
        case ALTE_OP_All[3]:
            PC = PC + 2;
            break;
        case ALTE_OP_All[4]:
            BE0 = 1;
            break;
        case ALTE_OP_All[5]:
            BE1 = 1;
            break;
        case ALTE_OP_All[6]:
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            break
        case ALTE_OP_All[7]:
            RBUS += 1;
            if (RBUS == 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (RBUS < 0) {
                S = 1;
            } else {
                S = 0;
            }
            if (((RBUS & 0x00010000) >> 16 == 1) && ((RBUS & 0x0000FFFF) < 0x0000FFFF)) {
                C = 1;
            } else {
                C = 0;
            }
            if (((RBUS & 0xFFFF0000) >> 16 > 0) && ((RBUS & 0x0000FFFF) == 0x0000FFFF)) {
                V = 1;
            } else {
                V = 0;
            }
            Flags = (C << 3) | (V << 2) | (Z << 1) | (S << 0);
            break;
        case ALTE_OP_All[8]:
            if (RBUS == 0) {
                Z = 1;
            } else {
                Z = 0;
            }
            if (RBUS < 0) {
                S = 1;
            } else {
                S = 0;
            }
            Flags = (Z << 1) | (S << 0);
            break;
        case ALTE_OP_All[9]:
            BVI = 1;
            break;
        case ALTE_OP_All[10]:
            BVI = 0;
            break;
        case ALTE_OP_All[11]:
            BP0 = 0;
            break;
        case ALTE_OP_All[12]:
            INTA = 1;
            SP = SP - 2;
            break;
        case ALTE_OP_All[13]:
            BE = 0;
            BI = 0;
            break;
    }
}
let Get_SUCCESSOR = (uInstrReg) => {
    let chooser = ((uInstrReg & 0x3800) >> 11);
    chooser = chooser.toString(2).padStart(3,0);
    switch (chooser) {
        case SUCCESOR_All[0]:
            return 0;
        case SUCCESOR_All[1]:
            return 1;
        case SUCCESOR_All[2]:
            return ACLOW;
        case SUCCESOR_All[3]:
            return CIL;
        case SUCCESOR_All[4]:
            return ((Flags & 0x0008) >> 3);
        case SUCCESOR_All[5]:
            return ((Flags & 0x0002) >> 1);
        case SUCCESOR_All[6]:
            return (Flags & 0x0001)
        case SUCCESOR_All[7]:
            return ((Flags & 0x0004) >> 2);
    }
}
const getIndex = () => {
    let index = (MIR & 0x700) >> 8;
    index = index.toString(2).padStart(3,0);
    switch (index) {
        case INDEX_All[0]:
            return 0;
        case INDEX_All[1]:
            return ((Get_CL1(IR) << 1) | Get_CL0(IR));
        case INDEX_All[2]:
            return ((IR & 0xC00) >> 10);
        case INDEX_All[3]:
            return ((IR & 0x30) >> 4);
        case INDEX_All[4]:
            return ((IR & 0x7000) >> 12);
        case INDEX_All[5]:
            return ((IR & 0xF00) >> 8);
        case INDEX_All[6]:
            return (((IR & 0xF00) >> 8) << 1);
        case INDEX_All[7]:
            return (INTR<<2);
    }
}
let getMicroAdrSalt = (uInstrReg) => (uInstrReg & 0x7F);
const get_g = (uInstrReg) => (Get_SUCCESSOR(uInstrReg) ^ Get_nT_F(uInstrReg));
const Get_nT_F = (uInstrReg) => ((uInstrReg & 0x80) >> 7);

//Reminder: Asta nuj daca ii ok
const setTf = (Tf_codification) => {
    switch (Tf_codification) {
        case trueNegatpeFalse_All[0]:
            return 0;
            break;
        case trueNegatpeFalse_All[1]:
            return 1;
            break;
    }
}

const secventiatorApel = () => {
    switch (stare) {
        case 0:
            MIR = MPM[MAR];
            hexString = MIR.toString(16).padStart(9,0);
            instructiunePartiala = hexString.split("").slice(4).join("");
            test = convertesteNumarul(instructiunePartiala, instructiunePartiala.length * 4);
            console.log(instructiunePartiala+"\n"+test);
            stare = 1;
            altaVariabilaGlobala++;
            console.error({hexString},{test});
            break;
        case 1:
            
            g = get_g(MIR);
            if (g === 0)
                {MAR++;}
            else {
                uADR = getMicroAdrSalt(MIR);
                Index = getIndex();
                MAR = uADR + Index;
            }
            
            let SBUS_codification = convertesteNumarul(hexString[0], 4);
            SBUS = setSbus(SBUS_codification);
            let DBUS_codification = convertesteNumarul(hexString[1], 4);
            DBUS = setDbus(DBUS_codification);
            let ALU_codification = convertesteNumarul(hexString[2], 4);
            RBUS = executeALU(ALU_codification);
            let RBUS_codification = convertesteNumarul(hexString[3], 4);
            setRbus(RBUS_codification);
            // todo: Sterge comment-ul de aici.
            let alteOp_codification = test.slice(2, 6);
            setAlteOp(alteOp_codification);
            altaVariabilaGlobala++;
            stare = 2;
            updateMagistralaRegister();
            updateDisplayOfRegisters();
            break;
        case 2:
            stare = 3;
            altaVariabilaGlobala++
            break;
        case 3:
            stare = 0;
            let operatiiMemorie_codification = test.slice(0, 2);
            setOpMem(operatiiMemorie_codification);
            updateDisplayOfRegisters();
            if(IR === 0xC00D){
                BP0 = 0;
            }
            if(document.getElementById('interrupt').checked){
                INTR = 1;
                document.getElementById('interrupt').checked = false;
            }
            if(document.getElementById('aclow').checked){
                ACLOW = 1;
            }
            altaVariabilaGlobala++
            break;
    }
    displayGeneralRegisters();
}

const secventiatorInfinit = () => {
    while(BP0 === 1 && ACLOW === 0){
        secventiatorApel();
        if(INTR === 1){
            window.alert("O aparut o intrerupere.");
            INTR = 0;
        }
    }
    if(BP0 === 0)
        window.alert("Am ajuns la sfarsitul executiei programului.");
    if(ACLOW === 1)
        window.alert("O picat curentul.")
}
const secventiatorPasCuPas = () => {
    altaVariabilaGlobala = 0;
    if(BP0 === 1 && ACLOW === 0){
        while (altaVariabilaGlobala % 4 !== 0 || altaVariabilaGlobala === 0) {
            secventiatorApel(); 
            if(INTR === 1){
                window.alert("O aparut o intrerupere.");
                INTR = 0;
            }
        }
    }else{
        if(BP0 === 0)
            window.alert("Am ajuns la sfarsitul executiei programului.");
        if(ACLOW === 1)
            window.alert("O picat curentul.")
    }
}


totul.addEventListener('click', secventiatorInfinit, false);
pascupas.addEventListener('click', secventiatorPasCuPas, false);

function displayGeneralRegisters(){
    for(let i = 0; i < 16; i++){
        document.getElementById("R"+i).value = RG[i];
    }
}

function updateDisplayOfRegisters(){
    document.getElementById("IR").value = IR.toString(16);
    document.getElementById("PC").value = PC.toString(16);
    document.getElementById("T").value = T.toString(16);
    document.getElementById("SP").value = SP.toString(16);
    document.getElementById("MDR").value = MDR.toString(16);
    document.getElementById("ADR").value = ADR.toString(16);
    document.getElementById("IVR").value = IVR.toString(16);
}

function updateMagistralaRegister(){
    document.getElementById("SBUS").value = SBUS.toString(16);
    document.getElementById("DBUS").value = DBUS.toString(16);
    document.getElementById("RBUS").value = RBUS.toString(16);
    document.getElementById("ALU").value = ALU.toString(16);
}