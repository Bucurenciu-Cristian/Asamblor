<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Asamblor</title>
    <link rel="stylesheet" href="Styles/style.css">
</head>
<body>
<div id="root">
    <form method="post" enctype="multipart/form-data">
        <div>
            <label for="image_uploads">Choose text files to upload</label>
            <input type="file" id="image_uploads" name="image_uploads" accept=".asm" multiple>
        </div>
        <div class="preview">
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