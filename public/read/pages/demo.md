**VARS**
title=Demo Application
n_list_items=10

**HEAD**
<title>$title</title>

**BODY**
<h1>#
    for(i=1; i<$n_list_items; i++) {
        <div class="list-item">+
            <div class="list-index">${i}.</div>+
            <div>Haha</div>+
        </div>+
    }
#</h1>

**STYLES**
@import url("/public/read/styles/index.css");

.list-item{
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: gray;
}

.list-index{
    color: black;
}

**SCRIPTS**
import { notify } from '/public/read/scripts/index.js';

setTimeout(() => {
    notify("Are you here?");
}, 10000)