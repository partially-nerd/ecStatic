**VARS**
title=Check Out
layout_css="/public/read/styles/layout.css"

**HEAD**
<title>$title | Stocks</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href=$layout_css>

**BODY**
<div class="wrapper">
    <div class="topbar">
        <div class="left">
            <div class="activeFileName">
                <div class="material-symbols-outlined icon-for-input">edit</div><input type="text" value="ABC.dat" class="file-input">
            </div>
        </div>
        <div class="center">
            <div class="searchWrapper">
                <input type="text" class="searchEntry" placeholder="Type to Search">
                <button class="searchButton"><span class="material-symbols-outlined">search</span></button>
            </div>
        </div>
        <div class="right">
        </div>
    </div>
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
            .
        </div>
    </div>
    <div class="statusbar">
    </div>
</div>

**STYLES**


**SCRIPTS**
import { notify } from '/public/read/scripts/index.js';