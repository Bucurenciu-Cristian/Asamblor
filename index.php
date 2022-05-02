<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Asamblor</title>
    <link rel="stylesheet" href="Styles/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
<div id="root">
    <form method="post" enctype="multipart/form-data">
        <div>
            <label for="image_uploads">Choose text files to upload</label>
            <input type="file" id="image_uploads" name="image_uploads" accept=".asm" multiple>
        </div>
        <div class="d-flex justify-content-around">
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
</div>
<script src="index.js"></script>
</body>
</html>


<?php
echo <<<EOF
<h1>EveryThing works</h1>
EOF;