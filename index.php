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
        <div class="d-flex row flex-wrap registers  align-items-center justify-content-around">
            <div class="col-12 d-flex justify-content-center align-content-center">
                <div class="styling-left"><label for="R0">R0:</label><input id="R0" name="R0" type="text" disabled></div>
                <div class="styling-left"><label for="R1">R1:</label><input id="R1" name="R1" type="text" disabled></div>
                <div class="styling-left"><label for="R2">R2:</label><input id="R2" name="R2" type="text" disabled></div>
                <div class="styling-left"><label for="R3">R3:</label><input id="R3" name="R3" type="text" disabled></div>
                <div class="styling-left"><label for="R4">R4:</label><input id="R4" name="R4" type="text" disabled></div>
                <div class="styling-left"><label for="R5">R5:</label><input id="R5" name="R5" type="text" disabled></div>
                <div class="styling-left"><label for="R6">R6:</label><input id="R6" name="R6" type="text" disabled></div>
                <div class="styling-left"><label for="R7">R7:</label><input id="R7" name="R7" type="text" disabled></div>
                <div class="styling-left"><label for="R8">R8:</label><input id="R8" name="R8" type="text" disabled></div>
            </div>
            <div class="col-12  d-flex justify-content-center align-content-center">
                <div class="styling-left"><label for="R9">R9:</label><input id="R9" name="R9" type="text" disabled></div>
                <div class="styling-left"><label for="R10">R10:</label><input id="R10" name="R10" type="text" disabled></div>
                <div class="styling-left"><label for="R11">R11:</label><input id="R11" name="R11" type="text" disabled></div>
                <div class="styling-left"><label for="R12">R12:</label><input id="R12" name="R12" type="text" disabled></div>
                <div class="styling-left"><label for="R13">R13:</label><input id="R13" name="R13" type="text" disabled></div>
                <div class="styling-left"><label for="R14">R14:</label><input id="R14" name="R14" type="text" disabled></div>
                <div class="styling-left"><label for="R15">R15:</label><input id="R15" name="R15" type="text" disabled></div>
            </div>

        </div>
    </div>

</div>
<script src="index.js"></script>
</body>
</html>