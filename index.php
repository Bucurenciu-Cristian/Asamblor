<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Asamblor</title>
    <link rel="stylesheet" href="Styles/style.css">
    <link rel="stylesheet" href="Styles/bootstrap.css">
</head>
<body>
<div id="root">
    <form method="post" enctype="multipart/form-data">
        <div>
            <label for="image_uploads">Choose text files to upload</label>
            <input type="file" id="image_uploads" name="image_uploads" accept=".asm" multiple>
        </div>
        <div class="instructions d-flex justify-content-around">
            <div class="preview">
                <div>Instructiunea</div>
            </div>
            <div class="binary">
                <div>Binar</div>
            </div>
            <div class="hexa">
                <div>Hexa</div>
            </div>
        </div>

    </form>
    <div class="d-flex justify-content-around align-items-center flex-column m-3">

        <textarea id="textbox">X</textarea>
        <div class="m-3">
            <button class="btn btn-success" id="create">Download Text Box</button>
            <button class="btn btn-success" id="totul">Totul</button>
            <button class="btn btn-success" id="pascupas">PascuPas</button>
        </div>
        <div><h2>Registre generale</h2></div>

        <div class="d-flex flex-row  registers  align-items-center justify-content-around">
            <div><label for="R0">R0:</label><input id="R0" name="R0" type="text" disabled></div>
            <div><label for="R1">R1:</label><input id="R1" name="R1" type="text" disabled></div>
            <div><label for="R2">R2:</label><input id="R2" name="R2" type="text" disabled></div>
            <div><label for="R3">R3:</label><input id="R3" name="R3" type="text" disabled></div>
            <div><label for="R4">R4:</label><input id="R4" name="R4" type="text" disabled></div>
            <div><label for="R5">R5:</label><input id="R5" name="R5" type="text" disabled></div>
            <div><label for="R6">R6:</label><input id="R6" name="R6" type="text" disabled></div>
            <div><label for="R7">R7:</label><input id="R7" name="R7" type="text" disabled></div>
            <div><label for="R8">R8:</label><input id="R8" name="R8" type="text" disabled></div>
            <div><label for="R9">R9:</label><input id="R9" name="R9" type="text" disabled></div>
            <div><label for="R10">R10:</label><input id="R10" name="R10" type="text" disabled></div>
            <div><label for="R11">R11:</label><input id="R11" name="R11" type="text" disabled></div>
            <div><label for="R12">R12:</label><input id="R12" name="R12" type="text" disabled></div>
            <div><label for="R13">R13:</label><input id="R13" name="R13" type="text" disabled></div>
            <div><label for="R14">R14:</label><input id="R14" name="R14" type="text" disabled></div>
            <div><label for="R15">R15:</label><input id="R15" name="R15" type="text" disabled></div>
        </div>
        <br>
        <div><h2>Registre pentru program principal</h2></div>
        <div class="registreNormale d-flex flex-row  registers  align-items-center justify-content-around">
            <div><label for="IR">IR:</label><input id="IR" name="IR" type="text" disabled></div>
            <div><label for="PC">PC:</label><input id="PC" name="PC" type="text" disabled></div>
            <div><label for="T">T:</label><input id="T" name="T" type="text" disabled></div>
            <div><label for="SP">SP:</label><input id="SP" name="SP" type="text" disabled></div>
            <div><label for="MDR">MDR:</label><input id="MDR" name="MDR" type="text" disabled></div>
            <div><label for="ADR">ADR:</label><input id="ADR" name="ADR" type="text" disabled></div>
            <div><label for="IVR">IVR:</label><input id="IVR" name="IVR" type="text" disabled></div>
        </div>
        <div><h2>Magistrale</h2></div>
        <div class="magistrale d-flex flex-row  registers  align-items-center justify-content-around">
            <div><label for="SBUS">SBUS:</label><input id="SBUS" name="SBUS" type="text" disabled></div>
            <div><label for="DBUS">DBUS:</label><input id="DBUS" name="DBUS" type="text" disabled></div>
            <div><label for="RBUS">RBUS:</label><input id="RBUS" name="RBUS" type="text" disabled></div>
            <div><label for="ALU">ALU:</label><input id="ALU" name="ALU" type="text" disabled></div>
        </div>

        <div class="d-flex justify-content-around flex-column m-3">
            <label for="interrupt">Interrupt</label><input type="checkbox" id="interrupt" name="interrupt" value="1">
            <label for="aclow">ACLOW</label><input type="checkbox" id="aclow" name="aclow" value="1">
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>