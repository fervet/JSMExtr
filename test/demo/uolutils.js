(function () {
    if (!window.console) {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
        window.console = {};
        for (var i = 0; i < names.length; ++i) {
            window.console[names[i]] = function () {
            };
        }
    }
})();
console.log("LOADER VERSION: 1.3.3");
window._escape = function (str) {
    return encodeURIComponent(_unescape(str));
};
window._unescape = function (str) {
    try {
        return _cleanText(decodeURIComponent(unescape(str)));
    } catch (e) {
        if (/URI malformed/.test(e)) {
            return _cleanText(unescape(str));
        }
        return str;
    }
};
window._cleanText = function (str) {
    return str.replace(/&#(\d+);/g, function (str, code) {
        return String.fromCharCode(code);
    });
};
window.innerShiv = (function () {
    var d, r;
    return function (h, u) {
        if (!d) {
            d = document.createElement("div");
            r = document.createDocumentFragment();
            /*@cc_on d.style.display = 'none';@*/
            ;
        }
        var e = d.cloneNode(true);
        /*@cc_on document.body.appendChild(e);@*/
        ;
        e.innerHTML = h.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        /*@cc_on document.body.removeChild(e);@*/
        ;
        if (u === false) {
            return e.childNodes;
        }
        var f = r.cloneNode(true), i = e.childNodes.length;
        while (i--) {
            f.appendChild(e.firstChild);
        }
        return f;
    };
}());
if (typeof isArray == "undefined") {
    function isArray(o) {
        try {
            if (/string|number/.test(typeof o)) {
                return false;
            }
            if (typeof o != "function" && o.length > -1) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }
}
if (typeof objectToURL == "undefined") {
    function objectToURL(o) {
        var str = "";
        for (i in o) {
            if (o[i].toString() != "") {
                str += "&" + i + "=" + _escape(o[i].toString());
            }
        }
        return str.substring(str.indexOf("&") + 1);
    }
}
if (typeof addEvent == "undefined") {
    function addEvent(ev, elem, func) {
        if (window.addEventListener) {
            elem.addEventListener(ev, func, false);
        } else {
            if (window.attachEvent) {
                elem.attachEvent("on" + ev, func);
            }
        }
    }
}
if (typeof removeEvent == "undefined") {
    function removeEvent(ev, elem, func) {
        if (window.removeEventListener) {
            elem.removeEventListener(ev, func, false);
        } else {
            window.detachEvent("on" + ev, func);
        }
    }
}
var DEFAULT_CHARSET = "UTF-8";
var SRC = {
    "path": "http://jsuol.com.br/c/_template/v1/web/js",
    "jquery": "http://jsuol.com.br/c/jquery/jquery.js",
    "detectadblock": "http://jsuol.com.br/c/detectadblock/detectadblock.js?v9",
    "jquery.history": "http://jsuol.com.br/c/jquery/jquery.history.js",
    "jquery.hashchange": "http://jsuol.com.br/c/jquery/jquery.hashchange.js",
    "datepicker": "http://jsuol.com.br/c/jquery/datepicker/jquery.datepick.min.js",
    "swfobject": "http://jsuol.com.br/c/swfobject/swfobject.js",
    "highstock": "http://jsuol.com.br/c/highstock/highstock.js",
    "highcharts": "http://jsuol.com.br/c/highcharts/highcharts.js",
    "json": "http://jsuol.com.br/c/json/json.js"
};
if (location.search.indexOf("jquery") > 0) {
    SRC.jquery = "http://jsuol.com.br/c/jquery/jquery-1.11.3.min.js";
}
SRC.guia = SRC.path + "/guiauol/guiauol.js";
Utils = window.Utils || {};
Lib = window.Lib || {};
Utils.storageValidation = (function (w) {
    var validation;
    try {
        validation = !!window.localStorage;
        validation && localStorage.setItem("__test", "");
        validation && localStorage.removeItem("__test");
    } catch (e) {
        validation = false;
    }
    return validation;
}(window));
Utils.Modules = {
    "lib.detectadblock": {
        "lookFor": ".projeto-2011", "test": function () {
            return window.Lib && window.Lib.Detectadblock;
        }, "src": SRC.detectadblock
    },
    "lib.interacao": {
        "lookFor": ".modinteracao", "test": function () {
            return window.Lib && window.Lib.Interacao;
        }, "src": SRC.path + "/lib.interacao/interacao.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.Interacao.compartilhe(Utils.Modules["lib.interacao"].modules);
        }
    },
    "lib.avaliacaoestadios": {
        "lookFor": ".widget-copa-avaliacao-estadio", "test": function () {
            return window.Lib && window.Lib.AvaliacaoEstadio;
        }, "src": SRC.path + "/lib.avaliacao-estadios/avaliacao-estadios.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.AvaliacaoEstadio.init(Utils.Modules["lib.avaliacaoestadios"].modules);
        }
    },
    "lib.playlist": {
        "lookFor": ".modlistavideos",
        "test": function () {
            return window.Lib && window.Lib.Playlist;
        },
        "src": SRC.path + "/lib.playlist/playlist.js?v11",
        "require": [SRC.jquery, SRC.swfobject, SRC.jquery, SRC.path + "/lib.rotativo/rotativo.js", "http://mais.uol.com.br/stc/mais/j/uolplayer/uolplayer.min.js"],
        "onLoad": function () {
            Lib.Playlist.init(Utils.Modules["lib.playlist"].modules);
        }
    },
    "lib.clima": {
        "lookFor": ".clima",
        "test": function () {
            return window.Lib && window.Lib.Tempo.run;
        },
        "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/modulos/clima.js",
        "require": [SRC.jquery, "http://jsuol.com.br/c/jquery/jquery-ui.js"],
        "onLoad": function () {
            Lib.Tempo.run();
        }
    },
    "lib.acoes": {
        "lookFor": ".acoes",
        "test": function () {
            return window.Lib && window.Lib.Acoes.init;
        },
        "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/modulos/acoes.js?v4",
        "require": [SRC.jquery, "http://jsuol.com.br/c/jquery/jquery-ui.js"],
        "onLoad": function () {
            Lib.Acoes.init();
        }
    },
    "lib.agendaVestibular": {
        "lookFor": ".modcalendario",
        "test": function () {
            return window.Lib && window.Agenda;
        },
        "src": "http://jsuol.com.br/c/_template/v1/web/js/modulo/noticias/vestibular/agenda.js?v2",
        "require": [SRC.jquery, "http://jsuol.com.br/c/jquery/jquery-ui.js"],
        "onLoad": function () {
            Utils.writeCSS("http://jsuol.com.br/c/vestibular/css/v1/web/agenda.css");
        }
    },
    "lib.modfrases": {
        "lookFor": ".modfrases", "test": function () {
            return window.Lib && window.Lib.modfrases;
        }, "src": SRC.path + "/lib.modfrases/modfrases.js?v1", "require": [SRC.jquery], "onLoad": function () {
            LibModFrases.init();
        }
    },
    "lib.segundoTurno": {
        "lookFor": ".simsegturno",
        "test": function () {
            return window.Lib && window.Lib.segundoTurno;
        },
        "src": SRC.path + "/pagina-pesquisas/2turno.lib.js",
        "require": [SRC.jquery, SRC.highcharts, SRC.path + "/pagina-pesquisas/2turno.lib.js"],
        "onLoad": function () {
            Lib.segundoTurno.get();
        }
    },
    "lib.estudemais": {
        "lookFor": ".estude-mais", "test": function () {
            return window.Lib && window.Lib.EstudeMais;
        }, "src": SRC.path + "/lib.estudemais/estudemais.js", "require": [SRC.jquery, SRC.path + "/lib.estudemais/estudemais.js"], "onLoad": function () {
            Lib.EstudeMais.Start();
        }
    },
    "lib.inlinesearch": {
        "lookFor": ".form-busca",
        "test": function () {
            return window.Lib && window.Lib.InlineSearch;
        },
        "src": SRC.path + "/lib.inlinesearch/inlinesearch.js",
        "require": [SRC.jquery, "http://jsuol.com.br/c/jquery/jquery-ui.js", SRC.path + "/lib.inlinesearch/inlinesearch.js"],
        "onLoad": function () {
            Lib.InlineSearch.Start();
        }
    },
    "lib.enquete": {
        "lookFor": ".moduloenquete", "test": function () {
            return window.Lib && window.Lib.Enquete;
        }, "src": SRC.path + "/lib.enquete/enquete.js", "require": [SRC.jquery, SRC.path + "/lib.interacao/interacao.js"], "onLoad": function () {
            Lib.Enquete.Module.Default.start(Utils.Modules["lib.enquete"].modules);
        }
    },
    "lib.enquete-footerReality": {
        "lookFor": ".moduloenquete-footerReality", "test": function () {
            return window.Lib && window.Lib.Enquete;
        }, "src": SRC.path + "/lib.enquete/enquete.js", "require": [SRC.jquery, SRC.path + "/lib.interacao/interacao.js"], "onLoad": function () {
            Lib.Enquete.Module.Default.start(Utils.Modules["lib.enquete-footerReality"].modules);
        }
    },
    "lib.abas": {
        "lookFor": ".modabaembedavel", "test": function () {
            return window.Lib && window.Lib.AbasEmbedaveis;
        }, "src": SRC.path + "/lib.abasembedaveis/abasembedaveis.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.AbasEmbedaveis(Utils.Modules["lib.abas"].modules);
        }
    },
    "modalbumfotos": {
        "lookFor": ".modalbumfotos", "test": function () {
            return window.albumFotos && window.albumFotos.embedInit;
        }, "src": "http://lib.uol.com.br/album/versoes/album.v5.js?v=20160120", "onLoad": function () {
            albumFotos.embedInit({ModAlbumElem: Utils.Modules["modalbumfotos"].modules});
        }
    },
    "lib.styled-combobox": {
        "lookFor": ".styled-combobox", "test": function () {
            return window.jQuery && window.jQuery.fn.styledCombobox;
        }, "src": SRC.path + "/lib.styled-combobox/styled-combobox.js?debug=true", "require": [SRC.jquery], "onLoad": function () {
            Utils.writeCSS("http://jsuol.com.br/c/_template/v1/web/css/lib.styled-combobox/styled-combobox.css");
            $(".styled-combobox").styledCombobox();
            $(".styled-combobox").show();
        }
    },
    "lib.calculadora-cpmf": {
        "lookFor": ".calculadoraCpmf", "test": function () {
            return window.jQuery && window.jQuery.fn.calculadoraCpmf;
        }, "src": SRC.path + "/lib.calculadora-cpmf/lib.calculadora-cpmf.js", "require": [SRC.jquery], "onLoad": function () {
            Utils.writeCSS("http://jsuol.com.br/c/_template/v1/web/css/lib.calculadora-cpmf/calculadoracpmf.css");
        }
    },
    "canalvideo": {
        "lookFor": ".canal-video", "test": function () {
            return window.tvuol && tvuol.Logic;
        }, "src": SRC.path + "/canais-videos/tvuol.js", "require": SRC.swfobject
    },
    "manchete": {"lookFor": ".manchete", "src": SRC.path + "/modulo/manchete.js"},
    "linkspatrocinados": {
        "lookFor": ".links-patrocinados", "test": function () {
            return window.Lib && window.Lib.LP;
        }, "src": SRC.path + "/lib.lp/lp.js?a=2", "onLoad": function () {
            Lib.LP.start(Utils.Modules["linkspatrocinados"].modules);
        }
    },
    "nativelp": {
        "lookFor": ".nativelp", "test": function () {
            return window.Lib && window.Lib.Native;
        }, "src": SRC.path + "/lib.lp/nativelp.js", "onLoad": function () {
            Lib.Native.start(Utils.Modules["nativelp"].modules);
        }
    },
    "stick": {
        "lookFor": ".banner-stick", "test": function () {
            return window.Lib && window.stick;
        }, "src": SRC.path + "/lib.stick/stick.js?v13", "onLoad": function () {
            var bannerStick = true;
        }
    },
    "modvideo": {
        "lookFor": ".mod.ultimos-videos",
        "test": function () {
            return window.Lib && window.Lib.ModVideo;
        },
        "src": SRC.path + "/lib.modvideo/modvideo.js",
        "require": [SRC.jquery, SRC.swfobject, SRC.path + "/lib.interacao/interacao.js", SRC.path + "/lib.rotativo/rotativo.js"],
        "onLoad": function () {
            Lib.ModVideo.start(Utils.Modules["modvideo"].modules);
        }
    },
    "rotativo": {
        "lookFor": ".slideshow", "test": function () {
            return window.jQuery && window.jQuery.fn.rotativo;
        }, "src": SRC.path + "/lib.rotativo/rotativo.js", "require": [SRC.jquery], "onLoad": function () {
            jQuery(Utils.Modules["rotativo"].modules).rotativo();
        }
    },
    "lib.publieditorial": {
        "lookFor": ".mod-publieditorial",
        "test": function () {
            return window.Lib && window.Lib.publieditorial;
        },
        "src": SRC.path + "/publieditorial/publieditorial.js?v123",
        "require": [SRC.jquery, SRC.path + "/lib.tailtarget/tailtarget.js"],
        "onLoad": function () {
            Lib.publieditorial.init(Utils.Modules["lib.publieditorial"].modules);
        }
    },
    "comentariosbabel": {
        "lookFor": "#comentarios",
        "test": function () {
            return window.jQuery && window.jQuery.fn.comentarios;
        },
        "src": "http://jsuol.com.br/c/comentarios/comentarios.js?cache=201609221840",
        "charset": "iso-8859-1",
        "require": [SRC.jquery, "http://jsuol.com/p/perfil/js/widgets.v2.js?cache=201606100913", "http://jsuol.com/p/perfil/js/n.widget.js"],
        "onLoad": function () {
            if (Config.Comentario && Config.Comentario.id) {
                if (Config.plataforma == "web/bol") {
                    jQuery("#conteudo-principal header .compartilhar-topo.right").append('<div id="comentarios-teaser"></div>');
                } else {
                    jQuery("#conteudo-principal header h1").append('<div id="comentarios-teaser"></div>');
                }
                Config.Comentario.teaser = jQuery("#comentarios-teaser");
                Config.serverDate = Config.serverDate;
                jQuery("#comentarios").comentarios(Config.Comentario);
            }
        }
    },
    "login": {
        "lookFor": ".form-login", "test": function () {
            return window.jQuery && window.ModuloLogin;
        }, "src": "http://jsuol.com.br/c/modulo-login/modulo.login.js", "charset": "iso-8859-1", "require": [SRC.jquery], "onLoad": function () {
            ModuloLogin.init();
        }
    },
    "megastore": {
        "lookFor": ".megastore", "test": function () {
            return window.Lib && window.Lib.modMegaStore;
        }, "src": SRC.path + "/lib.megastore/megastore.js", "onLoad": function () {
            Lib.modMegaStore.init(Utils.Modules["megastore"].modules);
        }
    },
    "drop": {
        "lookFor": ".drop", "test": function () {
            return window.Lib && window.Lib.Drop;
        }, "src": SRC.path + "/lib.drop/drop.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.Drop.init(Utils.Modules["drop"].modules);
        }
    },
    "menuFluido": {
        "lookFor": "#menu-aba", "test": function () {
            return window.Lib && window.Lib.Abas;
        }, "src": SRC.path + "/lib.menu-fluido/menu-fluido.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.Fluido.start();
        }
    },
    "buscasuggest": {
        "lookFor": "#busca",
        "test": window.jQuery && window.Lib.UOLBusca,
        "src": "http://jsuol.com.br/c/busca/uolbusca.js",
        "charset": "utf-8",
        "require": [SRC.jquery],
        "onLoad": function () {
            Utils.writeCSS("http://jsuol.com.br/c/busca/suggest.css");
            Lib.UOLBusca.Suggest.init(jQuery(Utils.Modules["buscasuggest"].lookFor).find('input[name="q"]'));
            Lib.UOLBusca.UI.v2();
        }
    },
    "lib.contagem-regressiva": {
        "lookFor": ".contagem-regressiva-container", "test": function () {
            return window.Lib && window.Lib.ContagemRegressiva;
        }, "src": SRC.path + "/lib.contagem-regressiva/contagem-regressiva.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.ContagemRegressiva.init($(Utils.Modules["lib.contagem-regressiva"].lookFor));
        }
    },
    "lib.avaliar-jogador": {
        "lookFor": ".embed-jogadores", "test": function () {
            return window.Lib && window.Lib.AvaliarJogador;
        }, "src": SRC.path + "/lib.avaliar-jogador/avaliar-jogador.js?v0.86&", "require": [SRC.jquery], "onLoad": function () {
            Lib.AvaliarJogador.init($(Utils.Modules["lib.avaliar-jogador"].lookFor));
        }
    },
    "lib.aovivo": {
        "lookFor": ".lib-aovivo",
        "test": function () {
            return window.Lib && window.Lib.AoVivo;
        },
        "src": SRC.path + "/lib.aovivo/aovivo.js?v16",
        "require": [SRC.jquery, SRC.path + "/lib.interacao/interacao.js", SRC.path + "/lib.rotativo/rotativo.js"],
        "onLoad": function () {
            Lib.AoVivo.init();
        }
    },
    "lib.aovivo.v2": {
        "lookFor": ".lib-aovivo-v2",
        "test": function () {
            return window.Lib && window.Lib.AoVivo;
        },
        "src": SRC.path + "/lib.aovivo/aovivo.v2.js",
        "require": [SRC.jquery, SRC.path + "/lib.interacao/interacao.js", SRC.path + "/lib.rotativo/rotativo.js"],
        "onLoad": function () {
            Lib.AoVivo.init();
        }
    },
    "lib.avaliacao": {
        "lookFor": ".avaliacao", "test": function () {
            return window.Lib && window.Lib.Avaliacao;
        }, "src": SRC.path + "/lib.avaliacao/avaliacao.js", "require": [SRC.jquery, SRC.path + "/lib.interacao/interacao.js"], "onLoad": function () {
            Lib.Avaliacao.init();
        }
    },
    "lib.GraficoEleicoes": {
        "lookFor": ".modgrafico-eleicoes",
        "test": function () {
            return window.Lib && window.Lib.GraficoEleicoes;
        },
        "src": SRC.path + "/lib.grafico-eleicoes/grafico.js",
        "require": [SRC.jquery, SRC.highcharts, SRC.path + "/lib.grafico-eleicoes/grafico.js"],
        "onLoad": function () {
            Lib.GraficoEleicoes.init();
        }
    },
    "lib.GraficoEleicoes2014x": {
        "lookFor": ".modgrafico-eleicoes2014x",
        "test": function () {
            return window.Lib && window.Lib.GraficoEleicoes2014;
        },
        "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/estacao/eleicoes/2014/modulo/grafico.js?v3",
        "require": [SRC.jquery, SRC.highcharts, "http://jsuol.com.br/c/_template/v1/web/uol/js/estacao/eleicoes/2014/modulo/grafico.js?v3"],
        "onLoad": function () {
            Lib.GraficoEleicoes2014.init();
        }
    },
    "lib.GraficoEleicoes2014": {
        "lookFor": ".modgrafico-eleicoes2014, .simsegturno2014",
        "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/estacao/eleicoes/2014/graficos/eleicoes.js?v=28",
        "require": ["http://jsuol.com.br/c/_template/v1/web/js/plus/plus.js?v=10", "http://jsuol.com.br/c/_template/v1/web/js/db/db.js?x=4"],
        "onLoad": function () {
            (function () {
                Eleicoes2014().utils("web");
            }).on(".sem-partido", "http://jsuol.com.br/c/_template/v1/web/uol/css/internas/graficos.css?x=12");
        }
    },
    "lib.UOLCharts": {
        "lookFor": ".uolcharts",
        "src": "http://jsuol.com.br/c/_template/v1/web/js/uolcharts/uolcharts.js?v=7",
        "require": ["http://jsuol.com.br/c/_template/v1/web/js/plus/plus.js?v=5", "http://jsuol.com.br/c/_template/v1/web/js/db/db.js?v=5"],
        "onLoad": function () {
            (function () {
                UOLCharts.auto();
            }).on("", "http://jsuol.com.br/c/_template/v1/web/uol/css/internas/graficos.css");
        }
    },
    "lib.ModConversor": {
        "lookFor": ".mod-conversor",
        "test": function () {
            return window.Lib && window.Lib.ModConversor;
        },
        "src": SRC.path + "/lib.mod-conversor/conversor.js?v11",
        "require": [SRC.jquery, SRC.path + "/lib.mod-conversor/conversor.js?v11"],
        "onLoad": function () {
            Lib.ModConversor.init();
        }
    },
    "lib.LinhaTempo": {
        "lookFor": ".mod-linha-do-tempo",
        "test": function () {
            return window.Lib && window.Lib.LinhaTempo;
        },
        "src": SRC.path + "/lib.linha-do-tempo/linha-do-tempo.js?11",
        "require": [SRC.jquery, SRC.path + "/lib.linha-do-tempo/linha-do-tempo.js?11"],
        "onLoad": function () {
            Lib.LinhaTempo.load();
        }
    },
    "lib.FixedMenu": {
        "lookFor": ".fixed-menu", "test": function () {
            return window.Lib && window.Lib.FixedMenu;
        }, "src": SRC.path + "/lib.fixed-modules/menu.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.FixedMenu.init();
        }
    },
    "lib.ModuloScroll": {
        "lookFor": ".modulo-scroll", "test": function () {
            return window.Lib && window.Lib.ModuloScroll;
        }, "src": SRC.path + "/lib.fixed-modules/modulo-scroll.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.ModuloScroll.init();
        }
    },
    "lib.carousel": {
        "lookFor": ".carousel", "test": function () {
            return window.Lib && window.Lib.carousel;
        }, "src": SRC.path + "/lib.carousel/carousel.js", "require": [SRC.jquery], "onLoad": function () {
            var carouselItens = Utils.Modules["lib.carousel"].modules;
            for (var i = 0; i < carouselItens.length; i++) {
                Lib.carousel.init(carouselItens[i].getAttribute("id"));
            }
        }
    },
    "lib.modAvalie": {
        "lookFor": ".modavalie", "test": function () {
            return window.Lib && window.Lib.Enquete && window.Lib.Embedaval;
        }, "src": SRC.path + "/lib.avalie-cidade/avalie-cidade.js", "require": [SRC.jquery, SRC.path + "/lib.enquete/enquete.js"], "onLoad": function () {
            Lib.Embedaval.init(Utils.Modules["lib.modAvalie"].modules);
        }
    },
    "lib.modPlacar": {
        "lookFor": ".eleicoes2012-mod-apuracao", "test": function () {
            return window.Lib && window.EleicoesUOL && window.Lib.Placar;
        }, "src": SRC.path + "/lib.placar/embed-placar.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.Placar.init(Utils.Modules["lib.modPlacar"].modules);
            Lib.Placar.binds();
        }
    },
    "lib.indice-grade-lista": {
        "lookFor": ".modIndiceGradeLista",
        "src": SRC.path + "/lib.indice-grade-lista/indice-grade-lista.js",
        "require": [SRC.jquery],
        "onLoad": function () {
            modIndiceGradeLista.init();
        }
    },
    "lib.indice": {
        "lookFor": ".mod.indice-v2", "test": function () {
            return window.Lib && window.Lib.Indice;
        }, "src": SRC.path + "/lib.indice/indice.js", "require": [], "onLoad": function () {
            Lib.Indice.init();
        }
    },
    "publicidade.HP": {
        "lookFor": ".ferramentas #imprimirPubli", "require": [SRC.jquery], "onLoad": function () {
            $(".ferramentas #imprimirPubli").mouseover(function () {
                if (!window.printHPCount) {
                    $(".ferramentas #publiPrint").animate({right: "146"}, 500);
                    $('<img src="http://click.uol.com.br/?rf=noticias-campanhahp-ativoucampanha&u=http://img.uol.com.br/x.gif" style="display:none" />').appendTo("body");
                    window.printHPCount = 1;
                    hptimestamp = new Date().getTime();
                    document.getElementById("linkHP").href = "http://ia.nspmotion.com/click/?cap=202988&c=27357&r=[timestamp]";
                }
            });
        }
    },
    "lib.eleicoes.nav": {
        lookFor: "#nav-municipio", test: function () {
            return window.Nav && window.Lib && window.Lib.Interacao;
        }, src: SRC.path + "/lib.eleicoes/nav.js", require: [SRC.jquery, SRC.path + "/lib.interacao/interacao.js"], onLoad: function () {
            Utils.writeCSS("http://jsuol.com.br/c/_template/v1/web/css/lib.eleicoes/nav.css");
            loader({
                test: function () {
                    return window.JSON;
                }, src: SRC.json, onLoad: function () {
                    Nav.init();
                }
            });
        }
    },
    "lib.mod-headline-destaques": {
        "lookFor": ".headline.rotativo", "test": function () {
            return window.jQuery && window.Lib.RotativoHeadline;
        }, "src": SRC.path + "/lib.rotativo-headline/rotativo-headline.js", "require": [SRC.jquery]
    },
    "lib.mod-headline-tematico": {
        "lookFor": ".mod.headline-tematico.rotativo", "test": function () {
            return window.jQuery && window.Lib.RotativoHeadlineTematico;
        }, "src": SRC.path + "/lib.rotativo-headline-tematico/lib.rotativo-headline-tematico.js", "require": [SRC.jquery], "onLoad": function () {
            RotativoHeadlineTematico.init();
        }
    },
    "mod-headline-especiais-3colunas": {
        "lookFor": ".headline-especiais .slider", "test": function () {
            return window.jQuery && window.jQuery.fn.rotativo;
        }, "src": SRC.path + "/lib.rotativo/rotativo.js", "require": [SRC.jquery], "onLoad": function () {
            jQuery(Utils.Modules["mod-headline-especiais-3colunas"].modules).rotativo({
                effect: "slide",
                time_change: 10000,
                pause: ".current, .thumbs, .buttons"
            });
        }
    },
    "mod-foto-zoom": {
        "lookFor": ".mod-foto-zoom",
        "src": (window.location.href.indexOf(":7070") > -1 ? "assets/js/config.js" : "http://jsuol.com.br/c/infograficos/2013/mulher/foto-zoom/js/min.js?v2"),
        "require": ["http://jsuol.com.br/c/requirejs/require.js"]
    },
    "info-mega-sena": {
        "lookFor": ".info-mega-sena",
        "src": (window.location.href.indexOf(":7070") > -1 ? "assets/js/config.js" : "http://jsuol.com.br/c/infograficos/2013/noticias/mega-sena/js/min.js?v1"),
        "require": ["http://jsuol.com.br/c/requirejs/require.js"]
    },
    "lazyload": {
        "lookFor": "img.lazyload", "test": function () {
            return window.jQuery && window.jQuery.fn.lazyload;
        }, "src": "http://jsuol.com.br/c/lazyload/jquery.lazyload.min.js", "require": [], "onLoad": function () {
            var images = jQuery(Utils.Modules["lazyload"].modules);
            try {
                images.lazyload({effect: "show", failure_limit: images.length, skip_invisible: false, threshold: 200}).removeClass("lazyload");
            } catch (err) {
                console.log("Erro ao carregar o lazyload - " + err.message);
            }
        }
    },
    "clickplay": {
        "lookFor": ".clickplay", "test": function () {
            return window.$ && window.$.fn.clickplay;
        }, "src": SRC.path + "/jquery/clickplay.js?v2", "require": [SRC.jquery, SRC.swfobject], "onLoad": function () {
            $(".clickplay").clickplay();
        }
    },
    "mod-pavio-carousel": {
        "lookFor": ".blogs-pavio-carousel", "test": function () {
            return window.jQuery && Lib.pavioCarousel;
        }, "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/modulo/blogs-e-colunas-3-colunas.js?v2", "require": [], "onLoad": function () {
            Lib.pavioCarousel.init(".blogs-pavio-carousel");
        }
    },
    "lib.rotativo-abas": {
        "lookFor": ".rotativo-abas", "test": function () {
            return window.jQuery && Lib.rotativoAbas;
        }, "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/modulo/rotativo-abas.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.rotativoAbas.init();
        }
    },
    "lib.geotag-news": {
        "lookFor": ".geotag-news",
        "test": function () {
            return window.$ && $.fn.geotagnews && Utils.geoip;
        },
        "src": "http://jsuol.com.br/c/_template/v1/web/uol/js/modulo/geotag-news.js",
        "require": ["http://jsuol.com.br/c/_template/v1/web/js/lib.geoip/lib.geoip.js"],
        "onLoad": function () {
            $(".geotag-news .itens").geotagnews();
        }
    },
    "lib.smartBanner": {
        "lookFor": "#smart-banner", "src": SRC.path + "/lib.smartbanner/smartbanner.js", "onLoad": function () {
            Lib.SmartBanner.init();
        }
    },
    "jogosDoDia": {
        "lookFor": ".more-games", "test": function () {
            return window.Lib && window.Lib.JogosDoDia;
        }, "src": SRC.path + "/modulo/esporte/jogos-do-dia.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.JogosDoDia.init();
        }
    },
    "forumJogos": {
        "lookFor": ".forumJogos", "test": function () {
            return window.Lib && Lib.forumJogos;
        }, "src": SRC.path + "/modulo/entretenimento/jogos/forum-jogos.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.forumJogos.start();
        }
    },
    "ReadMore": {
        "lookFor": "#texto", "test": function () {
            return window.Lib && Lib.ReadMore;
        }, "src": "http://jsuol.com/c/_template/v1/web/js/lib.readmore.js", "require": [SRC.jquery], "onLoad": function () {
            Lib.ReadMore.init();
        }
    },
    "UOLPlayer": {
        "lookFor": ".uolplayer", "test": function () {
            return window.UOLPlayer;
        }, "src": "http://mais.uol.com.br/stc/mais/j/uolplayer/uolplayer.min.js", "require": [SRC.jquery]
    },
    "Pinit": {
        "lookFor": ".pinit-img", "test": function () {
            return window.Lib.Pinit;
        }, "src": "http://jsuol.com.br/c/_template/v1/web/js/lib.pinit/pinit.js", "require": [SRC.jquery]
    },
    "Calculadora-aposentadoria": {
        "lookFor": ".calculadora-aposentadoria", "test": function () {
            return window.Lib.CalcApo;
        }, "src": "http://jsuol.com.br/c/_template/v1/_geral/js/calculadoras/economia/aposentadoria.js?v2", "require": [SRC.jquery], "onLoad": function () {
            Utils.writeCSS("http://jsuol.com.br/c/_template/v1/_geral/css/calculadoras/economia/aposentadoria.css");
        }
    },
    "lib.TwitterTexto": {
        "lookFor": ".citacao-twitter",
        "src": SRC.path + "/lib.twitter-texto/twitter-texto.js",
        "require": [SRC.jquery],
        "onLoad": function () {
            Lib.TwitterTexto.init(".citacao-twitter");
        }
    },
    "lib.mod-busca-autocomplete": {
        "lookFor": "#busca-autocomplete",
        "src": SRC.path + "/lib.busca-autocomplete/busca-autocomplete.js",
        "require": [SRC.jquery]
    },
    "lib-widget-perfil": {
        "lookFor": "#profile-avatar",
        "src": "http://jsuol.com/p/perfil/js/widgetNotify.js",
        "require": [SRC.jquery, "http://jsuol.com.br/c/babel-core/babel-core.js", "http://jsuol.com.br/c/babel-core/babel-login.js"],
        "onLoad": function () {
            window.widgetNotificacao = new UOL.perfil.widgets.AvatarProduct({target: "profile-avatar", align: "right"});
            $("#profile-avatar").find("span.login").on("click", function () {
                jQuery.BabelCore.Login.init();
                jQuery.BabelCore.Login.login();
            });
        }
    },
    "lib.avalie-embed-2016": {
        "lookFor": ".avalie-2016",
        "test": function () {
            return window.Lib && window.Lib.Enquete && window.Avalie;
        },
        "src": "http://jsuol.com.br/c/_template/v1/_geral/js/eleicoes/2016/avalie-sua-cidade/avalie-embed.js?v11",
        "require": [SRC.jquery, SRC.path + "/lib.enquete/enquete.js", "http://jsuol.com/c/_template/v1/web/js/lib.suggest/suggest.js"],
        "onLoad": function () {
            Utils.writeCSS("http://jsuol.com.br/c/noticias/eleicoes/2016/avalie-sua-cidade/css/inserthtml.com.radios.css");
            Utils.writeCSS("http://jsuol.com.br/c/noticias/eleicoes/2016/web/avalie-sua-cidade/css/embed.css?v2");
            Avalie.geolocation();
        }
    },
    "lib.placar-eleicoes": {
        "lookFor": "#header",
        "test": function () {
            return window.moduloPlacarEleicoes;
        },
        "src": "http://jsuol.com.br/c/_template/v1/web/js/lib.placar-eleicoes/placar-eleicoes.js?cache=201609221919",
        "require": [SRC.jquery, "http://jsuol.com/c/_template/v1/web/js/lib.suggest/suggest.js", "http://jsuol.com.br/c/usocket/usocket.js", "http://jsuol.com.br/c/mustache/mustache.0.8.1.min.js"],
        "onLoad": function () {
            if (location.href.toString().indexOf("extrato-eleicoes") > -1) {
                Utils.writeCSS("http://jsuol.com.br/c/_template/v1/web/css/lib.placar-eleicoes/placar-eleicoes.css?cache=201609221919");
                moduloPlacarEleicoes.init();
            }
        }
    }
};
Utils.DOM = {
    ready: false, queue: [], DOMContentLoaded: function () {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", Utils.DOM.DOMContentLoaded, false);
        } else {
            if (document.attachEvent) {
                document.detachEvent("onreadystatechange", Utils.DOM.DOMContentLoaded);
            }
        }
        Utils.DOM.setReady(1);
    }, isReady: function () {
        if (document.readyState === "complete") {
            return setTimeout(Utils.DOM.setReady, 1);
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", Utils.DOM.DOMContentLoaded, false);
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", Utils.DOM.DOMContentLoaded);
            }
        }
        return true;
    }, setReady: function () {
        this.ready = true;
        this.run();
    }, execute: function (f) {
        if (!this.ready) {
            this.queue.push(f);
        } else {
            this.run(f);
        }
    }, run: function (f) {
        if (typeof f == "function") {
            f.call(window);
        } else {
            while (this.queue.length) {
                this.queue.shift().call(window);
            }
        }
    }
};
Utils.writeCSS = function (css, id) {
    Utils.addDOMEvent((function (css, id) {
        return function () {
            if (id && document.getElementById(id)) {
                return;
            }
            var head = document.getElementsByTagName("head")[0];
            if (css.indexOf("http://") === 0 || css.indexOf("/") === 0) {
                var element = document.createElement("link");
                element.type = "text/css";
                element.rel = "stylesheet";
                element.href = css;
            } else {
                var element = document.createElement("style");
                element.id = id || "css_" + (+new Date());
                element.type = "text/css";
                if (element.styleSheet) {
                    element.styleSheet.cssText = css;
                } else {
                    element.appendChild(document.createTextNode(css));
                }
            }
            head.appendChild(element);
        };
    })(css, id));
};
Utils.loadJS = function (src, callback, charset) {
    if (src.indexOf && src.indexOf("http") == -1) {
        if (src.substr(0, 1) != "/") {
            src = location.protocol + "//" + location.host + location.pathname.replace(/(.*\/).*\.(.+)/, "$1") + src;
        } else {
            src = location.protocol + "//" + location.host + src;
        }
    }
    if (src.indexOf("jsuol.com") != -1 && location.href.indexOf("preview") != -1) {
        src = src.replace(/^http(s)?\:/, "https:");
    }
    function execCallback(func) {
        func.apply(window);
    }

    function isLoaded(script) {
        return script && !!script.getAttribute("js_loaded");
    }

    function addQueue(id, f) {
        if (isLoaded(document.getElementById(id))) {
            return execCallback(f);
        }
        if (!Utils.queue_js) {
            Utils.queue_js = {};
        }
        if (!Utils.queue_js[id]) {
            Utils.queue_js[id] = [];
        }
        if (typeof f == "function") {
            return Utils.queue_js[id].push(f);
        }
        return Utils.queue_js[id];
    }

    if (!callback) {
        callback = null;
    }
    var head = document.getElementsByTagName("head")[0];
    var scripts = head.getElementsByTagName("script");
    var total = scripts.length;
    for (var s = 0; s < total; s++) {
        if (scripts[s].src.replace(/^http(s)?\:/, "") == src.replace(/^http(s)?\:/, "")) {
            if (!scripts[s].id) {
                scripts[s].id = "loadJS_" + (+new Date()) + "_" + Math.ceil(Math.random() * 9999);
            }
            return addQueue(scripts[s].id, callback);
        }
    }
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = charset || DEFAULT_CHARSET;
    s.async = true;
    s.id = "loadJS_" + (+new Date()) + "_" + Math.ceil(Math.random() * 9999);
    s.src = src;
    addQueue(s.id, callback);
    s.onload = s.onreadystatechange = (function (s) {
        return function (_) {
            if (!s.readyState || /loaded|complete/.test(s.readyState)) {
                s.onload = s.onreadystatechange = null;
                s.setAttribute("js_loaded", "true");
                while (Utils.queue_js[s.id] && Utils.queue_js[s.id].length) {
                    execCallback(Utils.queue_js[s.id].shift());
                }
                delete Utils.queue_js[s.id];
                delete s;
            }
        };
    })(s);
    head.appendChild(s);
    return true;
};
Utils.addDOMEvent = function (func) {
    return this.DOM.execute(func);
};
Utils.findModules = function (selector, findIn) {
    if (!findIn) {
        findIn = document;
    }
    if (document.querySelectorAll) {
        var itens = findIn.querySelectorAll(selector);
        if (navigator.userAgent.indexOf("Safari") != -1) {
            itens = (itens.length == 0) ? [] : itens;
        }
        return itens;
    }
    if (/^#/.test(selector)) {
        var bloco = document.getElementById(selector.replace("#", ""));
        if (!bloco) {
            return [];
        }
        return bloco;
    }
    var find_in = ["div", "section", "nav", "ul"];
    var found = [];
    for (var tag = 0; t < find_in.length; tag++) {
        var elem = findIn.getElementsByTagName(find_in[tag]);
        var tt = elem.length;
        var necessary = selector.split(".");
        for (var i = 0; i < tt; i++) {
            var ok = (function (cls, cl) {
                var r = true;
                for (var c in cls) {
                    if (cls[c] != "" && cl.indexOf(cls[c]) == -1) {
                        r = false;
                    }
                }
                return r;
            })(necessary, elem[i].className);
            if (ok) {
                found.push(elem[i]);
            }
        }
    }
    return found;
};
Utils.loader = function (cfg) {
    if (typeof cfg.pre != "undefined") {
        if (Utils.Modules.hasOwnProperty(cfg.pre)) {
            cfg = Utils.Modules[cfg.pre];
        } else {
            return false;
        }
    }
    if (typeof cfg.test == "function" && cfg.test()) {
        if (typeof cfg.onLoad == "function") {
            cfg.onLoad();
        }
        return;
    }
    return (function (s) {
        var queue = cfg.require ? isArray(cfg.require) ? cfg.require : [cfg.require] : [];
        if (queue.length === 0) {
            Utils.loadJS(s.src, s.onLoad || null, s.charset || DEFAULT_CHARSET);
            return true;
        }
        (function (queue, s) {
            var requires = queue.length;
            var check = function () {
                if (requires <= 0) {
                    delete s.require;
                    if (s.src) {
                        Utils.loader(s);
                    } else {
                        if (s.onLoad) {
                            s.onLoad.apply(window, queue);
                        }
                    }
                    return true;
                }
                setTimeout(check, 500);
                return false;
            };
            for (var q = 0; q < queue.length; q++) {
                Utils.loadJS(queue[q], (function (queue, q) {
                    return function () {
                        requires -= 1;
                    };
                })(queue, q), s.charset || DEFAULT_CHARSET);
            }
            check();
        })(queue, s);
    })(cfg);
};
loader = function (cfg, callback, charset) {
    if (location.href.indexOf("dev=") > 0) {
        cfg.version = location.href.replace(/.+(\?|&)dev=([^&]*)?(&.*)?/i, "$2");
        if (cfg.src) {
            cfg.src = cfg.src.replace(/\/v1\//, "/" + cfg.version + "/v1/");
        }
    }
    if (!cfg) {
        return;
    }
    if (typeof cfg == "string") {
        if (cfg.indexOf("http://") > -1 || cfg.indexOf(".js") > -1) {
            cfg = [cfg];
        } else {
            cfg = {"pre": cfg};
        }
    }
    if (isArray(cfg)) {
        return Utils.loader({"require": cfg, "onLoad": callback || null, "charset": charset || DEFAULT_CHARSET});
    }
    return Utils.addDOMEvent(function () {
        Utils.loader(cfg);
    });
};
afterjQuery = function (f) {
    if (!window.jQuery) {
        return Utils.loadJS(SRC.jquery, f);
    }
    f.call(null);
};
var afterCommon_queue = [];
afterCommon = function (f) {
    if (window.Common) {
        f();
    } else {
        afterCommon_queue.push(f);
    }
};
Utils.encontraModulo = function (findIn, module) {
    for (var m in Utils.Modules) {
        if (module && m != module) {
            continue;
        }
        var mod = Utils.Modules[m];
        var modules = Utils.findModules(mod.lookFor, findIn);
        if (isArray(modules) && modules.length || !isArray(modules) && modules) {
            mod.modules = modules;
            loader(mod);
        }
    }
};
Utils.storage = {
    storage: Utils.storageValidation && localStorage, setCookie: function (nome, valor, duracao, domain) {
        var de = new Date();
        if (duracao) {
            de.setDate(de.getDate() + duracao);
        }
        document.cookie = nome + "=" + escape(valor) + (duracao ? "; expires=" + de.toUTCString() : "") + "; path=/;" + ((domain) ? "domain=" + domain : "");
    }, getCookie: function (nome) {
        var re1 = new RegExp(nome + "=", "g");
        var re2 = new RegExp(".*?" + nome + "=(.*?)(;.*?$|$)", "g");
        if (document.cookie.match(re1)) {
            return unescape(document.cookie.replace(re2, "$1"));
        } else {
            return null;
        }
    }, set: function (name, value) {
        if (this.storage) {
            try {
                this.storage.setItem(name, value);
            } catch (e) {
            }
        } else {
            this.setCookie(name, value, 365);
        }
        return value;
    }, get: function (name) {
        if (this.storage) {
            return this.storage.getItem(name);
        } else {
            return this.getCookie(name);
        }
    }, del: function (name) {
        if (this.storage) {
            return this.storage.removeItem(name);
        } else {
            return this.setCookie(name, "", -100);
        }
    }
};
var UOLLib = Lib;
Utils.DOM.isReady();
afterjQuery(function () {
    jQuery.expr[":"].icontains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
    Utils.addDOMEvent(Utils.encontraModulo);
    Utils.addDOMEvent(function () {
        if (typeof Config !== "undefined" && Config.Indice && Config.Conteudo.media != "videos" && /next|prev|created|headline/.test(location.hash)) {
            location.replace(location.href.replace(location.search, "").replace("#", ""));
        }
        loader({
            "test": function () {
                return window.Common;
            }, "src": SRC.path + "/common.js", "onLoad": function () {
                loader(SRC.path + "/common.modules.js");
                Common.clickUOL();
                Common.Nav.init();
                if (/ie6|ie7/.test($("html").attr("class"))) {
                    function IEVersion() {
                        var _n = navigator, _w = window, _d = document;
                        var version = "NA";
                        var na = _n.userAgent;
                        var ieDocMode = "NA";
                        var ie8BrowserMode = "NA";
                        if (/msie/i.test(na) && (!_w.opera)) {
                            if (_w.attachEvent && _w.ActiveXObject) {
                                version = (na.match(/.+ie\s([\d.]+)/i) || [])[1];
                                if (parseInt(version) == 7) {
                                    if (_d.documentMode) {
                                        version = 8;
                                        if (/trident\/\d/i.test(na)) {
                                            ie8BrowserMode = "Compat Mode";
                                        } else {
                                            ie8BrowserMode = "IE 7 Mode";
                                        }
                                    }
                                } else {
                                    if (parseInt(version) == 8) {
                                        if (_d.documentMode) {
                                            ie8BrowserMode = "IE 8 Mode";
                                        }
                                    }
                                }
                                ieDocMode = (_d.documentMode) ? _d.documentMode : (_d.compatMode && _d.compatMode == "CSS1Compat") ? 7 : 5;
                            }
                        }
                        return {"UserAgent": na, "Version": version, "BrowserMode": ie8BrowserMode, "DocMode": ieDocMode};
                    }

                    if (/^[678]\./.test(IEVersion().Version.toString()) === true) {
                        Common.Alerta.create({
                            "name": "nav-antigo",
                            "text": '<p class="browser"><img src="http://click.uol.com.br/?rf=barra-ie6&u=http://img.uol.com.br/ico.gif" /> O <strong>UOL</strong> detectou que seu navegador está desatualizado. Recomendamos que baixe a versão mais recente para visualizar melhor todo o conteúdo. <a href="http://click.uol.com.br/?rf=barra-ie6-click&u=http://tecnologia.uol.com.br/atualize-seu-navegador/"><strong>Saiba mais</strong></a></p>'
                        });
                    }
                }
                if (Config.Conteudo && Config.Conteudo.media && !/video/.test(Config.Conteudo.media) && /ipad|iphone/i.test(navigator.userAgent)) {
                    Utils.addDOMEvent(function () {
                        jQuery("object, embed").each(function () {
                            Common.Video.toHTML5(this);
                        });
                    });
                }
                var callback_common = null;
                while (callback_common = afterCommon_queue.shift()) {
                    if (typeof callback_common == "function") {
                        callback_common();
                    }
                }
                loader(SRC.path + "/lib.lightbox/lightbox.js");
            }
        });
    });
    if (Utils.storage.getCookie("x-user-agent-class") == "WEB") {
        $("#site-versao").remove();
        var versao = $("<div />").attr("id", "site-versao"), title = $("body > header h1 a:first").text();
        versao.append("Ver " + title + ' em: <a href="#" title="Celular" onclick="Common.siteVersao(\'smart\');">Celular</a> - <b>Web</b>');
        $("body").prepend(versao);
    }
});
(function (JSON, w) {
    w.UOLPref = null;
    if (!JSON) {
        UOLPref = {
            define: function () {
                return false;
            }, read: function () {
                return false;
            }, remove: function () {
                return false;
            }
        };
        return false;
    }
    UOLPref = (function () {
        var data = {};
        var LEVEL = "user";
        var STORAGE = "UOLPref";

        function commit() {
            Utils.storage.set(STORAGE, JSON.stringify(data));
        }

        var preferences = function () {
            data = JSON.parse(Utils.storage.get(STORAGE) || "{}");
            this.define = function (name, value, level) {
                level = level || LEVEL;
                !data[level] && (data[level] = {});
                data[level][name] = value;
                commit();
                return value;
            };
            this.read = function (name, level) {
                try {
                    return data[(level || LEVEL)][name] || null;
                } catch (e) {
                    return null;
                }
            };
            this.remove = function (name, level) {
                delete data[(level || LEVEL)][name];
                commit();
                return true;
            };
            return this;
        };
        return new preferences();
    }());
}(window.JSON, window));
Utils.addDOMEvent(function () {
    (function (w, Config) {
        if (!Utils.storageValidation || !w.JSON) {
            return false;
        }
        var Conteudo = Config.Conteudo, navAtual = {"status": true, "id": Conteudo.id, "media": Conteudo.media, "tag": Conteudo.tags};
        if (!navAtual.id || !navAtual.media) {
            return false;
        }
        var DEFAULT_IASUGGEST = {"id": {}, "media": {}, "tag": {}};
        if (!!UOLPref.read("nav") === true) {
            UOLPref.define("content", UOLPref.read("nav"), "nav");
            UOLPref.remove("nav");
        }
        if (!!Utils.storage.get("IASuggest") === true) {
            UOLPref.define("content", JSON.parse(Utils.storage.get("IASuggest")), "nav");
            Utils.storage.del("IASuggest");
        }
        var IASuggest = UOLPref.read("content", "nav") || DEFAULT_IASUGGEST;
        if (IASuggest.url) {
            IASuggest = DEFAULT_IASUGGEST;
        }
        if (IASuggest.id[navAtual.id]) {
            return false;
        }
        IASuggest.id[navAtual.id] = true;
        IASuggest.media[navAtual.media] = (IASuggest.media[navAtual.media] + 1) || 1;
        var tags = navAtual.tag || [], i = tags.length, tag;
        while (i--) {
            tag = tags[i];
            IASuggest.tag[tag] = (IASuggest.tag[tag] + 1) || 1;
        }
        UOLPref.define("content", IASuggest, "nav");
    }(window, Config));
});