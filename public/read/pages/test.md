**PAGE**
**VARS**
title = Check Out
layout_css = "/public/read/styles/layout.css"

**HEAD**
<title>$title | Stocks</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href=$layout_css>

**BODY**
<div class="wrapper">
    **/public/read/components/topbar.md**
    <div class="leftbar">
        <div class="top">
            <button class="leftbarBtn new-item-btn"><span class="material-symbols-outlined">add</span></button>
            <button class="leftbarBtn edit-item-btn"><span class="material-symbols-outlined">edit</span></button>
            <button class="leftbarBtn save-file-btn"><span class="material-symbols-outlined">save</span></button>
            <button class="leftbarBtn remove-item-btn"><span class="material-symbols-outlined">delete</span></button>
        </div>
        <div class="bottom">
            <button class="leftbarBtn settings-btn"><span class="material-symbols-outlined">settings</span></button>
        </div>
    </div>
    <div class="leftpane">
    </div>
    <div class="workspace">
        <div class="table">
            
        </div>
    </div>
    <div class="statusbar">
    </div>
</div>

**STYLES**


**SCRIPTS**
import { notify } from '/public/read/scripts/index.js';