document.addEventListener("DOMContentLoaded", function(event) {

    var config = {
        BUTTONURL: 'https://button.coinawesome.com/v1/',
        APIURL: 'https://blockchain.coinawesome.com/api/addr/',
        NOTXLIST: '?noTxList=1'
    }

    var search = window.location.search;
    config.ADDR = search.split('=')[1]
    document.getElementById('awesome-addr').href = 'awesome:' + config.ADDR

    var buttonContainer = document
        .getElementsByClassName('awesome-button-container')[0]

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET',
        config.APIURL + config.ADDR + config.NOTXLIST, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var obj = JSON.parse(xmlhttp.responseText);
                //console.log(obj)

                var counter = document
                    .getElementsByClassName('awesome-button-behind')[0]
                var txs = parseInt(obj.txApperances)
                    //console.log(txs)

                if (txs) {
                    if (txs > 1) {
                        counter.innerHTML = txs + ' tips'
                    } else {
                        counter.innerHTML = txs + ' tip'
                    }
                } else {
                    document.getElementById('awesome-button-behind').style.display = "none";
                    //buttonContainer.classList.toggle('fresh')
                }
            }
        }
    }
    xmlhttp.send(null);


    buttonContainer.onclick = function() {
        if (!buttonContainer.classList.contains('activeExtension'))
            buttonContainer.classList.toggle('visible-info')
    }

});