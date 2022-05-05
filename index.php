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
        <div class="d-flex justify-content-around" style="width: 600px;">
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
    <br>
    <br>
    <br>
    <br>
    <br>

    <textarea id="textbox">Type something here</textarea> <button id="create">Create file</button>
</div>
<script src="index.js"></script>
</body>
</html>