function validaFaleConosco() {
    const nome = document.frmfaleconosco.txtnome;
    const expRegNome = new RegExp('^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$');

    const fone = document.frmfaleconosco.txtfone;
    const expRegFone = new RegExp('^[(]{1}[1-9]{2}[)]{1}[0-9]{4-5}[-]{1}[0-9]{4}$');

    if (!expRegNome.test(nome.value)) {
        alert("Preencha o campo Nome.");
        nome.focus();
        return false;
    }
    if (!expRegFone.test(fone.value)) {
        alert("Preencha o campo Telefone.");
        fone.focus();
        return false;
    }
    if (document.frmfaleconosco.txtemail.value == "") {
        alert("Preencha o campo E-mail.");
        document.frmfaleconosco.txtemail.focus();
        return false;
    }
    if (document.frmfaleconosco.selmotivo.value == "") {
        alert("Preencha o campo Motivo.");
        document.frmfaleconosco.selmotivo.focus();
        return false;
    }
    if (document.frmfaleconosco.selmotivo.value === "PR" && !document.frmfaleconosco.selproduto.value) {
        alert("Preencha o produto.");
        document.frmfaleconosco.selproduto.focus();
        return false;
    }
    if (document.frmfaleconosco.txacomentario.value == "") {
        alert("Preencha o campo Comentário.");
        document.frmfaleconosco.txacomentario.focus();
        return false;
    }
    return true;
}

function verificaMotivo(motivo) {
    const elemento = document.getElementById('opcaoProduto');

    if (motivo === "PR") {
        const select = document.createElement('select');
        select.setAttribute('name', 'selproduto');

        let option = document.createElement('option');
        option.setAttribute('value', '');
        let texto = document.createTextNode('Escolha');
        option.appendChild(texto);

        select.appendChild(option);

        option = document.createElement('option');
        option.setAttribute('value', 'FR')
        texto = document.createTextNode('Freezer');
        option.appendChild(texto)
        select.appendChild(option);

        option = document.createElement('option');
        option.setAttribute('value', 'GE')
        texto = document.createTextNode('Geladeira');
        option.appendChild(texto)
        select.appendChild(option);

        elemento.appendChild(select);
    } else {
        if (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

$(document).ready(function() {
	$("header").load("/ProjetoTrilhaWeb/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoTrilhaWeb/pages/site/general/menu.html");
	$("footer").load("/ProjetoTrilhaWeb/pages/site/general/rodape.html");
})